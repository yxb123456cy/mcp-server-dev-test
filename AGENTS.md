# Agent Instructions: MCP Server Repository

## Repository Context
This repository implements a Model Context Protocol (MCP) Server. The infrastructure relies on `@modelcontextprotocol/sdk` utilizing Bun as the primary package manager and runtime during development, with deployment targets including Vercel and Cloudflare.

## Technical Stack
* **Language:** TypeScript (Strict mode enabled)
* **Runtime/Tooling:** Bun, Node.js
* **Core SDK:** `@modelcontextprotocol/sdk`
* **Deployment:** Vercel (Serverless), Cloudflare (Edge/Workers)

## Development Rules

### 1. Code Standards
* Use ES Modules (`"type": "module"` in `package.json`).
* Strictly adhere to TypeScript type definitions. Avoid using `any`; use `unknown` with type guards where necessary.
* Follow the official MCP SDK specifications for server implementation.
* Maintain clear separation between protocol handling and business logic.

### 2. Dependency Management
* Use `bun add <package>` for managing dependencies. Do not use `npm` or `yarn`.
* Ensure edge compatibility for any added dependencies, as the server targets Vercel and Cloudflare. Avoid modules that rely heavily on Node.js core modules (e.g., `fs`, `net`, `child_process`) if they break edge runtime compatibility, or provide appropriate polyfills/fallbacks.

### 3. Deployment Considerations
* **Vercel:** Entry points must align with Vercel's serverless function specifications. Standard HTTP transport bindings from the MCP SDK should be adapted to the Request/Response Web API standards.
* **Cloudflare Workers:** Code must be compatible with the V8 isolate environment. Utilize standard Fetch API and Streams API natively. Avoid Node-specific APIs that are not supported in Cloudflare Workers.

### 4. Style & Formatting
* Maintain high information density and professional enterprise semantics in all code and documentation.
* Do not generate placeholder, marketing, or conversational comments. All comments must describe non-obvious technical constraints or business logic.