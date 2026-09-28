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

---

# שלב 2 — הצעה (ממתין ל"מאשר" של אור; שום דבר עוד לא נוצר)

## סיכום לאור (עברית)
- **צוות של 6 תפקידים** תחת אדם (מנהל הפרויקט): ארכיטקט ראשי (כולל אחריות קבועה על דקות ועלויות), QA, אבטחה, נתוני מוצר, משפטי/פלטפורמות, ותוכן. כל תפקיד = קובץ הוראות אחד. אין להם כוח לפרסם, לשלם או לאשר.
- **שערי אישור:** 9 פעולות שרק אתה מאשר. 5 כבר נאכפות בקוד. ל-4 אחרות אני מציע אכיפה, כל אחת כהצעה נפרדת עם בדיקות, ורק באישורך.
- **שגרות:**
  - **בוקר:** מייל + התראה בטלפון, עם כרטיס לכל דבר שמחכה לך. זה שדרוג של הדו"ח הקיים ב-08:00.
  - **אחרי אישורים:** בדיקה שהפרסום אכן יצא.
  - **ראשון:** סקירת יעילות של עד 10 שורות.
  - **כולן:** קריאה בלבד.
- **משמרת לילה:** כמה סוכנים במקביל, כל אחד בעותק משלו. הם לא מוציאים כסף ולא דוחפים. אני בודק כל שינוי ומריץ את כל הבדיקות, ורק אז דוחף.
- **תיעוד:** כל החלטה שלך נרשמת עם תאריך ב-docs/decisions.

## A. Roles (`.claude/skills/<role>/SKILL.md`, one file each)
Every file: YAML front matter (`name`, `description` with EN+HE trigger words) and sections Mission · Authority/limits · Sources of truth · How it works · Deliverables · How it talks to Or. No role may publish, spend, approve, message third parties, delete data or push to main; roles produce findings, diffs and proposals for Adam.

| Role (file) | Mission | Authority / limits | Sources of truth | Deliverables | Triggers (EN / HE) |
|---|---|---|---|---|---|
| `adam` (project manager) | Orchestrate roles, keep gates, report to Or | Merges/pushes only after the full test gate; never approves for Or | this doc, `docs/decisions/`, routines | morning card, night report | adam, manager, status / אדם, סטטוס, מה המצב |
| `chief-architect` | Technical authority; ADRs; stage gates. **Standing duty: efficiency** — Actions minutes (shared with Snuggleberry), run time, Gemini/Upload-Post usage, storage (435 MB media in git) | Proposes only; any workflow/code change = separate PR-style proposal with tests + Or's OK | workflows, Actions API (read), `data/*`, cost pages | `docs/adr/NNNN-*.md`; weekly `docs/efficiency/YYYY-MM-DD.md` (≤10 lines, proposals only) | architecture, ADR, efficiency, minutes / ארכיטקטורה, יעילות, דקות |
| `qa-engineer` | Tests before every push; correctness review of every diff; media QA (safe zone, claims vs listing) | Can block a push; cannot waive a failing test | `tests/`, CI logs, rendered frames | `docs/qa/YYYY-MM-DD-*.md` pass/fail with evidence | QA, tests, review / בדיקות, QA |
| `security-auditor` | Secrets, workflow permissions, owner-only checks, dependencies, HMAC gate integrity | Read-only; severity-ranked findings | workflows, `src/approval_signature.py`, constraints | `docs/security/YYYY-MM-DD.md` (critical→low) | security, secrets / אבטחה, סודות |
| `product-data-analyst` (replaces "market analyst": no market/stock data in this project) | Prices, ratings, order counts, commission rates: source = AliExpress API / Portals, freshness + UTC timestamp on every number; spec-vs-title plausibility (4K/720P) | Read-only; never states a number without source+time | `data/catalog.json`, `price_history.json`, Portals reports (via Or) | findings list; weekly commission line | prices, commission, data / מחירים, עמלות, נתונים |
| `legal-compliance` | Affiliate disclosure (FTC/ASA), platform terms (IG/YT/TikTok/Meta ads), trademarks in titles, seller-image rights, privacy on the site | Advisory; flags block content until Or decides | `docs/rights/`, platform policies (live, dated), `product_audit.py` | `docs/compliance/YYYY-MM-DD.md` | legal, trademark, policy / משפטי, סימן מסחרי, מדיניות |
| `content-lead` (domain expert) | Hooks, template quality, paid-ad creatives, per-platform rules; runs QA agent rounds | Renders samples only; approval stays with Or | template D, QA reports, performance history | sample videos + QA scores | content, reels, hooks / תוכן, רילס, הוקים |

