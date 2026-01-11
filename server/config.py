from pathlib import Path
from typing import Any, Dict
from pydantic import BaseSettings


BASE_DIR = Path(__file__).resolve().parent


class Settings(BaseSettings):
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24  # 1 day by default

    database_url: str = f"sqlite:///{(BASE_DIR / 'data.db').as_posix()}"

    email_sender: str = "noreply@campusrides.local"
    email_outbox_path: Path = BASE_DIR / "outbox" / "emails.log"

    universities: Dict[str, Dict[str, Any]] = {
        "grambling": {
            "name": "Grambling State University",
            "domains": ["gram.edu"],
        },
        "howard": {
            "name": "Howard University",
            "domains": ["howard.edu"],
        },
        "spelman": {
            "name": "Spelman College",
            "domains": ["spelman.edu"],
        },
        "morehouse": {
            "name": "Morehouse College",
            "domains": ["morehouse.edu"],
        },
        "famu": {
            "name": "Florida A&M University",
            "domains": ["famu.edu"],
        },
        "hampton": {
            "name": "Hampton University",
            "domains": ["hamptonu.edu"],
        },
    }

    class Config:
        env_prefix = "APP_"
        case_sensitive = False


settings = Settings()