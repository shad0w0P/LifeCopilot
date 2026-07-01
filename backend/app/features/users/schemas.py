from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict

class UserBase(BaseModel):
    email: EmailStr
    first_name: str | None = None
    last_name: str | None = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    is_active: bool | None = None

class UserResponse(UserBase):
    id: int
    firebase_uid: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    # Pydantic v2 configuration style replacing class Config
    model_config = ConfigDict(from_attributes=True)
