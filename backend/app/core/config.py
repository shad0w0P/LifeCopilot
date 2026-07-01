import os
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "LifeCopilot Backend"
    ENV: str = "development"
    DEBUG: bool = True
    API_PREFIX: str = "/api/v1"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/lifecopilot"
    FIREBASE_CREDENTIALS_PATH: str = ""
    ALLOWED_ORIGINS: Union[str, List[str]] = "http://localhost:4200,http://127.0.0.1:4200"

    @field_validator("ALLOWED_ORIGINS")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    model_config = SettingsConfigDict(
        # Try loading .env first, then environment-specific config, then fallback
        env_file=(".env", f".env.{os.getenv('ENV', 'development')}"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()
