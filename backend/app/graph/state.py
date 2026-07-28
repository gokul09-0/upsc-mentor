from typing import TypedDict, List, Dict, Any, Optional

class GraphState(TypedDict):
    """
    LangGraph State dictionary for UPSC AI Mentor orchestration.
    """
    user_query: str
    session_id: str
    user_id: str
    intent: Optional[str] # 'concept', 'mock_test', 'current_affairs'
    subject_filter: Optional[str]
    retrieved_docs: Optional[List[Dict[str, Any]]]
    test_data: Optional[Dict[str, Any]]
    final_response: Optional[str]
    sources: Optional[List[Dict[str, Any]]]
    agent_used: Optional[str]
