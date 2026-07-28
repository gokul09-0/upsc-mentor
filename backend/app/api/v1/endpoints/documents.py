from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from typing import List, Dict, Any
from app.core.security import get_current_user
from app.services.rag_service import rag_service

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    category: str = Form("General Studies"),
    current_user: dict = Depends(get_current_user)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    content = await file.read()
    if len(content) > 25 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 25MB limit.")

    result = await rag_service.ingest_pdf(
        file_bytes=content,
        filename=file.filename,
        category=category,
        user_id=current_user.get("id")
    )
    return result

@router.get("/list")
async def list_documents(current_user: dict = Depends(get_current_user)):
    return {
        "documents": [
            {
                "id": "doc-1",
                "title": "Indian Polity 6th Edition - M. Laxmikanth",
                "category": "Polity",
                "file_size": 14200000,
                "is_global": True,
                "created_at": "2025-01-10T10:00:00Z"
            },
            {
                "id": "doc-2",
                "title": "Modern History - Spectrum (2024 Edition)",
                "category": "History",
                "file_size": 18500000,
                "is_global": True,
                "created_at": "2025-01-12T10:00:00Z"
            },
            {
                "id": "doc-3",
                "title": "Economic Survey 2024-25 Key Highlights",
                "category": "Economy",
                "file_size": 8900000,
                "is_global": True,
                "created_at": "2025-02-01T10:00:00Z"
            },
            {
                "id": "doc-4",
                "title": "UPSC Prelims 10 Years Solved PYQs (2015-2024)",
                "category": "PYQs",
                "file_size": 22100000,
                "is_global": True,
                "created_at": "2025-02-15T10:00:00Z"
            }
        ]
    }
