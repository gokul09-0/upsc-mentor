from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uuid
from app.core.security import get_current_user
from app.graph.workflow import run_upsc_graph

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    subject_filter: Optional[str] = None

class ChatResponse(BaseModel):
    session_id: str
    response: str
    agent_used: str
    sources: List[Dict[str, Any]]
    intent: str

@router.post("/query", response_model=ChatResponse)
async def process_chat_query(
    payload: ChatRequest = Body(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Main LangGraph Multi-Agent Router Endpoint.
    Routes incoming user prompt through Knowledge, Tutor, Test, or Research Agent.
    """
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Query message cannot be empty.")

    session_id = payload.session_id or str(uuid.uuid4())
    user_id = current_user.get("id", "guest")

    graph_result = run_upsc_graph(
        user_query=payload.message,
        session_id=session_id,
        user_id=user_id,
        subject_filter=payload.subject_filter
    )

    return ChatResponse(
        session_id=session_id,
        response=graph_result.get("final_response", "Unable to process query."),
        agent_used=graph_result.get("agent_used", "Router"),
        sources=graph_result.get("sources", []),
        intent=graph_result.get("intent", "concept")
    )
