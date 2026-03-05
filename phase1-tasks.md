# Phase 1: Task List (The Core Engine)

**Goal:** Build the MVP API for Dynamic QR Code generation and redirection using Fastify.
**Status:** In Progress (Refactoring)

## 1. Core Setup (Completed)
- [x] **Initialize Project:** Fastify + TypeScript setup.
- [x] **Database:** PostgreSQL via Docker Compose.
- [x] **ORM:** Prisma configured and schema defined.
- [x] **Basic Validation:** TypeBox integration.

## 2. Refactoring (Current Focus)
- [ ] **Modular Structure:** Split `index.ts` into modules.
    - [ ] `src/config/`: Environment configuration.
    - [ ] `src/modules/qr/`: Routes and Service for QR generation.
    - [ ] `src/modules/redirect/`: Routes and Service for redirection.
    - [ ] `src/app.ts`: App factory/setup.
    - [ ] `src/index.ts`: Entry point.
- [ ] **Error Handling:** Add a global error handler.
- [ ] **Slug Collision:** Handle unique constraint violations gracefully (retry logic).

## 3. Features (MVP)
- [x] **QR Generation:** `POST /api/v1/qr`
- [x] **Redirection:** `GET /:slug`
- [x] **Analytics:** Basic click counting.

## 4. Testing
- [ ] **Unit Tests:** Test services in isolation.
- [ ] **Integration Tests:** Test API endpoints using `fastify.inject()`.

## 5. Documentation
- [x] **README:** Basic setup instructions.
- [ ] **API Docs:** Swagger/OpenAPI (Fastify Swagger).
