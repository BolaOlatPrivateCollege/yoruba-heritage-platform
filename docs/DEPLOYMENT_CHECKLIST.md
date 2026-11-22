# Public deployment checklist (not yet complete)

- [ ] Project owner controls domain, GitHub repository, Cloudflare and Supabase account access, billing, DNS and recovery methods.
- [ ] Separate dev/staging/prod projects with least-privilege secrets (never committed).
- [ ] Site and staging services accessible via HTTPS with consistent CSP/CORS and secure cookies/session protections.
- [ ] Static site article pages and search built, SEO metadata and sitemap validated.
- [ ] PostgreSQL migrations reviewed and repeatable; staging database can be reset safely.
- [ ] RLS allow/deny tests for anonymous, contributor, moderator, reviewer and administrator operations.
- [ ] Human-approved roles, MFA for staff, change review and service-credential rotation procedures.
- [ ] Sanitize user input; safe output rendering; CSRF protections for privileged session-based actions where applicable.
- [ ] Abuse controls: request size limits, rate limiting, spam review, blocking/reporting, notifications and appeals.
- [ ] Source-submission intake includes consent, private attribution and permission/withdrawal paths.
- [ ] Media file validation, malware safeguards, restricted/private buckets and rights-clearance records.
- [ ] Editorial evidence-source requirements and Samuel Johnson exclusion tested.
- [ ] Privacy notice, retention schedule, request/correction/deletion contact and Nigeria Data Protection Act compliance review.
- [ ] Working disaster recovery: automated backups, documented restore procedure, retention and restoration rehearsal.
- [ ] Logs, availability monitoring, error tracking and cost-budget alerts enabled.
- [ ] Accessibility/mobile checks and content expert/custodian sample audit completed.
- [ ] Final production deployment approved explicitly by the project owner.

## Cost policy
Free or low-cost tiers are acceptable for staging/pilots if within documented limits. Do not promise uninterrupted availability on free tiers. Confirm current bills, published caps and noncommercial-use restrictions before making a commitment.
