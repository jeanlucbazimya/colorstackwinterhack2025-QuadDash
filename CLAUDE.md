# QuadDash - Campus Ride Sharing Platform

## What

QuadDash is a web-based campus ride connector built for a hackathon, targeting rural HBCUs where Uber/Lyft are unreliable or unavailable.

It enables verified students from the same university to connect for rides within their campus community.
This is not a commercial rideshare app — it prioritizes trust, access, and human decision-making, aligned with Responsible AI principles.

**Core Product Principles (DO NOT VIOLATE)**
Campus-only access (same university only);
.edu email required;
Human-in-the-loop decisions (no auto-matching);
Demo readiness > feature completeness;
Simplicity > scale;

**Architecture:** FastAPI backend + React frontend

## Tech Stack

### Backend (FastAPI)

FastAPI 0.115.5, SQLAlchemy 2.0.23 (SQLite), JWT auth (python-jose), Passlib/bcrypt, Pydantic, Uvicorn 0.30.1

### Frontend

React 19.2.0, Vite 7.2.4, TailwindCSS 3.4.19, React Compiler, ESLint 9.39.1

## Key Directories

### `/server/` - FastAPI Backend

- `main.py` - App entry point, CORS, router registration
- `auth.py` - AAuth endpoints (register, login, me)
- `models.py` - SQLAlchemy models (User, RideRequest, RideOffer)
- `schemas.py` - Pydantic request/response schemas
- `database.py` - Database engine and session
- `security.py` - Password hashing and JWT utilities
- `config.py` - Environment-based configuration

### `/client/` - React Frontend

- `src/App.jsx` - Root component (client/src/App.jsx:1-3)
- `src/main.jsx` - Entry point
- `vite.config.js`, `tailwind.config.js`, `eslint.config.js` - Build/style/lint config
- `package.json` - Dependencies and npm scripts (client/package.json:6-10)

### `/venv/` - Python virtual environment (do not modify)

## Essential Commands

### FastAPI Backend

```bash
pip install -r server/requirements.txt
uvicorn server.main:app --reload  # http://localhost:8000/docs
```

**Environment Variables** (APP\_ prefix, see server/config.py:35-36):

- `APP_JWT_SECRET`, `APP_ACCESS_TOKEN_EXPIRE_MINUTES`, `APP_DATABASE_URL`
- `APP_EMAIL_SENDER`, `APP_EMAIL_OUTBOX_PATH`

### React Frontend

```bash
cd client
npm install
npm run dev    # Development server
npm run build  # Production build
npm run lint   # ESLint
```

## API Endpoints (server/auth.py:16)

- `GET /auth/universities` - List supported universities
- `POST /auth/register` - Register with school email
- `POST /auth/verify-email` - Submit 6-digit code
- `POST /auth/login` - Get JWT token
- `GET /auth/me` - User profile (requires Bearer token)

## Authentication Flow

**Registration:** Email domain validation → generate/hash 6-digit code → store with 30-min expiry → log to outbox (server/auth.py:20-84, server/email_service.py:12-21)

**Verification:** Validate code → mark user verified → return JWT (server/auth.py:89-116)

**Login:** Verify credentials + email verified → return JWT (server/auth.py:119-129)

**Protected Routes:** Extract Bearer token → decode JWT → fetch user (server/auth.py:133-140)

## Adding New Features or Bug Fix

**Important**: When you work on a new feature or bug, create a git branch first. Then work on changes in that branch for the remainder of the session

## Additional Documentation

- `.claude/docs/architectural_patterns.md` - Dependency injection, schema-model separation, JWT patterns, email verification flow, configuration management, router organization, error handling

## Current State & Security Notes

**Implementation:**

- FastAPI backend: Complete auth flow
- Django: Minimal implementation (testing only)
- React: Basic setup, minimal components
- Email: Logs to file (replace with SMTP for production)

**Security Issues (Development Only):**

- Insecure JWT secret (server/config.py:10) - set `APP_JWT_SECRET` in production
- CORS allows all origins (server/main.py:11) - restrict for production
- Django DEBUG=True, exposed SECRET_KEY (testing/quadDash/settings.py:23,26)
- SQLite databases (switch to PostgreSQL/MySQL via `APP_DATABASE_URL` for production)
