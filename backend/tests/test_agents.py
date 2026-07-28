import pytest
from app.graph.router import intent_router
from app.graph.workflow import run_upsc_graph

def test_intent_router_classification():
    assert intent_router.classify_intent("Explain Article 200 of Indian Constitution") == "concept"
    assert intent_router.classify_intent("Generate 5 MCQs on Monetary Policy") == "mock_test"
    assert intent_router.classify_intent("What is the latest PIB update on Union Budget 2025?") == "current_affairs"

def test_langgraph_workflow_concept():
    result = run_upsc_graph(user_query="Explain the role of Governor in state legislature")
    assert result["intent"] == "concept"
    assert result["agent_used"] in ["Tutor Agent", "Knowledge Agent"]
    assert "Governor" in result["final_response"]

def test_langgraph_workflow_mock_test():
    result = run_upsc_graph(user_query="Generate a practice test quiz on Indian Polity")
    assert result["intent"] == "mock_test"
    assert result["agent_used"] == "Test Agent"
    assert result["test_data"] is not None

def test_langgraph_workflow_current_affairs():
    result = run_upsc_graph(user_query="Latest PIB news on Green Hydrogen Mission")
    assert result["intent"] == "current_affairs"
    assert result["agent_used"] == "Research Agent"
    assert len(result["sources"]) > 0
