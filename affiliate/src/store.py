"""
מאגר נתונים פשוט מבוסס JSON.
שומר את קטלוג המוצרים (שממנו נבנה האתר) ואת היסטוריית הפרסומים
כדי לא לפרסם שוב את אותו מוצר בטווח זמן קצר.

אין תלות בבסיס נתונים חיצוני — הכל קובצי JSON שנשמרים ב-git,
כך שהמצב נשמר בין ריצות של GitHub Actions.
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
CATALOG_FILE = DATA_DIR / "catalog.json"
POSTED_FILE = DATA_DIR / "posted.json"


def _load(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return default


def _save(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class Store:
    def __init__(self) -> None:
        self.catalog: list[dict] = _load(CATALOG_FILE, [])
        self.posted: dict[str, str] = _load(POSTED_FILE, {})  # product_id -> iso date

    # ---- קטלוג המוצרים (מזין את האתר) ----
    def upsert_products(self, products: list[dict]) -> int:
        """מוסיף/מעדכן מוצרים בקטלוג לפי product_id. מחזיר כמה חדשים נוספו."""
        by_id = {p["product_id"]: p for p in self.catalog}
        added = 0
        for p in products:
            pid = p["product_id"]
            if pid not in by_id:
                added += 1
            p["updated_at"] = now_iso()
            by_id[pid] = {**by_id.get(pid, {}), **p}
        # שומר עד 200 מוצרים אחרונים, הכי חדשים קודם
        merged = sorted(by_id.values(), key=lambda x: x.get("updated_at", ""), reverse=True)
        self.catalog = merged[:200]
        _save(CATALOG_FILE, self.catalog)
        return added

    # ---- היסטוריית פרסום לאינסטגרם ----
    def was_posted_recently(self, product_id: str, days: int) -> bool:
        iso = self.posted.get(str(product_id))
        if not iso:
            return False
        try:
            when = datetime.fromisoformat(iso)
        except ValueError:
            return False
        return datetime.now(timezone.utc) - when < timedelta(days=days)

    def mark_posted(self, product_id: str) -> None:
        self.posted[str(product_id)] = now_iso()
        _save(POSTED_FILE, self.posted)

    def pick_unposted(self, candidates: list[dict], days: int) -> dict | None:
        """בוחר את המוצר הראשון שלא פורסם לאחרונה."""
        for p in candidates:
            if not self.was_posted_recently(p["product_id"], days):
                return p
        return None
