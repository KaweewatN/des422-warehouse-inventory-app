# Warehouse Inventory App

A full-stack warehouse inventory management application built with a React frontend and Node.js/Express backend, using Supabase as the database.

## Project Structure

```
des422-warehouse-inventory-app/
├── .github/                 # GitHub Actions workflows
├── .husky/                  # Git hooks
├── lerna.json               # Lerna monorepo configuration
├── package.json             # Root package configuration
├── packages/
│   ├── backend/             # Backend service (Node.js/Express)
│   │   ├── .env             # Backend environment variables
│   │   ├── controller/      # API controllers
│   │   ├── router/          # API routes
│   │   ├── utils/           # Utility functions
│   │   ├── main.js          # Backend entry point
│   │   └── package.json     # Backend package config
│   └── frontend/            # Frontend app (React)
│       ├── public/          # Static assets and HTML
│       ├── src/             # React source code
│       └── package.json     # Frontend package config
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/des422-warehouse-inventory-app.git
   cd des422-warehouse-inventory-app
   ```

2. **Install dependencies for all packages:**
   ```sh
   npm install
   ```

### Running the App

#### Backend
1. Copy `.env` to `packages/backend/.env` and fill in your Supabase credentials.
2. Start the backend server:
   ```sh
   cd packages/backend
   npm start
   ```

#### Frontend
1. Start the React app:
   ```sh
   cd packages/frontend
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables
The backend requires the following variables in `packages/backend/.env`:

- `SUPABASE_URL` – Your Supabase project URL
- `SUPABASE_ANON_KEY` – Supabase anon public key
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key
- `SUPABASE_JWT_SECRET` – Supabase JWT secret
- `PORT` – Backend server port (default: 3001)
- `DATABASE_URL` – PostgreSQL connection string

**Do not commit sensitive credentials to public repositories.**

## Scripts
From the root or within each package:

- `npm start` – Start the development server
- `npm test` – Run tests
- `npm run build` – Build for production

