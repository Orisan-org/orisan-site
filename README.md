# Orisan Site

Next.js App Router website for Orisan. The current homepage leads with `mcpscan`, the local-first MCP server security scanner.

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

## Current Product Story

The site should present `mcpscan` as the active Orisan project:

- local-first MCP server security scanner
- alpha software, currently `v0.1.0-alpha.2`
- source/editable install only until package or binary publishing is configured
- no PyPI, pipx, Homebrew, or curl install claim for `mcpscan`
- no broad product-suite positioning

## Scout Install Endpoints

These routes currently install Orisan Scout release assets, not `mcpscan`:

```bash
curl -fsSL https://orisan.org/install | sh
```

```powershell
irm https://orisan.org/install.ps1 | iex
```

Do not use these as the primary `mcpscan` install path unless verified `mcpscan` release assets exist.