## B. Gates — actions that need Or's explicit approval each time
| # | Action | Enforced by code today? | Proposal |
|---|---|---|---|
| 1 | Publish a video to any platform | **Yes** — HMAC-signed per-package, per-platform approval; `PUBLISH_ENABLED`; daily limits; reserve-before-upload | keep |
| 2 | Publish the weekly compilation | **Yes** — owner-only dispatch + `approval_sha256` covering video+text | keep |
| 3 | Approve content (sign) | **Yes** — owner-only workflows (`author_association == OWNER` + actor) | keep |
| 4 | Spend on ads (Meta, TikTok) | Outside the system (Or's accounts) | rule: agents never touch ad accounts or money (already practice) |
| 5 | Change repo variables / secrets / switches | Only Or has settings access | keep; agents may only tell Or where to set |
| 6 | New products appearing on the public site | **No** — discover-publish auto-approves | proposal P1: new products land as "pending" and a daily card lists them for Or; or Or accepts auto-add explicitly (ADR) |
| 7 | Paid Gemini usage | **No** per-run cap | proposal P2: monthly call/cost counter in `data/`, build stops at a cap Or sets |
| 8 | Code/workflow changes to main | **Partly** — test gate script + sensitive-change alert; no branch protection (free private repo) | proposal P3: every change to gate files (`approval_signature`, preflight, workflows) needs an ADR line + Or's "מאשר"; alert escalates to email |
| 9 | Deleting data / hiding products | **No** (weekly-health hides after 2 failed checks) | proposal P4: hidden products listed in the morning card; nothing is deleted from git |
P1–P4 are separate proposals, each with tests, reviewed by QA + security, merged only after Or approves.

## C. Routines (proposed, not created)
| Routine | Time (Israel) | Reads | Output | Writes |
|---|---|---|---|---|
| Morning summary (replaces current 08:00 UTC monitor) | 10:45 daily | `approval_digest.py`, preflight per platform, state commits, Actions minutes this month (all repos on the account), watchdog issues | **Email** (RTL cards: one per item waiting for Or + link to the approval page) **+ push** (one line) | none |
| After-approval follow-up | 13:30 daily | approvals newer than the morning card, journal | 1–2 lines: what published / what's stuck | none |
| Weekly efficiency review (chief-architect) | Sunday within the morning run | Actions runs (billed per job), Gemini/Upload-Post usage (as available), repo size | `docs/efficiency/YYYY-MM-DD.md` ≤10 lines, top 1–3 in the email | docs-only commit (the only write, if Or approves) |
All routines: read-only except the docs-only commit Or approves; never approve, publish, dispatch publishing or spend. Actions minutes are read from the API, never estimated.

## D. Night-shift pattern
1. Adam writes one brief (goal, rules, what not to touch).
2. 3–6 specialist subagents in parallel, each in its own `git worktree` (never `cp -r`), no paid API calls, no pushes, no dispatch.
3. Each returns a diff + report with evidence.
4. Adam reviews every diff, QA runs the full suite + ruff + guards, then one push after checking no publisher is running (one push = one CI run, saves minutes).
5. Morning report to Or: what merged, what waits for his decision.

## E. Documentation map
- `CLAUDE.md` — project rules (gates, Hebrew to Or, no secrets in chat, no spending, test gate, worktrees).
- `docs/decisions/YYYY-MM-DD-*.md` — every decision of Or's, dated (e.g. TikTok first 26/9, template D, weekly video 27/9).
- `docs/adr/` · `docs/efficiency/` · `docs/security/` · `docs/qa/` · `docs/compliance/` · `docs/runbooks/` (existing RUNBOOK/ROLLBACK/REACTIVATION move or link here) · `docs/prompts/` (routine and agent prompts, versioned).

## F. Phase 3 scope (after "מאשר")
Additive only: the 7 skill files, `CLAUDE.md`, empty docs folders with README, `docs/decisions/` seeded with past decisions. No code/workflow/schedule/data change. Committed on branch `operating-model` in Master.Stox (note: a branch push may trigger CI minutes; will push after 1/10 or with Or's OK). Routine changes (morning card) are a separate approval.
