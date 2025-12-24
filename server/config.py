from pathlib import Path
from typing import Dict, List
from pydantic import BaseSettings


BASE_DIR = Path(__file__).resolve().parent


class Settings(BaseSettings):
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24  # 1 day by default

    database_url: str = f"sqlite:///{(BASE_DIR / 'data.db').as_posix()}"

    email_sender: str = "noreply@campusrides.local"
    email_outbox_path: Path = BASE_DIR / "outbox" / "emails.log"

    universities: Dict[str, Dict[str, List[str]]] = {
        "stateu": {
            "name": "State University",
            "domains": ["stateu.edu"],
        },
        "techu": {
            "name": "Tech University",
            "domains": ["techu.edu"],
        },
        "citycollege": {
            "name": "City College",
            "domains": ["citycollege.edu"],
        },
    }

    class Config:
        env_prefix = "APP_"
        case_sensitive = False


settings = Settings()