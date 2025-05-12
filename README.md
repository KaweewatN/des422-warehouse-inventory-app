# Warehouse Inventory App

## Group member
- Kaweewat Noisuwan ID: 6522781259
- Nipun Kharuehapaisarn ID: 6522771896
- Nawasawan Yenrompho ID: 6522780863
- Phonchana Matta ID: 6522770419

## Course 
DES422 Business Application Development

## Introduction
Welcome to the Warehouse Inventory App! This application is designed to provide an efficient and user-friendly solution for managing warehouse inventory. It allows users to track stock withdrawals, manage items, and streamline overall warehouse operations.

#### Technology Stack
The application is built using a modern and robust technology stack to ensure scalability, performance, and a great user experience.

#### Frontend: 
React.js: A JavaScript library for building dynamic and responsive user interfaces.
Redux: Used for efficient application state management.
Chakra UI: A component library for creating polished and accessible user interfaces.

#### Backend:
- Node.js: A JavaScript runtime environment for building the server-side logic.
- Express.js: A web application framework for Node.js, used for managing API endpoints.
- JWT (JSON Web Tokens): Implemented for secure authentication and authorization for API usage.

#### Database:
- Supabase: An open-source Firebase alternative providing a scalable real-time database solution, along with authentication, storage, and other backend services.

#### Development Workflow:
- Monorepo Architecture: The frontend and backend codebases are managed within a single repository. This approach enhances code sharing, simplifies dependency management, and promotes consistency across the project.

#### Deployment:
- GitHub: Used for version control and collaboration.
- Vercel: The frontend and backend are deployed as separate packages to Vercel, offering flexibility, independent scaling of services, and continuous deployment.


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

