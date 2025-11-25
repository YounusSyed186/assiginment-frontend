# My App (Next.js)

A Next.js frontend application scaffolded with the App Router. This repository contains a simple task-management UI with authentication context, API helpers, and examples of nested routes and dynamic routing.

---

## Quick Overview

* **Framework:** Next.js (App Router)
* **Package manager:** pnpm (recommended) or npm/yarn
* **Language:** JavaScript + React (JSX / TSX mix)
* **Included features:** authentication context, `axios` wrapper, `api` helpers, pages for register, dashboard, tasks (create + dynamic task view), and middleware.

---

## Project Structure

```
app/                  # Next.js App Router source
├─ globals.css        # Global styles
├─ layout.jsx         # Root layout
├─ middleware.js      # Middleware (auth checks, etc.)
├─ page.tsx           # Home page
├─ context/authContext.jsx  # Authentication provider/hooks
├─ dashboard/page.jsx       # Dashboard route
├─ register/page.jsx        # Registration page
├─ tasks/create/page.jsx    # Create task page
├─ tasks/[id]/page.jsx      # Task details (dynamic route)

app/lib/             # API helpers
├─ axios.js           # Configured axios instance
├─ api.js             # Higher-level backend functions

public/               # Static assets
next.config.ts        # Next.js configuration
tsconfig.json         # TypeScript config
package.json          # Project dependencies & scripts
```

---

## Prerequisites

* Node.js 16+ (LTS recommended)
* `pnpm` (recommended) or `npm`/`yarn`

Install `pnpm` (if desired):

```bash
npm i -g pnpm
```

---

## Install Dependencies

```bash
pnpm install
# or npm install
# or yarn install
```

---

## Available Scripts

```bash
pnpm dev       # Start dev server at localhost:3000
pnpm build     # Build for production
pnpm start     # Start production server after build
pnpm lint      # Run linters (if configured)
```

> Replace `pnpm` with `npm run` or `yarn` if using those package managers.

---

## Environment Variables

Create a `.env.local` in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
# Add other keys as required by your backend
```

> Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Core Pieces

* **`app/context/authContext.jsx`** — Provides auth state, login/logout hooks, and user session info.
* **`app/lib/axios.js`** — Configured axios instance with baseURL and interceptors.
* **`app/lib/api.js`** — Higher-level API calls using axios: `getTasks()`, `getTask(id)`, `createTask()`, `loginUser()`, `registerUser()`.
* **`app/middleware.js`** — Handles auth redirects and route protection.

---

## Routes Overview

* `/` — Home page
* `/register` — Registration
* `/dashboard` — Dashboard (authenticated)
* `/tasks/create` — Create task
* `/tasks/[id]` — Task details (dynamic route)

---

## Development Tasks

* Start dev server:

```bash
pnpm dev
# Open http://localhost:3000
```

* Build and run production:

```bash
pnpm build
pnpm start
```

* Lint/format (if configured):

```bash
pnpm lint
pnpm format
```

---

## Testing & Debugging

* No tests included by default. If added: `pnpm test` or `pnpm jest`.
* Debug server-side code with `node --inspect` or VS Code debugger.

---

## Troubleshooting

* CORS/API issues: confirm `NEXT_PUBLIC_API_BASE_URL`.
* Auth issues: check `authContext.jsx` and axios interceptors.
* Global CSS changes: restart dev server if styles appear stale.

---

## Extending the App

* Add API calls in `app/lib/api.js`.
* Extend `authContext` for more user metadata or refresh tokens.
* Add unit/integration tests in `tests/` and wire up `pnpm test`.

---

## Notable Dependencies

* `next` — React framework
* `react`, `react-dom` — UI
* `axios` — HTTP client
* `react-hot-toast` — optional toast notifications

---

## Contributing

1. Fork and create a branch.
2. Run dev server and verify changes.
3. Open a PR with a clear description.

---

## License

Add your license (e.g., MIT) or keep private.

---

## Getting Started

```bash
npm run dev
# or yarn dev
# or pnpm dev
# or bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

Start editing `app/page.tsx`; page auto-updates on changes.

---
