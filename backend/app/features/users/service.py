from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.features.users.models import UserModel
from app.features.users.schemas import UserCreate, UserUpdate

class UserService:
    """Service layer containing business logic for User accounts."""

    @staticmethod
    async def get_by_id(db: AsyncSession, user_id: int) -> UserModel | None:
        result = await db.execute(select(UserModel).where(UserModel.id == user_id))
        return result.scalars().first()

    @staticmethod
    async def get_by_firebase_uid(db: AsyncSession, firebase_uid: str) -> UserModel | None:
        result = await db.execute(select(UserModel).where(UserModel.firebase_uid == firebase_uid))
        return result.scalars().first()

    @staticmethod
    async def get_by_email(db: AsyncSession, email: str) -> UserModel | None:
        result = await db.execute(select(UserModel).where(UserModel.email == email))
        return result.scalars().first()

    @staticmethod
    async def create_user(db: AsyncSession, firebase_uid: str, user_in: UserCreate) -> UserModel:
        db_user = UserModel(
            firebase_uid=firebase_uid,
            email=user_in.email,
            first_name=user_in.first_name,
            last_name=user_in.last_name,
            is_active=True,
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user

    @staticmethod
    async def update_user(db: AsyncSession, db_user: UserModel, user_in: UserUpdate) -> UserModel:
        update_data = user_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_user, key, value)
        await db.commit()
        await db.refresh(db_user)
        return db_user
