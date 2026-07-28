from fastapi import APIRouter
from app.api.v1.endpoints import auth, chat, documents, mock_tests, progress

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(mock_tests.router, prefix="/mock-tests", tags=["mock-tests"])
api_router.include_router(progress.router, prefix="/progress", tags=["progress"])
