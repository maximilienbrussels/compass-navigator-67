# App source import
- [ ] Audit multilingual coverage across all routes, controls, dialogs and notifications; fix missing catalog entries and hardcoded interface text; verify NL/EN/FR/DE.
- [x] Import full source and assets, excluding secrets and repository metadata.
- [x] Install dependencies, confirm the build, and verify the public home page and account entry page.
- [x] Link Neon and verify database reachability and the existing restricted app role.
- [ ] Complete account, email, payment, and other external-service setup (requires provider settings; authenticated flows remain unverified).

## Omni-Matrix
- [x] Confirm /dev/visit-fx route, mocks and CSS remnants are absent; retain real physics engine and regression tests; restrict Studio test-event listener to explicit preview instances.
- [ ] Certify visit-effect launch readiness: needs real configured public-profile browser verification and final TypeScript result; manual typechecks are disallowed here. Existing root/custom-domain profile effects remain intact.
- [x] Harden accepted-card reconciliation, coalesced SSE readback, kinetic playback lifecycle and exact renderer egress allowlists; focused regressions pass.
- [x] Finish sovereign-only manual grid media, semantic draft catalog and compatibility endpoint paths; UUID webhook tokens stay hashed.
- [x] Implement sandbox-required optional SPA metadata rendering in the standalone daemon and optimistic Studio grid transitions.
- [x] Extend regression coverage: local paths, catalog owner isolation, UUID webhook enqueue, uploads and SSE readback; live webhook paths reject unauthenticated callers.
- [ ] Validate hardened SPA browser on deployment host: root-only sandbox cannot launch Chromium sandbox; requires non-root host with sandbox support.
- [x] Audit existing ingestion, Studio controls, profile grid, storage and queue.
- [x] Add Studio URL imports, job inbox, webhook-token controls, content-type/meta editing and Hero switch.
- [x] Add bounded webhook bodies, guarded oEmbed discovery, local-media mapping and reduced-motion kinetic controls.
- [x] Run 25 targeted tests and bunx tsgo --noEmit (exit 0); preview build succeeds.
- [ ] Activate ingestion schema in Neon: schema read confirms 0188/0189 are not applied; review/apply 0188, 0189 and 0190, including explicit rename/role permissions.
- [x] Replace request-lifetime processing with enqueue-only web handlers and public.omni_jobs.
- [x] Add standalone PostgreSQL LISTEN/NOTIFY daemon with SKIP LOCKED claims, leases, retries and five-minute zombie recovery.
- [x] Move extraction and Sharp/FFmpeg conversion into the daemon; use private Scaleway S3 and metadata-only job paths.
- [x] Replace Studio polling with authenticated SSE from the persistent daemon.
- [x] Test queue, recovery, ticket authorization and separation of web/worker concerns; native disposable PostgreSQL confirms commit-only notifications and SKIP LOCKED concurrency.
- [x] Final targeted checks: 23 application tests and 5 daemon tests pass, including real Sharp/FFmpeg conversion; preview build OK.
- [x] Current verification: 51 application tests and 4 daemon tests pass; native PostgreSQL test previously passed, hardened browser deployment check remains blocked; preview build OK.
- [x] Further hardening: 36 focused application tests, 6 daemon tests and 9 visit-effect regressions pass; hardened browser test skipped under root. Homepage loads without page errors; unauthenticated ingest rejects requests.
- [ ] Standalone daemon TypeScript check: separate worker/tsconfig.json supplied; manual typecheck execution is disallowed in this environment, so a tsgo exit-0 guarantee is not provided.
- [ ] Deploy daemon and activate migration: requires persistent PostgreSQL access (the Neon HTTP connector cannot LISTEN), worker hosting, storage credentials and shared realtime secret.
- [ ] Authenticated end-to-end ingestion and published media verification: blocked by missing ingestion schema and account setup.

## Live Presence (request 2026-11-03)
- [x] Fix crash on "Stuur ook een anonieme vraag" under a Q&A pulse; open a dialog to write the question.
- [x] Rename Studio "Live-status" folder to "Live Presence" with blocks Indicator / Bericht / Pulse (ring switch).
- [x] Move "Status update" from Links en componenten into Live Presence.
- [x] Move Steam / Last.fm toggles into Live-koppelingen.
- [x] Collapse Privacyregels, API-sleutel, Eigen status into accordions.
- [x] Richer pulse composer (story-style: text backgrounds, fonts, stickers) and Command Center posting/management.
- [x] Applied 0164–0191 to Neon (0167 held back: deletes voice-key table, needs owner OK)

## Platform improvement plan (2026-11-03, approved)
- [x] Fase 1: visibility rules, exact-time scheduling + editor date validation, og:locale on all share cards, shared visit dedupe with required hash salt, account data/export i18n, 0167 confirmed applied
- [ ] Fase 1 follow-up: load translation bundles per page instead of all at once (deferred: needs SSR-safe async loading)
- [ ] Link a Neon connection that logs in as the restricted rout_app role (current connection is the owner role, which the app refuses)
- [x] Fase 2: restore from own export + LinkStack import (draft only, undo); vCard block already existed
- [x] Fase 3: signup block encrypted + owner-only RLS (0193), double opt-in, Studio CSV, admin counts only; stats now show countries + devices
- [x] Fase 3 note: referrer storage dropped again (0194): project privacy policy and "Mijn data" promise say ROUT stores no referrers
- [x] Fase 4: archive view, non-navigating preview, countdown block, optional bento tile sizes
- [ ] Signup confirmation mails need the SMTP mailbox passwords (SMTP_PASS_SYSTEM); until then signups stay "pending"
- [ ] Pre-existing failing tests: OmniIngestPanel (expects Dutch labels, page bundle not loaded in test) and ProfileHubPicker (mock lacks createMiddleware)

## Admin & Studio (request 2026-11-03 16:33)
- [x] Admin portal audit: classic console (users, payments, audit, VIP, aliases, promos, pricing, delivery, showcase, deployment) was unreachable; now routed at /admin/console?tab=… and every page/tab is in the menu (guarded by admin-portal-nav.test.ts)
- [x] New admin pages: Functies aan/uit (0195, enforced server-side), Werkruimtes & bedrijven, Gebruikersnamen-register; Merknamen added to the menu
- [x] Studio profile header order: avatar, name, username, location, bio (Studio form and public profile)
- [x] Button shape: text colour moved to Typography; Knoprand on/off + colour replaces it
- [x] Account-merge manifest: omni/presence tables marked "skip" (blocks merge instead of losing data) until a move strategy is reviewed
- [ ] Not verified in the browser: admin pages and Studio need a signed-in admin session (Neon auth, none available here)
- [ ] Community reviews have no submission or moderation flow in code yet (only approved rows are read)
