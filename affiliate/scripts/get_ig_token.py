"""
כלי עזר חד-פעמי להשגת פרטי ההתחברות לאינסטגרם.

מקבל טוקן משתמש קצר-טווח (מ-Graph API Explorer) והופך אותו ל:
  • טוקן ארוך-טווח (~60 יום; טוקן העמוד הנגזר ממנו לרוב לא פג),
  • מזהה חשבון האינסטגרם העסקי (IG_USER_ID).

שימוש:
  python scripts/get_ig_token.py --app-id APPID --app-secret SECRET --short-token TOKEN

מדפיס את הערכים להזנה ל-.env או ל-GitHub Secrets.
"""
from __future__ import annotations

import argparse
import sys

import requests

GRAPH = "https://graph.facebook.com/v21.0"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--app-id", required=True)
    ap.add_argument("--app-secret", required=True)
    ap.add_argument("--short-token", required=True, help="User token מ-Graph API Explorer")
    args = ap.parse_args()

    # 1) החלפה לטוקן ארוך-טווח
    r = requests.get(f"{GRAPH}/oauth/access_token", params={
        "grant_type": "fb_exchange_token",
        "client_id": args.app_id,
        "client_secret": args.app_secret,
        "fb_exchange_token": args.short_token,
    }, timeout=30)
    r.raise_for_status()
    long_token = r.json()["access_token"]
    print("✓ התקבל טוקן ארוך-טווח.")

    # 2) איתור העמוד וטוקן העמוד
    r = requests.get(f"{GRAPH}/me/accounts",
                     params={"access_token": long_token}, timeout=30)
    r.raise_for_status()
    pages = r.json().get("data", [])
    if not pages:
        print("✗ לא נמצאו עמודי פייסבוק המקושרים למשתמש הזה.", file=sys.stderr)
        return 1

    print("\nעמודים שנמצאו:")
    for i, pg in enumerate(pages):
        print(f"  [{i}] {pg['name']} (id={pg['id']})")
    idx = 0 if len(pages) == 1 else int(input("בחר מספר עמוד: "))
    page = pages[idx]
    page_token = page["access_token"]

    # 3) איתור מזהה חשבון האינסטגרם העסקי
    r = requests.get(f"{GRAPH}/{page['id']}", params={
        "fields": "instagram_business_account",
        "access_token": page_token,
    }, timeout=30)
    r.raise_for_status()
    iba = r.json().get("instagram_business_account")
    if not iba:
        print("✗ לעמוד הזה לא מחובר חשבון Instagram עסקי.", file=sys.stderr)
        return 1

    print("\n" + "=" * 60)
    print("הזן את הערכים הבאים ל-.env או ל-GitHub Secrets:")
    print("=" * 60)
    print(f"IG_USER_ID={iba['id']}")
    print(f"IG_ACCESS_TOKEN={page_token}")
    print("=" * 60)
    print("(טוקן העמוד הנגזר מטוקן ארוך-טווח לרוב אינו פג כל עוד אתה מנהל העמוד.)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
