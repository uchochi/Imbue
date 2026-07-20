# Loseyourip — Forum + Supabase Database Integration

**Date:** 2026-07-20
**Project:** Loseyourip job board (React + Vite) + Xubi Supabase project

---

## Objective

1. Add a **forum** inside the existing app where the user teaches people interested in the
   "Local Language AI Contributor" job how to format datasets for AI.
2. Integrate the **Xubi Supabase project** (`vfemvdzoimvkuedomizn`) as the database for both
   job listings and the forum (replacing the in-memory `/api/jobs` serverless function).

---

## Decisions (from user)

- **Forum auth:** Supabase email + password.
- **Forum visibility:** Public read (anyone can view threads); login required to post/reply.
- **Admin:** Can pin / archive / delete forum threads. Determined by `app_metadata.role = 'admin'`
  (not hardcoded).
- **Email verification:** NOT mandatory at signup. Users get a session immediately
  (`mailer_autoconfirm = True` on the project). An **amber reminder banner** prompts them to
  verify their email at their convenience, with occasional re-reminders.

---

## Database Schema (Xubi project `vfemvdzoimvkuedomizn`)

Migration: `create_jobs_and_forum_tables`

### `jobs`
| column | type | notes |
|--------|------|-------|
| id | uuid (pk, default gen_random_uuid) | |
| title | text | |
| department | text | |
| location | text | |
| type | text (enum check) | full-time, part-time, contract, internship |
| salary_range | text | |
| description | text | |
| requirements | text[] | |
| responsibilities | text[] | |
| how_to_apply | text | |
| apply_link | text | |
| status | text (check) | open, closed, draft |
| created_at / updated_at | timestamptz | |

### `forum_topics`
| column | type | notes |
|--------|------|-------|
| id | uuid (pk) | |
| title | text | |
| content | text | |
| author_id | uuid -> users(id) | on delete cascade |
| is_pinned | bool | |
| is_archived | bool | |
| is_locked | bool | |
| tags | text[] | |
| created_at / updated_at | timestamptz | |

### `forum_posts` (replies)
| column | type | notes |
|--------|------|-------|
| id | uuid (pk) | |
| topic_id | uuid -> forum_topics(id) | on delete cascade |
| author_id | uuid -> users(id) | on delete cascade |
| content | text | |
| parent_id | uuid -> forum_posts(id) | on delete set null (threaded replies) |
| created_at / updated_at | timestamptz | |

> Note: The Xubi project already had a full forum schema (departments, users, threads, posts,
> reactions, tags, knowledge_verifications, notifications, moderation_actions,
> knowledge_base_articles). We reused the existing `users` table and added `jobs`,
> `forum_topics`, `forum_posts`.

### RLS Policies
- **jobs:** anon/authenticated can SELECT `status = 'open'`. Authenticated users can SELECT all.
  Only `app_metadata.role = 'admin'` can INSERT/UPDATE/DELETE.
- **forum_topics / forum_posts:** SELECT = public. INSERT requires auth (author = current user).
  UPDATE/DELETE allowed for author OR admin.

### Seed Data
- 9 jobs inserted (IDs `00000000-...-001` ... `009`), including the
  "Local Language AI Contributor" job (salary `$50 - $100 / dataset (1500 words and above)`,
  WhatsApp apply link).
- "Dataset Training" department created (`slug = dataset-training`).

---

## Frontend Changes

### New / Modified Files

| File | Change |
|------|--------|
| `src/lib/supabase.ts` | Supabase client (env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) |
| `.env` / `.env.example` | Supabase URL + publishable anon key |
| `src/services/jobService.ts` | Rewritten to use `supabase.from('jobs')` instead of `fetch('/api/jobs')` |
| `src/services/forumService.ts` | New — forum topic/post CRUD via Supabase |
| `src/context/AuthContext.tsx` | Uses Supabase `signInWithPassword` / `signUp` / `onAuthStateChange`; `user.role` from `app_metadata` |
| `src/types/index.ts` | Added `ForumTopic`, `ForumPost`, `UserInfo`; removed zod import |
| `src/pages/Layout.tsx` | New layout with Navbar (Home / Open Positions / Forum / Dashboard) + footer |
| `src/components/admin/ProtectedAdminRoute.tsx` | New — protects `/admin/*` (admin role or legacy session) |
| `src/pages/ForumPage.tsx` | Topic list, admin pin/archive/delete, amber verify banner, `?welcome=1` |
| `src/pages/ForumTopicPage.tsx` | Thread view + replies + reply form + verify banner |
| `src/pages/NewTopicPage.tsx` | Create topic form |
| `src/pages/admin/LoginPage.tsx` | Supabase password login |
| `src/pages/admin/SignupPage.tsx` | Supabase signup -> creates `users` row -> routes to `/forum?welcome=1` |
| `src/App.tsx` | Routes: `/`, `/jobs`, `/jobs/:id`, `/forum`, `/forum/:topicId`, `/forum/new`, `/admin/login`, `/admin/signup`, `/admin`, `/admin/jobs/new`, `/admin/jobs/:id/edit` |
| `api/[...slug].js` | Rewritten to proxy `/api/jobs` to Supabase (for local dev parity) |
| `server/index.js` | Rewritten to serve `dist/` + proxy `/api/jobs` to Supabase |

### Removed
- `src/components/layout/Layout.tsx` (old layout, replaced by `pages/Layout.tsx`)
- `src/components/forum/CreateThreadForm.tsx` (duplicate; removed)
- `src/pages/ForumLayout.tsx` (unused)
- In-memory SEED data (now in DB)

### Dependencies
- Added `@supabase/supabase-js`
- Removed `sonner` (not needed)

---

## How Auth Works

- **Sign up:** `supabase.auth.signUp({ email, password, options: { data: { name } } })`.
  Because `mailer_autoconfirm = True`, a session is returned immediately -> user is logged in.
  A `users` row is created (role `user`). Routed to `/forum?welcome=1`.
- **Sign in:** `supabase.auth.signInWithPassword`.
- **Admin:** The admin user must have `app_metadata.role = 'admin'` (set in Supabase auth
  user settings). `ProtectedAdminRoute` checks `user.role === 'admin'`.
- **Legacy admin:** `sessionStorage` key `loseyourip_admin` still honored for backward compat.
- **Email verification banner:** Shown on `/forum` when `?welcome=1` or when the logged-in user
  has `email_confirmed_at = null`. Re-surfaces every 3rd forum visit (sessionStorage counter).

---

## Verification Status

- [x] `npm run build` passes (tsc + vite)
- [ ] Runtime: jobs load from Supabase
- [ ] Runtime: forum create/list/reply works
- [ ] Runtime: admin pin/archive/delete works
- [ ] Runtime: RLS blocks anonymous job writes

---

## Deployment Notes

- Set Vercel env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- `vercel.json` rewrites `/((?!api).*)` -> `index.html`.
- The `api/[...slug].js` function needs env vars `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
  (Vercel exposes env vars to serverless functions).

---

## Next Steps

1. Run the dev server and verify jobs + forum end-to-end in browser.
2. Create the admin user in Supabase (set `app_metadata.role = 'admin'`).
3. Deploy to Vercel with the env vars set.
4. Optionally add a "Dataset Training" knowledge-base section using existing
   `knowledge_base_articles` table.
