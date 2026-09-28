# Master.Stox — מפת מצב קיים (שלב 1, קריאה בלבד) · 28/9/2026

## סיכום לאור (עברית)

**מה המערכת עושה:** מוצאת מוצרים ב-AliExpress, בונה להם דף באתר (master-stox.vercel.app) וסרטון קצר, ומפרסמת ליוטיוב, אינסטגרם, טלגרם וטיקטוק — אבל **רק סרטונים שאתה אישרת** (אישור חתום, נבדק בקוד לפני כל פוסט). הכנסה = עמלת שותפים מ-AliExpress.

**מה רץ לבד:** 11 תזמונים ב-GitHub (פרסום 9 פעמים ביום, בנייה לילית, מחירים, גילוי מוצרים, בדיקות ודו"חות) + שגרת בוקר אחת של Claude (08:00 UTC, קריאה בלבד).

**דקות GitHub בספטמבר (ספירה מדויקת, 575 ריצות):** 1,738 דקות בריפו הזה. התקרה נפגעה ב-27/9 ב-22:56 UTC — המכסה של 2,000 משותפת לכל הריפו בחשבון, כלומר כ-260 דקות נוספות נצרכו כנראה בריפו אחר (Snuggleberry) *(הערכה — לא נבדק מהריפו ההוא)*. מאז הכול עומד עד 1/10.

**5 הסיכונים העיקריים:**
1. **דקות GitHub** — תקרה קשיחה של $0 שעוצרת את כל הפרסום, משותפת לשני הפרויקטים. תיקוני החיסכון (28/9) עוד לא נבדקו על GitHub עצמו.
2. **דברים שקורים בלי אישור שלך:** גילוי מוצרים מוסיף ו"מאשר" מוצרים לאתר הציבורי לבד (פעמיים בשבוע), מחירים ומוצרים שנמחקו משתנים באתר כל יום, ובנייה לילית קוראת ל-Gemini בתשלום.
3. **האכיפה תלויה בקוד שכל דחיפה ל-main יכולה לשנות** — הגנת main לא נאכפת (תוכנית חינמית), ו-Claude דוחף ישירות ל-main. יש רק התראה על שינוי רגיש.
4. **סיכון פלטפורמות:** אינסטגרם כבר הגביל פעם; בתור יש כותרות עם סימן מסחרי (MagSafe, Toyota) ומקרנים עם "4K/8K" שהמפרט סותר — שלושה כבר פורסמו.
5. **תלות בשירותים בלי תקרת עלות גלויה בריפו:** Gemini (תשלום לפי שימוש), Upload-Post (מנוי), Vercel (לא בדקתי אם התוכנית מתירה שימוש מסחרי — *לא אומת*).

**מה כבר קיים ועובד טוב:** שער אישור חתום (HMAC) לכל פוסט, רישום לפני העלאה נגד פרסום כפול, 1,656 בדיקות אוטומטיות, CI, התראת "שינוי רגיש", דו"ח בוקר. **חסר:** CLAUDE.md, תפקידים מוגדרים (יש רק 2 כישורים כלליים), תיק החלטות (ADR), סקירת יעילות קבועה.

---

## English detail

### 1. Purpose and components
- AliExpress affiliate storefront + short-video pipeline. Revenue: affiliate commission (AliExpress Portals).
- Code: `src/` + `scripts/` (125 files), `tests/` (127 files, 1,656 tests), `site/` (static, built by `scripts/generate_site.py`, deployed by Vercel on push to main), `data/` (catalog, journal, approvals, packages incl. ~435 MB MP4 in git).
- Entry points: `scripts/auto_post_daily.py` (publishing), `scripts/build_reel_v2.py` (rendering, template D), `scripts/generate_site.py`, `scripts/publish_preflight.py`, `scripts/approval_digest.py`.
- No market/stock/trading logic exists in this project; the "live numbers" rule applies to prices, ratings and order counts (AliExpress API, timestamped `Price checked`).

### 2. Schedules (UTC) — what runs automatically
| Workflow | Cron | What it does | Writes |
|---|---|---|---|
| daily-social | 06:11, 09:13, 12:11, 15:13 | YouTube / Instagram post of an owner-approved package | journal commits to main, public post |
| telegram-daily | 10:19, 17:19 | Telegram post (approved) | journal, public post |
| tiktok-daily | 08:21, 13:21, 18:21 | TikTok post (approved) | journal, public post |
| build-packages | 02:27 | renders videos (Gemini TTS), roll-forward Mon/Thu, review bundle | packages to main |
| price-snapshot | 04:47 | refresh prices + history | catalog/site to main |
| ci-scheduled | 04:29 | full test suite | none |
| discover-publish | 06:17 Tue/Fri | adds new products, auto-validates, Gemini copy | catalog/site to main |
| weekly-health / revenue-report / post-performance | Mon 07:23 / 07:37 / 07:17 | commissions, link checks, stats | may hide dead products |
| posting-watchdog | 19:53 | checks each channel posted | GitHub issue |
Event-driven: ci.yml (push), sensitive-change-alert (push), approve-by-reply / approve-from-review (owner-only issue events), reel/sample/record/reconcile workflows (manual dispatch). GitHub cron fires 3–6 h late in practice.

Claude routines: `MasterStox Daily Monitor + Approval Queue` 08:00 UTC daily (read-only report). One-shot reminders: 1/10 06:10 (weekly video), 1/10 15:00 (verify efficiency patches), 10/10 06:45 (TikTok experiment review).

### 3. GitHub Actions minutes — September 2026 (1/9 → 28/9 09:00 UTC)
Method: every run listed via GitHub API (575 runs, none missing); each job billed = ceil(duration/60 s); skipped / never-started jobs = 0.
| Workflow | Runs | Billed min |
|---|---|---|
| ci.yml | 221 | 493 |
| build-packages | 28 | 366 |
| daily-social | 84 | 311 |
| tiktok-daily | 32 | 130 |
| telegram-daily | 40 | 124 |
| discover-publish | 17 | 59 |
| generate-ai-content | 12 | 50 |
| content-sample | 14 | 49 |
| ci-scheduled | 6 | 24 |
| sensitive-change-alert | 25 | 22 |
| weekly-health | 6 | 20 |
| price-snapshot | 4 | 15 |
| review-bundle | 10 | 13 |
| all other (18 workflows) | 76 | 62 |
| **Total** | **575** | **1,738** |
- Daily trend: 4–13/day early Sept → 23–74 (10–17/9) → 59–132 (18–23/9) → 226 and 327 on 24–25/9 (development + re-renders).
- Per-job rounding adds ~320 min (+23%): unrounded job time is 1,418 min.
- Cap hit 27/9 22:55:59 UTC; 9 runs since then failed without a runner (0 billed).
- Quota is shared per account: Master.Stox used 1,738 → the remainder (~260) presumably Snuggleberry *(estimate)*.
- Efficiency patches pushed 28/9 (6f17c32, 3037ee2): projected schedule ≈950–1,050 min/month *(estimate; unverified on GitHub until 1/10)*.

### 4. External services, secrets, costs
| Service | Use | Cost | Secret location |
|---|---|---|---|
| AliExpress Affiliate API | products, prices, links | free (earns commission) | GitHub Actions secrets `ALIEXPRESS_APP_KEY/SECRET/TRACKING_ID` |
| Upload-Post | posting to YouTube/IG/TikTok | paid subscription *(plan not verified here)* | `UPLOADPOST_API_KEY/USER` |
| Google Gemini | TTS voice + AI copy | pay-per-use, billing enabled | `GEMINI_API_KEY` |
| Telegram Bot | channel posts | free | `TELEGRAM_BOT_TOKEN` |
| Approval signing | HMAC on approvals | — | `APPROVAL_SIGNING_KEY` |
| Vercel | site hosting, auto-deploy on push | plan not verified *(Hobby forbids commercial use — check)* | Vercel project settings |
| GitHub Actions | all automation | 2,000 free min/month, $0 budget, hard stop | — |
Repo variables (not secrets): `PUBLISH_ENABLED`, `REQUIRE_SIGNED_APPROVALS`, `PUBLISH_CI_REUSE`, `ROLL_FORWARD_DAILY`. Switches: `data/automation.json` (per-channel, build).

### 5. Actions that happen without Or's per-item approval
| Action | Where | Gate today |
|---|---|---|
| Public social posts | daily-social / telegram / tiktok | **Gated**: owner-signed approval per package + per platform (HMAC, code-enforced), `PUBLISH_ENABLED`, daily limits |
| New products shown on the public site | discover-publish (Tue/Fri) | **Not gated by Or**: auto-validation + "approve" in code |
| Prices / "Lowest in 30 days" / hidden dead products on site | price-snapshot, weekly-health | not gated (automatic data refresh) |
| Paid Gemini calls | build-packages nightly, discover → generate-ai-content | not gated per run; switch `package_build_enabled` |
| Commits to main (state, catalog, packages) | bots + Claude sessions | no branch protection enforced; sensitive-change alert only |
| GitHub issues / notification emails | watchdog, alerts | automatic (to Or only) |
| Claude pushing code to main | interactive sessions | test gate script + owner instructions (process, not code-enforced) |

### 6. What already exists
- CLAUDE.md: **none**. `.claude/skills/`: `product-officer`, `web-design-guidelines` only.
- Docs: README, ARCHITECTURE, SECURITY(-REVIEW), GO-LIVE, NEXT-STEPS, RUNBOOK, ROLLBACK, REACTIVATION, automation-stability, handoffs. No `docs/adr`, `docs/efficiency`, `docs/qa`, `docs/security` folders.
- Tests/CI: 1,656 pytest tests + ruff + link/public guards; ci.yml on push, ci-scheduled daily, publish gates run CI before posting; workflow-invariant tests (pinned actions, timeouts, secret scoping).

### 7. Top risks (detail)
1. Actions cap shared with Snuggleberry; $0 hard stop; one bad dev day (327 min on 25/9) can stop publishing for both projects.
2. Site-level auto-approval in discover-publish; weekly-health can hide products; Gemini spend has no in-repo cap.
3. Enforcement lives in code on an unprotected main; a push can change the gate itself.
4. Content/trademark claims (MagSafe, Toyota, 4K/8K) and prior Instagram restriction.
5. Unverified costs/terms: Upload-Post plan, Gemini monthly spend, Vercel plan/commercial use.
