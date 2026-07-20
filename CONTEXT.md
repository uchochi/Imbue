# LYIP — Project Context Write-Up

> Source of truth for what **LoseYourIP (LYIP)** is, what the site communicates, and how the
> current codebase maps to that story. Compiled from the deployed marketing site
> (commit `894c31f`) plus the live application code on `main`.

---

## 1. What Is LYIP?

**LoseYourIP** is a fictional AI company / brand presented as a real-world AI platform. Its
positioning: *"Build the future of intelligence"* — an AI research and infrastructure company
building models and APIs that are **powerful, safe, and aligned with human values**.

The public-facing promise is **trustworthy AI**: transparency, reliability, and alignment are
the differentiators versus "flashy demos." The tagline on the homepage hero is:

> *"Join a team of world-class researchers, engineers, and builders working on AI that is safe,
> powerful, and aligned with human values."*

The product is a **developer platform** (chat completions, embeddings, fine-tuning, streaming
inference, observability) wrapped in a hiring/careers site, a research blog, a community hub,
and — in the current `main` branch — a **jobs board + learning forum** backed by Supabase.

---

## 2. Mission, Vision, Approach

| Pillar | Copy (verbatim from site) |
| --- | --- |
| **Mission** | "To build AI systems that are genuinely helpful, transparent, and aligned with human interests. We want to make trustworthy AI the standard, not the exception." |
| **Vision** | "A world where artificial intelligence amplifies human potential while respecting human values. Where AI systems are understood, trusted, and beneficial for everyone." |
| **Approach** | "We combine cutting-edge research with rigorous engineering. Every model we build undergoes extensive safety testing, and we publish our findings to advance the field." |

### Core Values (homepage)
1. **Intellectual Curiosity** — best breakthroughs come from relentless questioning.
2. **Radical Collaboration** — hardest problems need diverse perspectives.
3. **Safety First** — AI that is safe, aligned, and beneficial for everyone.
4. **Ship with Purpose** — move fast but never lose sight of impact.
5. **Global Impact** — think globally from day one.
6. **Open Knowledge** — contribute to and share with the research community.

### Employee Perks (homepage)
Competitive Equity · Remote-First · Premium Healthcare · $5,000/yr Learning Budget ·
Personal GPU Budget for side projects · Quarterly Team Retreats.

---

## 3. Company Facts

### Headline stats (homepage)
- **150+** Team Members
- **12** Countries
- **$2.1B** Valuation
- **50M+** API Calls Daily

