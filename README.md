# QuickHire

QuickHire is a full-stack job portal where users can discover jobs, apply to roles, and track applications, while admins can manage job listings through a dedicated admin panel.

## Summary

This project includes:

- Public marketing homepage with sections for categories, featured jobs, and latest jobs.
- Job listing page with category, keyword, and location search support.
- Protected job details and apply flow.
- Authentication with role-based behavior (`USER` and `ADMIN`).
- Admin panel to create, edit, and delete jobs.
- Applied Jobs page where signed-in users can view their submitted applications.

## What You Can Do With This Website

### As a visitor

- Browse jobs and categories.
- Search jobs by keyword and location.
- View featured/latest jobs.

### As a signed-in user

- View protected job details pages.
- Apply to jobs with resume link and cover note.
- See previously applied jobs from the top navigation.
- See `Applied` state on jobs already applied to.

### As an admin

- Access `/admin` from top navigation.
- Add new job posts.
- Edit existing job posts.
- Delete job posts.
- Mark jobs as featured.

## Tech Stack (with versions)

### Core

- Next.js `16.1.6`
- React `19.2.3`
- React DOM `19.2.3`
- TypeScript `^5`

### Backend / Data

- Prisma ORM `^7.4.2`
- `@prisma/client` `^7.4.2`
- PostgreSQL
- Neon adapter:
  - `@prisma/adapter-neon` `^7.4.2`
  - `@neondatabase/serverless` `^1.0.2`

### Auth / Validation

- NextAuth.js `^4.24.13` (Credentials provider, JWT session strategy)
- bcryptjs `^3.0.3`
- zod `^4.3.6`

### Styling / Tooling

- Tailwind CSS `^4`
- ESLint `^9`
- eslint-config-next `16.1.6`

## Project Structure (high-level)

```txt
app/
  api/                 # Route handlers (auth, jobs, categories, applications)
  admin/               # Admin panel page
  jobs/                # Jobs list, details, apply pages
  applied-jobs/        # Signed-in user's applications
  login/ signup/       # Auth pages
components/
  admin/               # Admin client panel
  hero/                # Hero + search
  featured-jobs/       # Featured jobs section (DB-backed)
  latest-jobs/         # Latest jobs section (DB-backed)
lib/
  auth.ts              # Shared NextAuth options
  prisma.ts            # Prisma client with Neon adapter
  zod.ts               # Validation schemas
prisma/
  schema.prisma        # Database schema
  seed.ts              # Seed script (admin + categories + tags + jobs)
```

## Environment Variables

Create a `.env` file in the project root.

```env
# Runtime pooled DB URL
DATABASE_URL="postgresql://..."

# Direct DB URL for migrations/seeding
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-long-random-secret"

# Seed admin credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="StrongAdminPassword123"
```

## Setup Instructions

1. Install dependencies

```bash
npm install
```

2. Run Prisma migrations

```bash
npx prisma migrate dev
```

3. Seed database (admin + demo data)

```bash
npx prisma db seed
```

4. Start development server

```bash
npm run dev
```

5. Open app

- `http://localhost:3000`

## Useful Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run production build
npm run lint     # lint project
```

## Authentication Notes

- Sign up validates:
  - required name
  - valid email
  - strong password (8+ chars, uppercase, lowercase, number)
- Login supports callback URLs.
- Protected routes redirect unauthenticated users to `/login` with callback.
- User roles are stored in session (`USER` / `ADMIN`).

## Admin Panel Notes

- Route: `/admin`
- Access restricted to `ADMIN` users only.
- CRUD operations are enforced server-side in API routes:
  - `POST /api/jobs`
  - `PATCH /api/jobs/:id`
  - `DELETE /api/jobs/:id`

## Application Flow Notes

- Apply page route: `/jobs/[id]/apply`
- On submit, application is stored in `Application` table.
- Users can view submitted applications at `/applied-jobs`.
- Job details page shows `Applied` if user already applied for that job.

## API Overview

- `GET /api/jobs` (supports `categoryId`)
- `POST /api/jobs` (admin only)
- `GET /api/jobs/:id`
- `PATCH /api/jobs/:id` (admin only)
- `DELETE /api/jobs/:id` (admin only)
- `GET /api/categories`
- `POST /api/auth/register`
- `POST /api/applications` (authenticated user)
- `GET /api/applications/me` (authenticated user)

## Notes

- Some UI images still use `<img>` and may show Next.js lint warnings suggesting `<Image />`.
- `/companies` link exists in top nav but the page is not implemented yet.
