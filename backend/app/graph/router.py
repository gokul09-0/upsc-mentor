import logging
from functools import lru_cache
from typing import Optional
from langchain_openai import ChatOpenAI
from app.core.config import settings

logger = logging.getLogger("graph_router")

class IntentRouter:
    """
    High-performance Intent Router Logic for LangGraph Workflow:
    1. Conceptual/study material -> route to 'knowledge_agent' -> 'tutor_agent' -> END
    2. Mock test or MCQs -> route to 'test_agent' -> END
    3. Recent info or current affairs -> route to 'research_agent' -> END
    """

    def __init__(self) -> None:
        self.llm = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model="gpt-4o",
            temperature=0.2,
            max_tokens=1200
        )

    def classify_intent(self, query: Optional[str]) -> str:
        """
        Classifies user query into one of: 'concept', 'mock_test', or 'current_affairs'.
        Uses deterministic keyword rules first, with LLM fallback.
        """
        if not query or not isinstance(query, str) or not query.strip():
            logger.warning("[Router] Empty or invalid query received. Defaulting to 'concept'.")
            return "concept"

        q_clean = query.strip()
        return self._cached_classify(q_clean.lower(), q_clean)

    @lru_cache(maxsize=256)
    def _cached_classify(self, q_lower: str, original_query: str) -> str:
        # 1. Current Affairs Rule Check
        if any(w in q_lower for w in ["recent", "latest", "news", "current affairs", "pib", "budget", "scheme", "judgment", "supreme court", "today", "yesterday", "2024", "2025", "2026"]):
            logger.info("[Router] Query classified as 'current_affairs' via keyword rule.")
            return "current_affairs"

        # 2. Mock Test Rule Check (avoid matching 'test' inside 'latest')
        test_keywords = ["mock test", "quiz", "mcq", "question bank", "practice question", "generate test", "create test", "take test", "exam test"]
        if any(w in q_lower for w in test_keywords) or ((" test" in q_lower or "test " in q_lower) and "latest" not in q_lower):
            logger.info("[Router] Query classified as 'mock_test' via keyword rule.")
            return "mock_test"

        # 3. Concept Rule Check
        if any(w in q_lower for w in ["article", "constitution", "laxmikanth", "history", "ncert", "spectrum", "explain", "what is", "define", "pyq"]):
            logger.info("[Router] Query classified as 'concept' via keyword rule.")
            return "concept"

        # LLM classification fallback
        prompt = f"""Classify the user prompt into exactly ONE of these three categories:
- 'concept': Conceptual question, NCERT, Laxmikanth, Constitution, History, Polity, Geography core material, answer writing guidance.
- 'mock_test': Request for quiz, mock test, MCQs, or evaluation.
- 'current_affairs': Question requiring latest news, web search, government schemes, PIB releases, recent judgments, or economic survey.

User Prompt: "{original_query}"

Output ONLY the category name ('concept', 'mock_test', or 'current_affairs').
"""
        try:
            res = self.llm.invoke(prompt)
            intent = str(res.content).strip().lower()
            if intent in ["concept", "mock_test", "current_affairs"]:
                logger.info(f"[Router] Query classified as '{intent}' via LLM.")
                return intent
        except Exception as e:
            logger.warning(f"[Router] Intent classification LLM fallback failed: {e}")

        return "concept"

intent_router = IntentRouter()

