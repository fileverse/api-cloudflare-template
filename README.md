# Fileverse API — Cloudflare Template (PostgreSQL)

Deploy [Fileverse API](https://www.npmjs.com/package/@fileverse/api) on Cloudflare Containers with an external PostgreSQL database.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/fileverse/api-cloudflare-template)

## Prerequisites

- A [Cloudflare](https://cloudflare.com) account with Workers Paid plan
- A [Fileverse](https://fileverse.io) API key
- A PostgreSQL database (any provider)

## Quick Start

### One-Click Deploy

Click the **Deploy to Cloudflare** button above, then set the following secrets in the Cloudflare dashboard:

```
API_KEY=your-fileverse-api-key
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### Manual Deploy

```bash
git clone https://github.com/fileverse/api-cloudflare-template.git
cd api-cloudflare-template
npm install

# Copy and fill in your environment variables
cp .dev.vars.example .dev.vars

# Deploy to Cloudflare
npx wrangler deploy
```

Then set your secrets:

```bash
npx wrangler secret put API_KEY
npx wrangler secret put DATABASE_URL
```

## Local Development

Start a local PostgreSQL database and the API with Docker Compose:

```bash
# Set your API key
export API_KEY=your-fileverse-api-key

# Start services
docker compose up
```

The API will be available at `http://localhost:8001`.

Verify it's running:

```bash
curl http://localhost:8001/ping
# {"reply":"pong"}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `API_KEY` | Yes | Your Fileverse API key |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `RPC_URL` | No | Custom Ethereum RPC endpoint |
| `WORKER_CONCURRENCY` | No | Background worker concurrency (default: `5`) |

## PostgreSQL Providers

Any PostgreSQL-compatible database works. Some options:

- [Neon](https://neon.tech) — Serverless PostgreSQL with generous free tier
- [Supabase](https://supabase.com) — Managed PostgreSQL with extras
- [Railway](https://railway.app) — Simple cloud PostgreSQL
- Self-hosted — Any PostgreSQL 14+ instance

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Cloudflare                       │
│                                                   │
│  ┌──────────┐    ┌──────────────────────────┐    │
│  │  Worker   │───▶│  Container (Durable Object)│    │
│  │  (proxy)  │    │  ┌────────────────────┐  │    │
│  └──────────┘    │  │  @fileverse/api     │  │    │
│                   │  │  Express server     │  │    │
│                   │  └────────┬───────────┘  │    │
│                   └───────────┼──────────────┘    │
│                               │                    │
└───────────────────────────────┼────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │  External PostgreSQL   │
                    │  (Neon, Supabase, etc) │
                    └───────────────────────┘
```

## License

MIT
