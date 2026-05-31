# Orisan Site

Next.js App Router website for Orisan and Orisan Scout.

Production preview:

- https://orisan-site.vercel.app

Primary domain target:

- https://orisan.org
- https://www.orisan.org

## Local Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deployment

The site is deployed to Vercel project `orisan-site`.

Manual production deploy:

```bash
npx vercel deploy --prod --yes
```

GitHub repository:

- https://github.com/Orisan-org/orisan-site

Automatic Vercel deploys require the Vercel GitHub app to have access to `Orisan-org/orisan-site`.

## DNS

`orisan.org` and `www.orisan.org` are attached to the Vercel project. DNS must point to Vercel:

```text
A     @      76.76.21.21
A     www    76.76.21.21
```

Current known blocker: the domain is still using `dns1.registrar-servers.com` and `dns2.registrar-servers.com`, so records must be changed at the current registrar/DNS provider.

## Install Endpoints

The primary user-facing install paths are:

```bash
curl -fsSL https://orisan.org/install | sh
```

```powershell
irm https://orisan.org/install.ps1 | iex
```

Exact release tags and asset URLs are kept in `lib/constants.ts` and GitHub Releases for advanced/manual install paths.
