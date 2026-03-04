# Dynamic QR Core

MVP for dynamic QR code generation and redirection.

## Setup

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/rahulcj96/dynamic-qr-core.git
    cd dynamic-qr-core
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment:**
    ```bash
    cp .env.example .env
    ```
    Update `.env` with your DATABASE_URL if needed.

4.  **Start Database:**
    ```bash
    docker-compose up -d
    ```

5.  **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```

6.  **Run Migrations:**
    ```bash
    npx prisma db push
    ```

7.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## API Endpoints

### `POST /api/v1/qr`

Generate a new dynamic QR code.

**Request Body:**
```json
{
  "targetUrl": "https://example.com",
  "slug": "custom-slug" // Optional
}
```

**Response:**
```json
{
  "qrCodeDataUrl": "data:image/png;base64,...",
  "redirectUrl": "http://localhost:3000/custom-slug",
  "slug": "custom-slug"
}
```

### `GET /:slug`

Redirects to the target URL and increments click count.
