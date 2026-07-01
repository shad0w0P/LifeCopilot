from typing import Annotated
from fastapi import Depends
from app.core.security import FirebaseUser, verify_firebase_token

# Annotated dependency for injecting the current authenticated user inside routes
CurrentUser = Annotated[FirebaseUser, Depends(verify_firebase_token)]
