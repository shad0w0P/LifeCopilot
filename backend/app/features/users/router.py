from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.features.auth.dependencies import CurrentUser
from app.features.users.schemas import UserCreate, UserResponse, UserUpdate
from app.features.users.service import UserService

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/me", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def sync_user_profile(
    current_user: CurrentUser,
    db: AsyncSession = Depends(get_db)
):
    """
    Sync authenticated Firebase user details to local database.
    If the user does not exist in PostgreSQL, initialize a new record.
    """
    db_user = await UserService.get_by_firebase_uid(db, current_user.uid)
    if not db_user:
        # Check if email already exists in DB under a different UID (security edgecase)
        if current_user.email:
            existing_email_user = await UserService.get_by_email(db, current_user.email)
            if existing_email_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email address already registered with another account."
                )
            
        # Extract first and last name from full name if present
        first_name = None
        last_name = None
        if current_user.name:
            names = current_user.name.split(" ", 1)
            first_name = names[0]
            last_name = names[1] if len(names) > 1 else None

        user_in = UserCreate(
            email=current_user.email or f"{current_user.uid}@placeholder.lifecopilot.dev",
            first_name=first_name,
            last_name=last_name
        )
        db_user = await UserService.create_user(db, current_user.uid, user_in)
    return db_user

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: CurrentUser,
    db: AsyncSession = Depends(get_db)
):
    """
    Get profile information of the currently authenticated user.
    """
    db_user = await UserService.get_by_firebase_uid(db, current_user.uid)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not initialized."
        )
    return db_user

@router.put("/me", response_model=UserResponse)
async def update_current_user_profile(
    user_in: UserUpdate,
    current_user: CurrentUser,
    db: AsyncSession = Depends(get_db)
):
    """
    Update profile details for the authenticated user.
    """
    db_user = await UserService.get_by_firebase_uid(db, current_user.uid)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found."
        )
    return await UserService.update_user(db, db_user, user_in)
