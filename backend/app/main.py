from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.features.health.router import router as health_router
from app.features.users.router import router as users_router

app = FastAPI(
    title=settings.APP_NAME,
    description="FastAPI Backend for LifeCopilot Personal Life Assistant.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router registrations
app.include_router(health_router, prefix=settings.API_PREFIX)
app.include_router(users_router, prefix=settings.API_PREFIX)

@app.get("/")
async def root_endpoint():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "docs": "/docs",
        "status": "active"
    }
