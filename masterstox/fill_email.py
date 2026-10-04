"""Fill daily-email-template.html from a small JSON spec (used by the daily email routine).

Usage: python fill_email.py spec.json > email.html
spec keys: day_name, date, time, headline, orders_1d, orders_7d, commission_1d, commission_7d,
visitors_1d, visitors_delta, delta_color, visitors_7d, clicks_1d, rate_1d, clicks_7d, rate_7d,
countries [[flag, name, share_pct, n]], pages [[name, n]], posts [[color, channel, product, url]],
reach [[channel, views, likes, saves, followers]], runway [[channel, pct, days, color]], issues [text]
"""
import json
import re
import sys
from pathlib import Path

CHIP = {"Instagram": "#C13584", "YouTube": "#CC0000", "TikTok": "#111111", "Telegram": "#229ED9"}


def fill(spec: dict) -> str:
    t = (Path(__file__).parent / "daily-email-template.html").read_text(encoding="utf-8")
    t = re.sub(r"<!--.*?-->", "", t, flags=re.S)
    scalars = {
        "DAY_NAME": "day_name", "DD/MM": "date", "HH:MM": "time", "ONE_SENTENCE_MOST_IMPORTANT": "headline",
        "ORDERS_1D": "orders_1d", "ORDERS_7D": "orders_7d", "COMMISSION_1D": "commission_1d",
        "COMMISSION_7D": "commission_7d", "VISITORS_1D": "visitors_1d", "VISITORS_DELTA": "visitors_delta",
        "DELTA_COLOR": "delta_color", "VISITORS_7D": "visitors_7d", "CLICKS_1D": "clicks_1d",
        "CLICK_RATE_1D": "rate_1d", "CLICKS_7D": "clicks_7d", "CLICK_RATE_7D": "rate_7d",
    }
    for slot, key in scalars.items():
        t = t.replace("{{" + slot + "}}", str(spec[key]))
    t = t.replace("{{POSTS_COUNT}}", str(len(spec["posts"])))

    def rep(pattern, rows, keys):
        nonlocal t
        row = re.search(pattern, t, re.S).group(0)
        out = []
        for r in rows:
            x = row
            for k, v in zip(keys, r):
                x = x.replace("{{" + k + "}}", str(v))
            out.append(x)
        t = t.replace(row, "".join(out))

    rep(r'<tr>\s*<td style="padding:5px 0;width:38%;">.*?</tr>', spec["countries"],
        ["FLAG", "COUNTRY_HE", "COUNTRY_SHARE", "COUNTRY_VISITORS"])
    rep(r'<tr>\s*<td style="padding:5px 0;border-bottom:1px solid #F1ECE3;">\{\{PAGE_NAME.*?</tr>',
        spec["pages"], ["PAGE_NAME", "PAGE_VISITORS"])
    rep(r'<tr>\s*<td style="padding:6px 0;border-bottom:1px solid #F1ECE3;width:28%;">.*?</tr>',
        [[CHIP.get(c, "#555"), c, p, u] for c, p, u in spec["posts"]],
        ["CHANNEL_COLOR", "CHANNEL", "PRODUCT_NAME", "POST_URL"])
    rep(r'<tr>\s*<td style="padding:6px 4px;text-align:right;border-top.*?</tr>', spec["reach"],
        ["CHANNEL", "VIEWS", "LIKES", "SAVES", "FOLLOWERS"])
    rep(r'<tr>\s*<td style="padding:5px 0;width:24%;">.*?</tr>',
        [[c, min(int(d), 30) * 100 // 30, d, "#2E4B3C" if int(d) >= 10 else ("#C98A00" if int(d) >= 5 else "#9B2C2C")]
         for c, d in spec["runway"]],
        ["CHANNEL", "RUNWAY_PCT", "RUNWAY_DAYS", "RUNWAY_COLOR"])
    green = re.search(r'<div style="background:#E3EDE7;color:#2E4B3C.*?</div>', t, re.S).group(0)
    amber = re.search(r'<div style="background:#FBEFD5.*?</div>', t, re.S).group(0)
    t = t.replace(amber, "")
    if spec.get("issues"):
        t = t.replace(green, "".join(amber.replace("{{ISSUE_TEXT}}", i) for i in spec["issues"]))
    t = re.sub(r"\n\s*", "\n", t).strip()
    leftover = re.findall(r"\{\{[^}]+\}\}", t)
    if leftover:
        raise SystemExit(f"unfilled slots: {leftover}")
    return t


if __name__ == "__main__":
    print(fill(json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))))
