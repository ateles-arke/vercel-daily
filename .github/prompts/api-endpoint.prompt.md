---
name: api-endpoint
description: "Create a new API route handler with proper error handling, validation, and TypeScript types."
---

# Create an API Endpoint

You're about to generate a new API route handler.

## What do you want to create?

1. **Endpoint path** (e.g., `posts`, `users/[id]`, `auth/login`)
   - Will create `app/api/[path]/route.ts`
   - Use `/` for nesting: `posts/[id]` → `app/api/posts/[id]/route.ts`

2. **HTTP methods** (choose one or more)
   - **GET** — Retrieve data, supports `[dynamic]` params
   - **POST** — Create resource, accepts body
   - **PUT** — Update resource, accepts body + params
   - **DELETE** — Remove resource, accepts params
   - **PATCH** — Partial update

3. **Request type** (choose one)
   - **Query params only** — `?search=value&filter=active`
   - **URL params only** — `posts/[id]`, auth/[token]`
   - **JSON body only** — `{ title, content, ...}`
   - **Mixed** — Body + URL params + query
   - **Form data** — Multipart form submission

4. **Response type** (choose one)
   - **JSON** — Standard API response
   - **File download** — Return file/blob
   - **Redirect** — 3xx response
   - **Stream** — Server-Sent Events or streaming

5. **Features?** (optional, comma-separated)
   - `authentication` — Verify auth token/session
   - `validation` — Validate request body/params
   - `error-handling` — Proper error responses (400, 401, 404, 500)
   - `cors` — Cross-origin handling
   - `rate-limiting` — Prevent abuse
   - `logging` — Log requests for debugging

6. **Data source?** (choose one)
   - **Mock data** — Hardcoded sample responses
   - **Database** — Placeholder for `db.query()`
   - **External API** — Call another service
   - **File system** — Read/write files
   - **In-memory** — State stored in memory

---

## Example Inputs

**Example 1: Simple GET endpoint**
```
Path: posts
Methods: GET
Request: Query params only (search, limit)
Response: JSON
Features: validation, error-handling
Data: Database
```

**Example 2: Create resource with validation**
```
Path: posts
Methods: POST
Request: JSON body
Response: JSON
Features: validation, error-handling, authentication
Data: Database
```

**Example 3: Dynamic resource API**
```
Path: posts/[id]
Methods: GET, PUT, DELETE
Request: Mixed (params + body for PUT)
Response: JSON
Features: validation, error-handling, authentication, logging
Data: Database
```

**Example 4: File upload endpoint**
```
Path: upload
Methods: POST
Request: Form data
Response: JSON
Features: validation, error-handling, authentication
Data: File system
```

---

Once you provide these details, I'll generate:
✓ Named exports: `GET()`, `POST()`, `PUT()`, etc.
✓ `NextRequest` and `NextResponse` types
✓ Request validation & error handling
✓ Proper TypeScript types for params/body
✓ JSDoc comments for maintenance
✓ Security best practices (CORS, auth checks)
✓ Follows `app-routes.instructions.md` patterns
✓ Ready-to-call from frontend
