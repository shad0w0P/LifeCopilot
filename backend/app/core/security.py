import logging
from typing import Optional
import firebase_admin
from firebase_admin import auth, credentials
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.core.config import settings

logger = logging.getLogger(__name__)

# Initialize Firebase Admin SDK
try:
    if settings.FIREBASE_CREDENTIALS_PATH:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
        firebase_admin.initialize_app(cred)
    else:
        # Falls back to default credentials or mock
        firebase_admin.initialize_app()
except Exception as e:
    logger.warning(
        f"Firebase Admin SDK initialization skipped/failed: {e}. "
        "A credentials file must be set in FIREBASE_CREDENTIALS_PATH for production."
    )

security_scheme = HTTPBearer(auto_error=False)

class FirebaseUser:
    """Represents the authenticated user payload from Firebase."""
    def __init__(self, uid: str, email: Optional[str], name: Optional[str], verified: bool):
        self.uid = uid
        self.email = email
        self.name = name
        self.verified = verified

async def verify_firebase_token(
    credentials: Optional[HTTPAuthorizationCredentials] = Security(security_scheme)
) -> FirebaseUser:
    """
    FastAPI dependency to extract and verify the Firebase ID Token from
    the HTTP Bearer Authorization header.
    """
    if not credentials:
        raise HTTPException(
            status_code=401, 
            detail="Missing Authorization header. Use Bearer token."
        )
        
    token = credentials.credentials
    try:
        # Verify the ID token signature, audience, and expiration
        decoded_token = auth.verify_id_token(token)
        return FirebaseUser(
            uid=decoded_token.get("uid"),
            email=decoded_token.get("email"),
            name=decoded_token.get("name"),
            verified=decoded_token.get("email_verified", False),
        )
    except Exception as e:
        # Development fallback bypass (useful for testing frontend / backend integrations before Firebase credentials are configured)
        if settings.ENV == "development" and token == "dev_token_bypass":
            return FirebaseUser(
                uid="dev-user-uid-999",
                email="developer@lifecopilot.dev",
                name="Local Dev Admin",
                verified=True
            )
            
        logger.error(f"Firebase token verification failed: {e}")
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired authentication credentials."
        )
