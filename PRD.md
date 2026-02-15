# Product Requirement Document (PRD): Dynamic QR Code Generator

**Version:** 0.3 (Phased)
**Status:** In Progress
**Project Code:** `dynamic-qr-core`

## 1. Overview

A web-based SaaS service allowing users to generate both **Static** and **Dynamic QR Codes**. The core value proposition is a **One-Time Purchase** model that unlocks advanced features (dynamic editing, analytics, custom designs) with a limit of 5 dynamic codes per account.

### 1.1 Goals
*   **Simplicity:** No subscriptions. Pay once, use forever.
*   **Flexibility:** Enable users to update target URLs post-creation.
*   **Tracking:** Provide analytics on scan counts.
*   **Design:** Offer custom QR styling (colors, logos).

## 2. Core Features

### 2.1 The Redirect Engine
*   **Short Link System:** Unique, short alphanumeric slugs (e.g., `abc123`).
*   **Redirect Logic:** Request to `/:slug` -> Lookup target -> HTTP 302 Redirect.
*   **Fallback:** 404 Page or Homepage.

### 2.2 QR Code Generation
*   **Static QR:** Direct URL -> QR. Downloadable PNG/SVG.
*   **Dynamic QR (Paid):** Slug URL -> QR. Editable Target.

### 2.3 Management (Paid Users)
*   **Dashboard:** List/Edit QRs.
*   **Analytics:** Total scan counts.
*   **Limit:** Max 5 Dynamic QRs per account.

## 3. Technical Architecture

### 3.1 Tech Stack
*   **Backend:** Node.js (Fastify or NestJS)
*   **Database:** PostgreSQL
*   **Frontend:** Next.js (React)
*   **QR Library:** `qrcode` (Node)

### 3.2 Database Schema (Draft)
```sql
Table: users
- id (PK)
- email (Unique)
- password_hash
- is_paid (Boolean, Default False)
- created_at

Table: redirects
- id (PK)
- user_id (FK -> users.id)
- slug (Unique Index)
- target_url (Text)
- created_at
- updated_at
- clicks (Integer, Default 0)
```

## 4. Execution Plan (4 Phases)

### Phase 1: The Core Engine (MVP API)
*   **Goal:** Build the fundamental "URL Shortener & QR Generator" logic.
*   **Deliverables:**
    *   API: `POST /api/v1/qr` (Create dynamic QR -> returns slug/image).
    *   API: `GET /:slug` (Public redirect endpoint).
    *   Database schema setup (Users, QRs).
    *   Unit tests for redirect logic.

### Phase 2: User Accounts & Auth
*   **Goal:** Secure the platform and enable user data ownership.
*   **Deliverables:**
    *   API: `POST /api/v1/auth/signup` & `login`.
    *   API: `GET /api/v1/qr` (List user's codes).
    *   Middleware: Protect routes, enforce "Max 5 QRs" limit.
    *   Database migration for Users table.

### Phase 3: The Frontend Dashboard (Next.js)
*   **Goal:** User Interface for managing QRs.
*   **Deliverables:**
    *   **Landing Page:** Value prop, "Create Static QR" demo.
    *   **Dashboard:** Login/Register forms.
    *   **QR Manager:** List view, "Create New" modal, "Edit Target" form.
    *   **Customization UI:** Color picker, logo uploader for QR design.
    *   **Analytics View:** Simple chart/counter for scans.

### Phase 4: Payments & Launch
*   **Goal:** Monetization.
*   **Deliverables:**
    *   **Payment Gateway Integration:** (Stripe/LemonSqueezy).
    *   **"Upgrade" Flow:** Payment page -> Webhook handler -> Update `is_paid` flag.
    *   **Launch Prep:** Domain setup, SSL, final testing.

## 5. Monetization Strategy

*   **Model:** One-Time Purchase (Lifetime Access).
*   **Price:** TBD (e.g., $9-$19).
*   **Benefits:**
    *   5 Dynamic QRs.
    *   Edit Destinations.
    *   Basic Analytics.
    *   Custom Design options.
