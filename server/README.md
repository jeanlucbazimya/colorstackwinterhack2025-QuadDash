# Campus Ride Backend (MVP)

FastAPI backend for a campus ride-sharing MVP. Supports driver and rider roles, university-scoped registration, email verification codes, and JWT login.

## Run locally

1. Create a virtual environment (recommended) and install deps:
   ```bash
   pip install -r server/requirements.txt
   ```
2. Start the API:
   ```bash
   uvicorn server.main:app --reload
   ```
3. Open docs at http://localhost:8000/docs.

## Configuration

Environment variables (optional, prefix `APP_`):

- `APP_JWT_SECRET`: override default JWT secret.
- `APP_ACCESS_TOKEN_EXPIRE_MINUTES`: token lifetime in minutes.
- `APP_DATABASE_URL`: defaults to a local SQLite file under `server/data.db`.
- `APP_EMAIL_SENDER`: sender shown in email logs.
- `APP_EMAIL_OUTBOX_PATH`: where verification email logs are written.

Universities and accepted domains live in `settings.universities` inside [config.py](config.py). Add or adjust entries as needed.

## Flow

- `POST /auth/register` — supply email, password, full name, role (`driver` or `rider`), and `university_key`. Only approved school domains are accepted. A 6-digit code is generated and logged to `server/outbox/emails.log`.
- `POST /auth/verify-email` — send email + code to mark the account verified and receive a JWT.
- `POST /auth/login` — verified users get a JWT.
- `GET /auth/universities` — list supported schools and domains.
- `GET /auth/me` — basic profile lookup using the `Authorization: Bearer <token>` header.

The email service writes verification messages to `server/outbox/emails.log` so you can read codes during local development. Replace the implementation in `email_service.py` with a real SMTP provider when ready.
