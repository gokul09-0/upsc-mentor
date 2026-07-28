from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()

@router.get("/summary")
async def get_progress_summary(current_user: dict = Depends(get_current_user)):
    return {
        "overall_accuracy": 78.5,
        "total_tests_taken": 14,
        "total_questions_answered": 180,
        "study_streak_days": 12,
        "subject_breakdown": [
            {"subject": "Indian Polity", "accuracy": 85.0, "status": "Strong"},
            {"subject": "Modern History", "accuracy": 72.0, "status": "Good"},
            {"subject": "Indian Economy", "accuracy": 68.0, "status": "Needs Improvement"},
            {"subject": "Geography & Environment", "accuracy": 81.0, "status": "Strong"},
            {"subject": "Current Affairs", "accuracy": 74.0, "status": "Good"}
        ],
        "weak_areas": [
            "Banking & Monetary Policy (Economy)",
            "Freedom Movement 1905-1919 (History)",
            "Local Self Government Articles (Polity)"
        ],
        "strong_areas": [
            "Fundamental Rights & Directive Principles",
            "Physical Geography & Climate Types",
            "Constitutional & Non-Constitutional Bodies"
        ],
        "recent_tests": [
            {
                "test_id": "test-101",
                "title": "Indian Polity Comprehensive Mock",
                "score": 8.68,
                "total": 10.0,
                "accuracy": 88.0,
                "date": "2025-02-27"
            },
            {
                "test_id": "test-102",
                "title": "Economic Survey & Union Budget Quiz",
                "score": 6.02,
                "total": 10.0,
                "accuracy": 65.0,
                "date": "2025-02-25"
            }
        ]
    }
