# mcp-server-dev-test

Model Context Protocol (MCP) Server implementation based on `@modelcontextprotocol/sdk`, Node.js, TypeScript, and Bun. Designed for serverless and edge environment deployments including Vercel and Cloudflare.

## Architecture

* **Runtime:** Bun / Node.js
* **Language:** TypeScript
* **Protocol:** Model Context Protocol (MCP)

## Prerequisites

* Bun >= 1.0.0
* Node.js >= 18.0.0 (required for Vercel deployment compatibility)

## Installation

```bash
bun install
```

## Development

```bash
bun run dev
```

## Deployment

### Vercel (Serverless Functions)

Ensure the `api/` directory contains the serverless function entry points.
Execute deployment via Vercel CLI:

```bash
vercel deploy --prod
```

### Cloudflare Workers

Ensure `wrangler.toml` is configured with the correct entry point (e.g., `src/index.ts`).
Execute deployment via Wrangler:

```bash
bun run wrangler deploy
```

## Protocol Specifications

Refer to the official [Model Context Protocol documentation](https://modelcontextprotocol.io/) for detailed information regarding MCP architecture, standard transports, and security models.