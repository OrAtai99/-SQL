"""
מפרסם אוטומטי לאינסטגרם דרך Instagram Graph API הרשמי (Meta).

זרימה בת 2 שלבים:
  1) POST /{ig_user_id}/media       -> יוצר "מיכל" (container) עם תמונה + כיתוב
  2) POST /{ig_user_id}/media_publish -> מפרסם את המיכל

דרישות: חשבון Instagram Business המחובר לעמוד פייסבוק, אפליקציית Meta,
וטוקן ארוך-טווח עם ההרשאות instagram_basic + instagram_content_publish.

חשוב: אינסטגרם לא מאפשר קישורים לחיצים בכיתוב — לכן הקישורים האפילייט
יושבים באתר ה-link-in-bio, והפוסט מפנה "לינק בביו".
"""
from __future__ import annotations

import time

import requests

GRAPH = "https://graph.facebook.com/v21.0"


class InstagramPublisher:
    def __init__(self, ig_user_id: str, access_token: str) -> None:
        self.ig_user_id = ig_user_id
        self.token = access_token

    def _create_container(self, image_url: str, caption: str) -> str:
        r = requests.post(
            f"{GRAPH}/{self.ig_user_id}/media",
            data={"image_url": image_url, "caption": caption, "access_token": self.token},
            timeout=60,
        )
        _raise_for_graph(r)
        return r.json()["id"]

    def _wait_ready(self, container_id: str, timeout: int = 120) -> None:
        """ממתין שהמיכל יעבור עיבוד. עבור תמונות בד"כ מיידי, אך בטוח לבדוק."""
        deadline = time.time() + timeout
        while time.time() < deadline:
            r = requests.get(
                f"{GRAPH}/{container_id}",
                params={"fields": "status_code", "access_token": self.token},
                timeout=30,
            )
            code = r.json().get("status_code")
            if code == "FINISHED":
                return
            if code in ("ERROR", "EXPIRED"):
                raise RuntimeError(f"Media container status: {code}")
            time.sleep(4)
        raise TimeoutError("Media container did not finish processing in time")

    def _publish(self, container_id: str) -> str:
        r = requests.post(
            f"{GRAPH}/{self.ig_user_id}/media_publish",
            data={"creation_id": container_id, "access_token": self.token},
            timeout=60,
        )
        _raise_for_graph(r)
        return r.json()["id"]

    def publish_image(self, image_url: str, caption: str) -> str:
        """מפרסם פוסט תמונה בודדת. מחזיר את מזהה הפוסט שנוצר."""
        container_id = self._create_container(image_url, caption)
        self._wait_ready(container_id)
        return self._publish(container_id)

    def remaining_quota(self) -> dict:
        """כמה פוסטים נותרו במכסת 24 השעות (למניעת חסימה)."""
        r = requests.get(
            f"{GRAPH}/{self.ig_user_id}/content_publishing_limit",
            params={"fields": "quota_usage,config", "access_token": self.token},
            timeout=30,
        )
        _raise_for_graph(r)
        return r.json()


def _raise_for_graph(resp: requests.Response) -> None:
    """שגיאות Graph API מגיעות כ-JSON עם שדה error — נחשוף אותן בבירור."""
    if resp.ok:
        return
    try:
        err = resp.json().get("error", {})
        msg = err.get("message", resp.text)
        code = err.get("code", resp.status_code)
        raise RuntimeError(f"Instagram Graph API error {code}: {msg}")
    except (ValueError, AttributeError):
        resp.raise_for_status()
