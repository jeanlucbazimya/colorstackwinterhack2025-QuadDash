from datetime import datetime
from pathlib import Path

from .config import settings


class EmailService:
    def __init__(self, outbox_path: Path = settings.email_outbox_path):
        self.outbox_path = outbox_path
        self.outbox_path.parent.mkdir(parents=True, exist_ok=True)

    def send_verification_email(self, recipient: str, code: str, university_name: str) -> None:
        timestamp = datetime.utcnow().isoformat()
        content = (
            f"[{timestamp}] To: {recipient}\n"
            f"From: {settings.email_sender}\n"
            f"Subject: Verify your {university_name} ride account\n"
            f"Body: Your verification code is {code}. It expires in 30 minutes.\n\n"
        )
        with self.outbox_path.open("a", encoding="utf-8") as f:
            f.write(content)


def get_email_service() -> EmailService:
    return EmailService()