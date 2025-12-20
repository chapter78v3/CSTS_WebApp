# CSTS Next.js + Tailwind Starter

Modern starter site structure for a Cybersecurity / Cloud / IT Services organization.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages included

- `/` Home
- `/services`
- `/industries`
- `/case-studies`
- `/about`
- `/contact`

## Production build

```bash
npm run build
npm start
```

## Deploy notes (Azure Static Web Apps)

- Build command: `npm run build`
- Output: Next.js uses SSR by default. For Azure Static Web Apps, either:
  - Use the Azure SWA Next.js integration (recommended), or
  - Convert to a static export (not recommended if you want server features).
