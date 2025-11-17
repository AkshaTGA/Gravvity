This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started (Local Dev)

This repo includes a Next.js 16 app with built-in API routes and an optional Express + MongoDB server for local/dev. On Vercel, the backend runs as Next.js API routes (no separate server needed).

1) Configure environment variables

- Copy `.env.local.example` to `.env.local` inside `my-app/` and fill values:
	- `MONGO_URI` (required)
	- `ADMIN_ID`, `ADMIN_PASSWORD`, `JWT_SECRET` (required)
	- SMTP for emails (either `SMTP_*` for bulk notify or `CONTACT_SMTP_*` for contact form)
	- `NEXT_PUBLIC_BACKEND_URL` only if you want to proxy to the Express server; leave empty to use Next API routes.

2A) Start with built-in Next.js API (recommended)

```bash
npm install
npm run dev
```

- App: http://localhost:3000 (APIs at `/api/*`)

2B) Or start frontend + separate Express backend

```bash
npm install
npm run dev:full
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:4000

If you prefer to run separately:

```bash
# Terminal 1 (frontend)
npm run dev

# Terminal 2 (backend)
npm run dev:backend
```

3) Verify backend health (PowerShell)

```powershell
Invoke-WebRequest -Uri http://localhost:4000/api/public/members | Select-Object -ExpandProperty Content
Invoke-WebRequest -Uri http://localhost:4000/api/public/events   | Select-Object -ExpandProperty Content
```

If these return JSON, the frontend hooks will load data correctly. When using the built-in API, check:

```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/health | Select-Object -ExpandProperty Content
Invoke-WebRequest -Uri http://localhost:3000/api/public/events | Select-Object -ExpandProperty Content
```

Troubleshooting "Failed to fetch":
- Ensure the backend is running and `MONGO_URI` is valid.
- Open the app via http://localhost:3000 (not a file:// path).
- Check that Windows Firewall isn’t blocking port 4000.
- In production, set `NEXT_PUBLIC_BACKEND_URL` to your deployed backend URL (https).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Use the Vercel Dashboard:

- Project source: GitHub repo `connectwithusemail-debug/Gravity`
- Root Directory: `my-app`
- Framework Preset: Next.js
- Build Command: (default) `next build`
- Output Directory: (default) `.vercel/output` (handled automatically)

Environment Variables (Production and Preview):

- `MONGO_URI`: your MongoDB connection string
- `ADMIN_ID`, `ADMIN_PASSWORD`, `JWT_SECRET`: for admin auth
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`: for event notifications (or use `CONTACT_SMTP_*` for contact form)
- Optional: `KV_REST_API_URL`, `KV_REST_API_TOKEN` for subscriber storage via Upstash KV (otherwise JSON file fallback)

After first deploy, verify:

- `https://<your-domain>/api/health` returns ok JSON
- `https://<your-domain>/api/public/events` returns an array (empty is fine)
- Admin login at `/admin` with your `ADMIN_ID`/`ADMIN_PASSWORD`
