# Pages That Can Be Added (Notes)

The footer and homepage now link to a core set of marketing/legal pages that exist on `main`.
The following pages exist in the deployed site (commit `894c31f`) and **can be added later**
to round out the site. Content/copy for each is already captured in `CONTEXT.md` §4, §5, §6.

## Ready to add (content available)

| Route | Page | Source content | Notes |
| --- | --- | --- | --- |
| `/blog` | Blog | 6 posts (product, research, culture, OSS, funding, eval guide) | List of post cards w/ date, read time, category |
| `/press` | Press | 5 press items (TechCrunch, Verge, MIT Tech Review, Forbes, Wired) | `press@loseyourip.com` contact |
| `/support` | Support | 6 resources (Docs, Community, Report Bug, FAQ, Email, Status) | `support@loseyourip.com` |
| `/status` | System Status | 7 services (all operational) + 3 resolved incidents | Static; could wire to live health later |
| `/changelog` | Changelog | v2.1.0 → v2.4.0 entries | Version timeline |
| `/documentation` | Documentation | 6 sections (Quickstart, API, Models, Safety, SDKs, Guides) | Mostly placeholder links in source |

## Suggested implementation

- Each page reuses the same light-theme card pattern already used by `AboutPage` /
  `PlatformPage` / `ResearchPage` (rounded-2xl, border-slate-200, shadow-sm, primary/accent accents).
- `BlogPage`, `PressPage`, `ChangelogPage` are the highest-value adds (fresh, regularly
  updated content that reinforces the "trustworthy AI" narrative).
- `StatusPage` and `DocumentationPage` are lower priority; `DocumentationPage` links were
  placeholders in the original site.

## Open content gaps to resolve when building

- **Funding inconsistency**: homepage stats say `$45M Series A` (per user instruction, kept
  as-is), while `About` timeline says `$120M Series A` and Blog/Press say `$250M Series B`.
  Pick one canonical funding narrative before publishing Blog/Press.
- **Headcount inconsistency**: homepage stats say `50+ Team Members`; About says `150+`.
  The user explicitly asked to keep the homepage `50+` block unchanged, so About retains the
  `150+` figure for now — align during a later content pass.
