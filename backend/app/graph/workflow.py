import logging
from langgraph.graph import StateGraph, END
from app.graph.state import GraphState
from app.graph.router import intent_router
from app.agents.knowledge_agent import knowledge_agent
from app.agents.tutor_agent import tutor_agent
from app.agents.test_agent import test_agent
from app.agents.research_agent import research_agent

logger = logging.getLogger("workflow")

# 1. Node: Router Node
def router_node(state: GraphState) -> GraphState:
    query = state["user_query"]
    intent = intent_router.classify_intent(query)
    state["intent"] = intent
    return state

# 2. Node: Knowledge Agent Node
def knowledge_agent_node(state: GraphState) -> GraphState:
    query = state["user_query"]
    category = state.get("subject_filter")
    retrieved_chunks = knowledge_agent.retrieve_context(query=query, category=category)
    state["retrieved_docs"] = retrieved_chunks
    state["agent_used"] = "Knowledge Agent"
    return state

# 3. Node: Tutor Agent Node
def tutor_agent_node(state: GraphState) -> GraphState:
    query = state["user_query"]
    chunks = state.get("retrieved_docs", [])
    result = tutor_agent.explain_concept(query=query, context_chunks=chunks)
    state["final_response"] = result["answer"]
    state["sources"] = result["sources"]
    state["agent_used"] = "Tutor Agent"
    return state

# 4. Node: Test Agent Node
def test_agent_node(state: GraphState) -> GraphState:
    query = state["user_query"]
    test_data = test_agent.generate_mock_test(
        subject=state.get("subject_filter") or "General Studies",
        difficulty="upsc_level",
        count=5
    )
    
    # Format markdown explanation of test
    test_title = test_data.get("title", "UPSC Mock Test")
    questions = test_data.get("questions", [])
    
    response_md = f"### 📝 {test_title}\n\nI have generated a practice quiz for you with {len(questions)} high-yield UPSC Prelims questions.\n\n"
    for idx, q in enumerate(questions, 1):
        response_md += f"**Q{idx}. {q['question']}**\n"
        for opt in q['options']:
            response_md += f"- {opt}\n"
        response_md += "\n"

    response_md += "👉 *Head over to the **Mock Test** tab to complete this test interactively with timer and evaluation!*"

    state["final_response"] = response_md
    state["test_data"] = test_data
    state["sources"] = [{"title": "UPSC Mock Test Engine", "url": "/mock-test"}]
    state["agent_used"] = "Test Agent"
    return state

# 5. Node: Research Agent Node
def research_agent_node(state: GraphState) -> GraphState:
    query = state["user_query"]
    result = research_agent.search_and_summarize(query=query)
    state["final_response"] = result["answer"]
    state["sources"] = result["sources"]
    state["agent_used"] = "Research Agent"
    return state

# Intent routing condition for StateGraph
def route_intent(state: GraphState) -> str:
    intent = state.get("intent")
    if intent == "mock_test":
        return "test_agent_node"
    elif intent == "current_affairs":
        return "research_agent_node"
    else:
        return "knowledge_agent_node"

# Construct LangGraph StateGraph
builder = StateGraph(GraphState)

builder.add_node("router_node", router_node)
builder.add_node("knowledge_agent_node", knowledge_agent_node)
builder.add_node("tutor_agent_node", tutor_agent_node)
builder.add_node("test_agent_node", test_agent_node)
builder.add_node("research_agent_node", research_agent_node)

builder.set_entry_point("router_node")

builder.add_conditional_edges(
    "router_node",
    route_intent,
    {
        "knowledge_agent_node": "knowledge_agent_node",
        "test_agent_node": "test_agent_node",
        "research_agent_node": "research_agent_node"
    }
)

# Route Knowledge Agent output directly to Tutor Agent
builder.add_edge("knowledge_agent_node", "tutor_agent_node")

builder.add_edge("tutor_agent_node", END)
builder.add_edge("test_agent_node", END)
builder.add_edge("research_agent_node", END)

upsc_graph = builder.compile()

def run_upsc_graph(user_query: str, session_id: str = "default", user_id: str = "default", subject_filter: str = None) -> GraphState:
    initial_state: GraphState = {
        "user_query": user_query,
        "session_id": session_id,
        "user_id": user_id,
        "intent": None,
        "subject_filter": subject_filter,
        "retrieved_docs": None,
        "test_data": None,
        "final_response": None,
        "sources": None,
        "agent_used": None
    }
    
    logger.info(f"[LangGraph Workflow] Executing graph for query: '{user_query}'")
    final_output = upsc_graph.invoke(initial_state)
    return final_output
