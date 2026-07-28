from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()

@router.get("/me")
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    return {
        "user": current_user,
        "profile": {
            "full_name": "UPSC Aspirant",
            "target_year": 2025,
            "optional_subject": "Political Science & International Relations",
            "study_streak": 7
        }
    }
