from fastapi import APIRouter, Depends, Body, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.core.security import get_current_user
from app.agents.test_agent import test_agent

router = APIRouter()

class GenerateTestRequest(BaseModel):
    subject: str = "Indian Polity"
    difficulty: str = "medium"
    count: int = 5

class EvaluateTestRequest(BaseModel):
    questions: List[Dict[str, Any]]
    user_answers: Dict[str, str]

@router.post("/generate")
async def generate_mock_test(
    payload: GenerateTestRequest = Body(...),
    current_user: dict = Depends(get_current_user)
):
    test_data = test_agent.generate_mock_test(
        subject=payload.subject,
        difficulty=payload.difficulty,
        count=payload.count
    )
    return test_data

@router.post("/evaluate")
async def evaluate_test(
    payload: EvaluateTestRequest = Body(...),
    current_user: dict = Depends(get_current_user)
):
    evaluation = test_agent.evaluate_test(
        questions=payload.questions,
        user_answers=payload.user_answers
    )
    return evaluation
