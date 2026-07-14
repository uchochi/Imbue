# Loseyourip - AI Job Board Development Plan

## Overview

A modern, responsive web application for posting and managing job vacancies at **Loseyourip**, an AI company. Built with Vite + React and a clean, minimal UI.

---

## Tech Stack

| Layer       | Technology                |
|-------------|---------------------------|
| Build       | Vite                      |
| UI          | React 18                  |
| Styling     | Tailwind CSS              |
| State       | React Context / useReducer |
| Routing     | React Router v6           |
| Icons       | Lucide React              |
| Storage     | localStorage (MVP) / Supabase (production) |
| Language    | TypeScript                |

---

## Features

### 1. Public-Facing (Job Seekers)
- **Job Listings Page** — browse all open positions, filter by department / location / type
- **Job Detail Page** — full description, requirements, and apply link/button
- **Responsive Design** — works on mobile, tablet, and desktop
- **Search & Filter** — keyword search + filter chips

### 2. Admin Dashboard (Authenticated)
- **Login Page** — simple password-based auth (JWT or session)
- **Dashboard Overview** — total jobs, total applications (future), quick stats
- **Create Job** — form to create a new posting (title, department, location, type, salary range, description, requirements, how to apply)
- **Edit Job** — modify any existing posting
- **Delete Job** — remove a posting (with confirmation)
- **Job Status Toggle** — open / closed / draft
- **Sort & Search** — find postings quickly in the admin list

---

## Project Structure

```
loseyourip/
├── public/
│   └── logo.svg
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── jobs/
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   ├── JobDetail.tsx
│   │   │   ├── JobFilter.tsx
│   │   │   └── JobForm.tsx
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── JobTable.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       └── Spinner.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useJobs.ts
│   │   └── useAuth.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── JobsPage.tsx
│   │   ├── JobDetailPage.tsx
│   │   ├── admin/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── CreateJobPage.tsx
│   │   │   └── EditJobPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/
│   │   └── jobService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .env
└── DEVELOPMENT_PLAN.md
```

---

## Data Model

### Job

```typescript
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salaryRange?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  howToApply: string;
  status: "open" | "closed" | "draft";
  createdAt: string;
  updatedAt: string;
}
```

### User (Admin)

```typescript
interface User {
  username: string;
  passwordHash: string;
}
```

---

## Routes

| Path                       | Component         | Access   |
|----------------------------|-------------------|----------|
| `/`                        | HomePage          | Public   |
| `/jobs`                    | JobsPage          | Public   |
| `/jobs/:id`                | JobDetailPage     | Public   |
| `/admin/login`             | LoginPage         | Public   |
| `/admin`                   | DashboardPage     | Admin    |
| `/admin/jobs/new`          | CreateJobPage     | Admin    |
| `/admin/jobs/:id/edit`     | EditJobPage       | Admin    |
| `*`                        | NotFoundPage      | Public   |

---

## UI / Design Guidelines

### Branding
- **Primary Color**: Electric blue `#2563EB`
- **Accent Color**: Violet `#7C3AED`
- **Dark Mode**: Slate-900 background with light text
- **Font**: Inter (Google Fonts)

### Layout
- Clean card-based layout
- Generous whitespace
- Subtle shadows and rounded corners
- Sticky navbar with glassmorphism effect

---

## Development Phases

### Phase 1 — Scaffolding & Base UI (Day 1)
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install dependencies (tailwind, react-router, lucide-react)
- [ ] Configure Tailwind CSS
- [ ] Build reusable UI components (Button, Input, Badge, Modal, Spinner)
- [ ] Set up routing structure
- [ ] Create Layout (Navbar + Footer)
- [ ] Add placeholder pages

### Phase 2 — Public Job Board (Day 2)
- [ ] Define TypeScript types
- [ ] Create mock job data + localStorage service
- [ ] Build HomePage with hero section and featured jobs
- [ ] Build JobsPage with search and filter
- [ ] Build JobCard and JobList components
- [ ] Build JobDetailPage

### Phase 3 — Admin Dashboard (Day 3)
- [ ] Set up AuthContext + useAuth hook
- [ ] Build AdminLogin page
- [ ] Build ProtectedRoute wrapper
- [ ] Build Dashboard overview page
- [ ] Build JobTable with sort/search/status filter

### Phase 4 — CRUD Operations (Day 4)
- [ ] Build CreateJobPage with JobForm
- [ ] Build EditJobPage (pre-filled form)
- [ ] Implement delete with confirmation modal
- [ ] Implement status toggle (open/closed/draft)

### Phase 5 — Polish & Deploy (Day 5)
- [ ] Add loading states and error handling
- [ ] Responsive testing and fixes
- [ ] SEO meta tags
- [ ] Build and deploy (Vercel / Netlify)

---

## Seed Data

Pre-populate the app with 6-8 AI industry jobs:

1. **Machine Learning Engineer** — Engineering, Remote
2. **Senior NLP Researcher** — Research, San Francisco
3. **AI Product Manager** — Product, New York
4. **Data Engineer** — Engineering, Remote
5. **Frontend Engineer** — Engineering, Remote
6. **DevOps Engineer** — Infrastructure, Austin
7. **AI Ethics Intern** — Research, San Francisco
8. **Technical Writer** — Content, Remote

---

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx"
}
```

---

## Future Enhancements (Post-MVP)

- Supabase integration (database + auth)
- Application submission form per job
- Email notifications for new applications
- Admin email alerts
- Analytics dashboard (views, applications per job)
- SEO / sitemap
- Dark mode toggle