### Funding / milestones (timeline + blog + press)
- **2021** — Founded, mission to build trustworthy AI.
- **2022** — $15M Seed round.
- **2023** — First product launched (core AI platform, early access).
- **2024** — $120M Series A.
- **2025** — Global expansion to 12 countries, 150+ team members.
- **2026** — **$250M Series B** (per Blog post #5 and Press/TechCrunch), "doubling down on
  trustworthy AI." (Note: homepage still shows $2.1B valuation / Series context from earlier copy.)

### Teams (About page)
| Team | Headcount | Focus |
| --- | --- | --- |
| Leadership | 8 | Vision & strategy |
| Engineering | 65 | Core platform |
| Research | 30 | Frontiers of AI |
| Design & Product | 20 | User experience |
| Operations | 15 | Keep things running |
| Marketing & Sales | 12 | Tell the story |

---

## 4. Platform & Product

**Positioning:** "A complete AI platform built for developers who need powerful, safe, and
reliable infrastructure. From prototype to production in minutes."

### Platform features
- **Advanced Inference Engine** — reasoning, multi-step workflows, chain-of-thought.
- **Built-in Safety Guardrails** — content filtering, hallucination detection, alignment scoring.
- **Real-Time Streaming** — sub-100ms time-to-first-token.
- **Enterprise Security** — SOC 2 Type II, E2E encryption, data residency, custom deploy zones.
- **Observability Dashboard** — usage, latency, cost, quality metrics, alerting.
- **Global Edge Network** — 12 regions for low-latency access.

### Models (Documentation page)
- **LoseYourIP-7B**
- **LoseYourIP-70B**
- **LoseYourIP-Max** — 200K context window (added v2.1.0), flagship alignment model.

### API surface (implied by docs/changelog)
- `/v1/chat/completions` (legacy `/v1/completions` deprecated in v2.3.0)
- Embeddings
- Fine-tuning
- Batch processing (v2.2.0)
- Alignment scoring endpoint (v2.1.0)
- Custom guardrail configuration API (v2.3.0)

### SDKs
Python (async/await native since v2.1.0) · Node.js · Go (v1.0 in v2.3.0) · REST.

### Changelog (recent)
| Version | Date | Highlights |
| --- | --- | --- |
| 2.4.0 | Jul 10, 2026 | Real-time streaming for all models; observability dashboard w/ cost tracking; −40% latency; multibyte token fix |
| 2.3.2 | Jun 18, 2026 | Rate-limiter fix; streaming final-chunk fix |
| 2.3.0 | May 25, 2026 | Custom guardrails API; Go SDK v1.0; +25% hallucination detection; deprecated legacy completions |
| 2.2.0 | Apr 12, 2026 | Batch processing; EU/APAC data residency; <50ms model switching |
| 2.1.0 | Mar 1, 2026 | LoseYourIP-Max (200K ctx); alignment scoring API; async Python SDK; CORS streaming fix |

### System Status (Status page)
All services "Operational" (API Chat/Embeddings/Fine-tuning, Streaming, Dashboard, Docs, Auth)
with 99.95%–100% uptime. Recent resolved incidents: Jun 22 latency (47m), May 8 503s on
fine-tuning (23m), Mar 14 dashboard login (12m).

---

## 5. Research

Published / presented papers (Research page):
- *Scaling Alignment: Lessons from Training LoseYourIP-Max* — NeurIPS 2026
- *Real-Time Hallucination Detection in LLMs* — ICML 2026 (94% precision, sub-ms)
- *Constitutional AI at Scale: A Practical Framework* — ICLR 2026
- *Efficient Fine-Tuning with LoRA++: Dynamic Rank Adaptation* — arXiv 2026
- *Measuring What Matters: New Benchmarks for AI Trustworthiness* — NeurIPS 2025

Open-sourced an **Alignment Toolkit** (Blog post #4).

---

## 6. Content / Marketing Pages (from deployed site)

| Route | Page | Key copy |
| --- | --- | --- |
| `/` | Home | Hero "Build the future of intelligence"; stats; featured jobs; values; perks |
| `/about` | About | "Building AI you can trust"; mission/vision/approach; timeline; teams |
| `/jobs` | Open Roles | Job listings (Supabase-backed in current code) |
| `/jobs/:id` | Job Detail | Full posting + apply |
| `/about`→Community | Community | Discord (12k+), GitHub Discussions, Meetups (15+ cities), Community Blog |
| `/platform` | Platform | Feature grid, "Read the Docs" CTA |
| `/research` | Research | Paper list |
| `/documentation` | Documentation | Quickstart, API Reference, Models, Safety, SDKs, Guides |
| `/blog` | Blog | 6 posts (product, research, culture, OSS, funding, eval guide) |
| `/press` | Press | TechCrunch, The Verge, MIT Tech Review, Forbes, Wired coverage; press@loseyourip.com |
| `/support` | Support | Docs, Community, Report Bug, FAQ, Email (support@loseyourip.com), Status |
| `/status` | System Status | Live service health + incident history |
| `/changelog` | Changelog | Version timeline |
| `/terms` | Terms of Service | Last updated Jul 1, 2026; legal@loseyourip.com |
| `/privacy` | Privacy Policy | Last updated Jul 1, 2026; privacy@loseyourip.com |
| `/cookies` | Cookie Policy | Last updated Jul 1, 2026 |

**Contact emails used on site:** `press@loseyourip.com`, `support@loseyourip.com`,
`legal@loseyourip.com`, `privacy@loseyourip.com`.

---

## 7. Community & Support

- **Discord** — 12,000+ developers.
- **GitHub Discussions** — Q&A and OSS collaboration.
- **Meetups & Events** — 15+ cities.
- **Community Blog** — member tutorials/case studies.
- **Support channels** — Documentation, Community, Report a Bug, FAQ, Email, System Status.

---

## 8. Current Codebase State (`main` branch)

The live application on `main` is a **refactor** of the deployed marketing site. It keeps the
careers/jobs surface and adds a **Supabase-backed learning forum** for the
*"AI Dataset for Local Language Curator"* role.

### Stack
React 19 · Vite 8 · Tailwind v4 · React Router v7 · TypeScript · custom Node HTTP server ·
Supabase (`vfemvdzoimvkuedomizn`, "Xubi").

### Supabase schema (key tables)
- `jobs` — 9 seeded positions; job #9 = **"AI Dataset for Local Language Curator"**
  (part-time, WhatsApp apply link, `$50 – $100 / dataset (1500+ words)`).
- `forum_topics` / `forum_posts` — public-read forum; login required to post/reply.
- `users` — forum profiles (`role`, `department_id`, `knowledge_score`, `is_paused`,
  `is_muted`, etc.). Roles: `apprentice`, `instructor`, `junior_staff`, `senior_instructor`,
  `admin`. Signup creates an `apprentice` row.
- `departments` — includes `dataset-training` slug.
- Plus legacy tables from the schema: `threads`, `posts`, `reactions`, `tags`,
  `thread_tags`, `knowledge_base_articles`, `knowledge_verifications`, `notifications`,
  `moderation_actions`.

### Auth & roles
- Supabase email/password auth. `mailer_autoconfirm = true` (session returns immediately;
  amber "verify later" banner on `?welcome=1` and every 3rd forum visit).
- Admin = `app_metadata.role === 'admin'` (not hardcoded); can pin/archive/delete threads.

### Routes
- Public: `/`, `/jobs`, `/jobs/:id`, `/forum`, `/forum/:topicId`, `/forum/new`,
  `/admin/login`, `/admin/signup`.
- `/admin` (ProtectedAdminRoute) — job dashboard (admin only).
- `/dashboard` (ProtectedUserRoute) — **user dashboard** (any logged-in user): profile card
  (name, role, department, knowledge score, mute/pause status), topic & reply counts, and
  lists of *My Topics* / *My Replies* from the `users` + forum tables.

### Known / resolved issues
- White screen fixed: `supabase.ts` no longer throws on missing env (placeholder fallback) +
  `ErrorBoundary` wraps `<App/>`. Vercel needs `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
  set explicitly.
- Duplicate `<BrowserRouter>` removed (main had one, App had one) — was crashing.
- Navbar previously showed "Dashboard" to *all* authenticated users but pointed to `/admin`
  only admins can open → fixed: admins get "Dashboard" → `/admin`, users get "My Dashboard"
  → `/dashboard`.

---

## 9. Brand & Design Notes (deployed version)

- **Theme:** dark, glassy, gradient accents. Tailwind tokens: `primary`, `primary-light`,
  `accent`, `surface`, `surface-card`, `surface-light`, `border`, `text-primary`,
  `text-secondary`, `text-muted`.
- **Motion:** `framer-motion` throughout (fade/slide/scale on scroll), glow + float keyframes.
- **Logo:** `loseyourip-logo.png` (displayed ~h-8/h-10).
- The current `main` branch uses a **light** theme (`slate-900`, `primary`, `accent`) and a
  different `Layout.tsx`/navbar — the two visual systems differ; align during next polish pass.

---

## 10. Open Context Gaps to Fill Later
- Live homepage copy on `main` is minimal vs. the deployed marketing site — consider restoring
  the About/Platform/Research/Community/Blog/Press/Support/Status/legal pages (they exist at
  commit `894c31f` but are not on `main`).
- Funding figures are inconsistent between pages ($120M Series A vs $250M Series B vs $2.1B
  valuation) — pick one canonical narrative.
- Forum "AI Dataset for Local Language Curator" training content (the forum's purpose) should
  be seeded with starter topics so new users have context.
