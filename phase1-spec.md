# Phase 1: The Core Engine (MVP API Specification)

**Project:** `dynamic-qr-core`
**Version:** 0.1 (Phase 1)
**Status:** Draft

## 1. Overview

Phase 1 focuses on the core functionality of the URL shortening and QR generation service. This API will be public-facing for redirects (`/:slug`) and private for QR creation (`/api/v1/qr`).

## 2. API Endpoints

### 2.1 Public Redirect

**GET /:slug**

*   **Description:** Redirects the user to the target URL associated with the slug.
*   **Parameters:**
    *   `slug` (string, required): The unique short identifier (e.g., `abc123`).
*   **Response:**
    *   **200 (Found):** HTTP 302 Redirect to `target_url`.
    *   **404 (Not Found):** Returns a simple HTML error page or redirects to homepage.
    *   **500 (Server Error):** Returns a generic error page.

### 2.2 QR Creation (Protected)

**POST /api/v1/qr**

*   **Description:** Creates a new Dynamic QR Code.
*   **Authentication:** Not required for Phase 1 MVP (Open API for testing core logic).
*   **Request Body:**
    ```json
    {
      "target_url": "https://example.com/my-awesome-link",
      "slug": "custom-slug-optional" // Optional custom slug request
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "id": "uuid-1234-5678",
      "slug": "abc123",
      "target_url": "https://example.com/my-awesome-link",
      "qr_image_url": "https://api.ourservice.com/qr/abc123.png",
      "redirect_url": "https://ourservice.com/abc123"
    }
    ```
*   **Error Responses:**
    *   **400 (Bad Request):** Invalid URL format.
    *   **409 (Conflict):** Slug already exists.

### 2.3 QR Metadata (Protected)

**GET /api/v1/qr/:slug**

*   **Description:** Retrieve details about a specific QR code.
*   **Parameters:**
    *   `slug` (string, required).
*   **Response (200 OK):**
    ```json
    {
      "id": "uuid-1234-5678",
      "slug": "abc123",
      "target_url": "https://example.com/my-awesome-link",
      "clicks": 42,
      "created_at": "2026-02-15T12:00:00Z"
    }
    ```

### 2.4 Update Target (Protected)

**PATCH /api/v1/qr/:slug**

*   **Description:** Update the destination URL for a dynamic QR code.
*   **Request Body:**
    ```json
    {
      "target_url": "https://example.com/new-destination"
    }
    ```
*   **Response (200 OK):** Updated QR object.

## 3. Database Schema (PostgreSQL)

### Table: `redirects`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique ID for internal use. |
| `slug` | VARCHAR(16) | UNIQUE, NOT NULL | Short code (e.g., `abc123`). Indexed for fast lookup. |
| `target_url` | TEXT | NOT NULL | The destination URL. |
| `clicks` | BIGINT | DEFAULT 0 | Simple counter for analytics (MVP). |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp. |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp. |

## 4. Technical Implementation Notes

*   **Framework:** Node.js (Fastify or NestJS).
*   **Database:** PostgreSQL (using `pg` driver or Prisma ORM).
*   **QR Generation:** `qrcode` npm package (generates PNG buffer on the fly).
*   **Slug Generation:** `nanoid` or custom alphanumeric generator (collisions checked against DB).
*   **Redirect Logic:** Must be highly performant (minimal latency). Use Redis caching in future phases if needed.

## 5. Testing Strategy (Phase 1)

1.  **Unit Tests:** Verify slug generation logic (uniqueness, length).
2.  **Integration Tests:**
    *   Create a QR -> Verify DB entry.
    *   Request `/:slug` -> Verify 302 Redirect to correct URL.
    *   Update Target -> Request `/:slug` -> Verify new destination.
