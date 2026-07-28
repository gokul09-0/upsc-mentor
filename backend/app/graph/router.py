import logging
from langchain_openai import ChatOpenAI
from app.core.config import settings

logger = logging.getLogger("graph_router")

class IntentRouter:
    """
    Router Logic for LangGraph Workflow:
    1. Conceptual/study material -> route to 'knowledge_agent' -> 'tutor_agent' -> END
    2. Mock test or MCQs -> route to 'test_agent' -> END
    3. Recent info or current affairs -> route to 'research_agent' -> END
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model=settings.PRIMARY_MODEL,
            temperature=0.0
        )

    def classify_intent(self, query: str) -> str:
        q_lower = query.lower()
        
        # Rule-based fast paths
        if any(w in q_lower for w in ["test", "quiz", "mcq", "mock", "practice question", "question bank"]):
            logger.info(f"[Router] Query classified as 'mock_test' via keyword rule.")
            return "mock_test"
            
        if any(w in q_lower for w in ["recent", "latest", "news", "current affairs", "pib", "budget 20", "scheme", "judgment", "supreme court 20", "today", "yesterday", "2024", "2025", "2026"]):
            logger.info(f"[Router] Query classified as 'current_affairs' via keyword rule.")
            return "current_affairs"

        if any(w in q_lower for w in ["article", "constitution", "laxmikanth", "history", "ncert", "spectrum", "explain", "what is", "define", "pyq"]):
            logger.info(f"[Router] Query classified as 'concept' via keyword rule.")
            return "concept"

        # LLM classification fallback
        prompt = f"""Classify the user prompt into exactly ONE of these three categories:
- 'concept': Conceptual question, NCERT, Laxmikanth, Constitution, History, Polity, Geography core material, answer writing guidance.
- 'mock_test': Request for quiz, mock test, MCQs, or evaluation.
- 'current_affairs': Question requiring latest news, web search, government schemes, PIB releases, recent judgments, or economic survey.

User Prompt: "{query}"

Output ONLY the category name ('concept', 'mock_test', or 'current_affairs').
"""
        try:
            res = self.llm.invoke(prompt)
            intent = res.content.strip().lower()
            if intent in ["concept", "mock_test", "current_affairs"]:
                logger.info(f"[Router] Query classified as '{intent}' via LLM.")
                return intent
        except Exception as e:
            logger.warning(f"[Router] Intent classification LLM fallback: {e}")

        return "concept"

intent_router = IntentRouter()
