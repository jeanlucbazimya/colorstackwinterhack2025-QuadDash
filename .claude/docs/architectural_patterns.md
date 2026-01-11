# Architectural Patterns

## Dependency Injection Pattern

The FastAPI backend uses dependency injection extensively for managing resources and shared services.

**Database Sessions:**
- Database sessions are injected via `Depends(get_db)` in route handlers
- Generator pattern ensures proper cleanup (server/database.py:14-19)
- Example usage in auth routes (server/auth.py:43, 90, 120, 133)

**Service Dependencies:**
- EmailService injected via `Depends(get_email_service)` (server/auth.py:44)
- Returns singleton-like service instance (server/email_service.py:24-25)

**Authentication:**
- OAuth2 scheme for token extraction: `oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")` (server/auth.py:17)
- Token dependency injected in protected routes (server/auth.py:133)

## Schema-Model Separation

Clear separation between data transfer objects (DTOs) and database models.

**Pydantic Schemas (server/schemas.py):**
- Request validation: `RegisterRequest`, `LoginRequest`, `VerifyEmailRequest`
- Response models: `TokenResponse`, `UserOut`, `UniversitiesResponse`
- Use Field validators for constraints (server/schemas.py:11, 19)

**SQLAlchemy Models (server/models.py):**
- Database-specific concerns: relationships, indexes, constraints
- Enum types for role management (server/models.py:10-12)
- Bidirectional relationships with cascade operations (server/models.py:28, 41)

**Conversion:**
- Pydantic's `orm_mode = True` enables automatic ORM-to-schema conversion (server/schemas.py:42)

## JWT Authentication Flow

Token-based authentication with stateless sessions.

**Token Creation:**
- Generate JWT with subject (user ID) and expiration (server/security.py:20-24)
- Configurable expiration via settings (server/config.py:12)

**Token Validation:**
- Decode and extract subject from JWT (server/security.py:27-32)
- Returns None on invalid/expired tokens
- Protected routes validate token and fetch user (server/auth.py:133-140)

**Password Security:**
- Bcrypt hashing via passlib CryptContext (server/security.py:9)
- Hash passwords on registration (server/auth.py:55, 63)
- Verify on login (server/auth.py:122)

## Email Verification Flow

Multi-step registration with time-limited verification codes.

**Registration Process:**
1. Validate university email domain (server/auth.py:20-28)
2. Create or update user (unverified state) (server/auth.py:48-66)
3. Invalidate previous codes (server/auth.py:68-71)
4. Generate 6-digit code and hash it (server/auth.py:73-74)
5. Store code with 30-minute expiration (server/auth.py:75-82)
6. Send email with code (server/auth.py:84)

**Verification Process:**
1. Look up active, unexpired code (server/auth.py:95-104)
2. Verify code matches hash (server/auth.py:108-109)
3. Mark code consumed and user verified (server/auth.py:111-112)
4. Return JWT token (server/auth.py:115-116)

**Code Security:**
- Codes are hashed before storage (same as passwords)
- Time-limited expiration (server/models.py:43-45)
- Single-use via consumed flag (server/models.py:38)

## Configuration Management

Centralized settings with environment variable overrides.

**Settings Class (server/config.py:9-39):**
- Pydantic BaseSettings for type validation
- Default values for local development
- Environment variable support via `env_prefix = "APP_"` (server/config.py:35)
- Structured configuration (e.g., universities dict)

**Usage Pattern:**
- Import singleton: `from .config import settings`
- Access attributes: `settings.jwt_secret`, `settings.database_url`
- Override via environment: `APP_JWT_SECRET=xxx`

## Router Organization

FastAPI routers group related endpoints.

**Router Definition:**
- Create router with prefix and tags (server/auth.py:16)
- Define route handlers as functions
- Include router in main app (server/main.py:19)

**Benefits:**
- Logical grouping of endpoints
- Automatic OpenAPI documentation tags
- URL prefix management
- Modular application structure

## Database Patterns

**Engine Configuration:**
- Conditional connect_args for SQLite thread safety (server/database.py:8)
- SessionLocal factory with autocommit=False (server/database.py:10)

**Declarative Base:**
- Single Base for all models (server/database.py:11)
- Automatic table creation on startup (server/main.py:17)

**Relationship Patterns:**
- Bidirectional relationships with back_populates (server/models.py:28, 41)
- Cascade delete for dependent records (server/models.py:28, 35)
- Foreign keys with ondelete constraints (server/models.py:35)

## Error Handling

Consistent HTTPException usage for API errors.

**Pattern:**
- Raise HTTPException with appropriate status codes
- Include descriptive detail messages
- Examples: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found

**Common Cases:**
- Invalid credentials (server/auth.py:123)
- Email domain validation (server/auth.py:24, 27)
- Unverified email (server/auth.py:126)
- Invalid verification code (server/auth.py:109)
- Missing user (server/auth.py:93, 140)

## CORS Configuration

Permissive CORS setup for development.

**Configuration (server/main.py:9-15):**
- Allow all origins: `allow_origins=["*"]`
- Allow credentials
- Allow all methods and headers

**Note:** Restrict origins for production deployment.
