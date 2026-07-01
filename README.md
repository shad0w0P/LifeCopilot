# LifeCopilot Monorepo

Welcome to **LifeCopilot**, a production-ready personal life assistant application. This repository is structured as a scalable monorepo hosting both frontend and backend projects, configurations, and documentation.

## Project Structure

* **`frontend/`**: Angular SPA built with Standalone Components, Angular Signals, Tailwind CSS, and Angular Material.
* **`backend/`**: FastAPI backend with an asynchronous SQLAlchemy PostgreSQL integration and Firebase Authentication.
* **`database/`**: SQL initialization scripts and Docker Compose templates for running local PostgreSQL services.
* **`design/`**: UI design guidelines, styling guides, and brand definitions.
* **`docs/`**: Technical architecture documents and project setup guides.
* **`.github/`**: CI/CD pipelines configured via GitHub Actions.

---

## Getting Started

### Prerequisites

* **Node.js**: v22.x or higher
* **npm**: v10.x or higher
* **Python**: v3.11 or higher
* **PostgreSQL** or **Docker** (to run the database container)

### Step 1: Run Local PostgreSQL Database

If you have Docker installed, navigate to the `database` folder and run:
```bash
docker-compose up -d
```
Otherwise, set up a local PostgreSQL database using the schema defined in [init.sql](file:///c:/Users/atulr/My%20Projects/LifeCopilot/database/init.sql).

### Step 2: Run Backend (FastAPI)

1. Navigate to the `backend/` folder.
2. Create a virtual environment:
   ```bash
   py -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   Copy `.env.example` to `.env.development` (and `.env` if desired) and fill in the values (database URLs, Firebase settings).
5. Start the backend development server:
   ```bash
   uvicorn app.main:app --reload
   ```
6. Access the interactive API docs at `http://localhost:8000/docs`.

### Step 3: Run Frontend (Angular)

1. Navigate to the `frontend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your Firebase client keys in [environment.development.ts](file:///c:/Users/atulr/My%20Projects/LifeCopilot/frontend/src/environments/environment.development.ts).
4. Run the development server:
   ```bash
   npm run start
   ```
5. Navigate to `http://localhost:4200` in your browser.

---

## Architectural Guidelines

* **Feature-First Architecture**: Group code by business domains (e.g., `auth`, `users`, `profile`) rather than technical layers.
* **Clean & SOLID Principles**: Follow clean interfaces, explicit dependency injection, and separation of concerns.
* **No AI/Document Upload/Finance**: These components are reserved for future phases. Phase 1 focuses solely on project foundations and accounts.