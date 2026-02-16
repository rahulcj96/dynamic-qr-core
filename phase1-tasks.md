# Phase 1: Task List (The Core Engine)

**Goal:** Build the MVP API for Dynamic QR Code generation and redirection.
**Status:** Planning

## 1. Repository Setup
- [ ] **Initialize NestJS Project:** Scaffold the project structure (`nest new`).
- [ ] **Configure Linter/Prettier:** Ensure consistent code style.
- [ ] **Setup Docker:** Create `docker-compose.yml` for PostgreSQL (and the app itself).
- [ ] **Setup Environment Variables:** Create `.env.example` and validation schema (`joi` or `class-validator`).

## 2. Database Layer
- [ ] **Install Prisma:** Add Prisma as a dev dependency.
- [ ] **Define Schema:** Write `schema.prisma` matching the Phase 1 Spec (`User`, `Redirect` tables).
- [ ] **Generate Client:** Run `prisma generate`.
- [ ] **Migration Script:** Create the initial migration (`prisma migrate dev`).

## 3. Module: Redirects (Public)
- [ ] **Create Module:** `nest g module redirects`.
- [ ] **DTOs:** Define `RedirectResponseDto`.
- [ ] **Service - Lookup:** Implement `findBySlug(slug)` using Prisma.
- [ ] **Service - Analytics:** Implement `incrementClicks(slug)` (async/fire-and-forget).
- [ ] **Controller:** Implement `GET /:slug` endpoint.
    - [ ] Logic: Lookup -> If found, Redirect (302) -> If not, 404.

## 4. Module: QR Generation (Protected/Internal)
- [ ] **Create Module:** `nest g module qr`.
- [ ] **DTOs:** Define `CreateQrDto` (url, slug?) and `QrResponseDto`.
- [ ] **Service - Slug Gen:** Implement `generateUniqueSlug()` (using `nanoid` or similar).
- [ ] **Service - QR Gen:** Implement `generateQrImage(url)` (using `qrcode` lib).
- [ ] **Service - Create:** Implement `createRedirect(url)` transaction (DB insert).
- [ ] **Controller:** Implement `POST /api/v1/qr` endpoint.

## 5. Testing
- [ ] **Unit Tests:** Test Slug Generation (collision handling).
- [ ] **E2E Tests:**
    - [ ] Create QR -> Verify 201.
    - [ ] Access Slug -> Verify 302 Redirect.
    - [ ] Access Invalid Slug -> Verify 404.

## 6. Documentation
- [ ] **Swagger/OpenAPI:** Add decorators (`@ApiProperty`, `@ApiOperation`) to controllers.
- [ ] **README:** Update with "How to Run".
