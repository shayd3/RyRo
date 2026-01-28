# Copilot Instructions for Ryro

Ryro is a URL shortener built with Next.js 15 (App Router), React 19, Prisma, and PostgreSQL, deployed on Vercel.

## Architecture Overview

```
User → middleware.ts (slug redirect) → /api/v1/url/[slug] → PostgreSQL
                                    ↘ /api/v1/url (create) ↗
```

- **Middleware** ([middleware.ts](../middleware.ts)): Intercepts `/:slug` requests and redirects to the API
- **API Routes** ([app/api/v1/url/](../app/api/v1/url/)): RESTful endpoints for creating and resolving short URLs
- **Database** ([lib/db.ts](../lib/db.ts)): Singleton Prisma client pattern for connection pooling
- **Single Page UI**: React client component form submits to API, no server actions

## Key Patterns

### API Route Structure
Routes use Next.js 15 async params pattern:
```typescript
// app/api/v1/url/[slug]/route.ts
export async function GET(
    request: Request,
    { params }: { params: Promise<{slug: string}> }
): Promise<NextResponse> {
    const { slug } = await params;  // Must await params in Next.js 15
}
```

### Validation
Use Zod for request validation at API boundaries (see [app/api/v1/url/route.ts](../app/api/v1/url/route.ts)):
```typescript
const schema = z.object({
    url: z.string().url({ message: 'Invalid URL format' })
});
const { url } = schema.parse(body);
```

### Client Components
Client components use `'use client'` directive and fetch from `/api/v1/url` endpoints. See [ShortenUrlForm.tsx](../components/ShortenUrlForm.tsx) for the pattern.

### Slug Generation
Random 8-character alphanumeric slugs with collision checking:
```typescript
slug = Math.random().toString(36).substring(2, 10);
```

## Development Commands

```bash
pnpm dev          # Start with Turbopack (fast refresh)
pnpm build        # Production build
pnpm lint         # ESLint
```

### Database

- PostgreSQL via Vercel Postgres (requires `DATABASE_URL` env var)
- Schema in [prisma/schema.prisma](../prisma/schema.prisma)
- `pnpm postinstall` runs `prisma generate` automatically

```bash
npx prisma migrate dev    # Create/apply migrations locally
npx prisma studio         # Visual database browser
```

## Data Model

Single table `ShortUrl` with fields: `id` (cuid), `slug` (unique), `original` (full URL), `visits` (counter), `createdAt`

## Planned Features (from TODO)

- Rate limiting for URL creation and redirects
- User accounts for managing URLs and analytics
- Local development environment separate from prod

## Conventions

- TailwindCSS for all styling (no CSS modules)
- TypeScript strict mode
- Path alias `@/` maps to project root
