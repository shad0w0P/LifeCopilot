# Local Development Setup Guide

Follow this guide to configure and launch the LifeCopilot application locally.

---

## 1. Firebase Authentication Setup

To configure Firebase Authentication:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project named `LifeCopilot`.
3. Enable **Email/Password** authentication in **Build > Authentication > Sign-in method**.
4. Register a Web App under project settings and retrieve the client keys configuration object.
5. Create a Service Account for your project in **Project Settings > Service Accounts**. Click **Generate New Private Key** and download the credentials JSON file.

---

## 2. Database Migration with Alembic

We manage database schema shifts using Alembic. To initialize migrations:

1. Navigate to the `backend/` folder.
2. Initialize Alembic (already done in foundation, configuration resides in `alembic.ini` and `alembic/`):
   ```bash
   alembic init alembic
   ```
3. Set the database connection in your local environment (`DATABASE_URL`).
4. Generate the initial migration script:
   ```bash
   alembic revision --autogenerate -m "Initial schema setup"
   ```
5. Apply migrations to the database:
   ```bash
   alembic upgrade head
   ```

---

## 3. Project Styling System (Tailwind + Angular Material)

The frontend is styled using Tailwind CSS and Angular Material.
* **Angular Material** handles core complex UI widgets (e.g., dialogs, form controls, autocomplete, calendars).
* **Tailwind CSS** handles page structures, spacing, layouts, and responsive flexboxes.
* All components must follow consistent CSS naming structures. Ad-hoc, deep-nested inline CSS overrides should be avoided in favor of Tailwind utility classes.
