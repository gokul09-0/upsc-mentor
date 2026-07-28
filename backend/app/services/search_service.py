import logging
from typing import Dict, Any, List
from tavily import TavilyClient
from app.core.config import settings

logger = logging.getLogger("search_service")

class WebSearchService:
    """
    Search Service for live current affairs web retrieval using Tavily.
    """

    def __init__(self):
        self.client = TavilyClient(api_key=settings.TAVILY_API_KEY) if settings.TAVILY_API_KEY else None

    def search_current_affairs(self, query: str, max_results: int = 5) -> List[Dict[str, Any]]:
        logger.info(f"[Search Service] Web search for: '{query}'")
        if self.client:
            try:
                res = self.client.search(
                    query=f"UPSC PIB {query}",
                    search_depth="advanced",
                    max_results=max_results
                )
                return res.get("results", [])
            except Exception as e:
                logger.warning(f"[Search Service] Tavily search error: {e}")

        return [
            {
                "title": "Press Information Bureau (PIB) India",
                "url": "https://pib.gov.in",
                "content": f"Official updates on government initiatives regarding {query}."
            }
        ]

search_service = WebSearchService()
