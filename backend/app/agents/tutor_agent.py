import logging
from typing import Dict, Any, List
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings

logger = logging.getLogger("tutor_agent")

class TutorAgent:
    """
    Agent 2: Tutor Agent
    Responsibilities:
    - Explain concepts using retrieved context.
    - Generate structured answers.
    - Provide examples.
    - Explain UPSC relevance (GS Paper, Syllabus topic).
    - Suggest answer writing improvements.
    - NEVER perform retrieval directly.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model=settings.PRIMARY_MODEL,
            temperature=0.3
        )

    def explain_concept(self, query: str, context_chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
        logger.info(f"[Tutor Agent] Formatting response using {len(context_chunks)} retrieved context chunks.")
        
        context_str = "\n\n".join([
            f"--- Document Source: {chunk['source']} (Page {chunk['page']}) ---\n{chunk['content']}"
            for chunk in context_chunks
        ])

        system_prompt = """You are the Senior UPSC Mentor AI, an expert evaluator and teacher for the Civil Services Examination (IAS/IPS/IFS).
Your duty is to deliver a flawless, high-scoring structured response based EXCLUSIVELY on the retrieved study materials provided below.

Rules for your response:
1. **Structure your answer like a top UPSC Mains Candidate**:
   - **Introduction**: Brief 2-3 line definition or contextual backdrop.
   - **Core Analysis & Key Concepts**: Clear bullet points with bold sub-headers, relevant Constitutional Articles / Committees / Historical Dates / Economic terms.
   - **UPSC Relevance**: Explicitly state which GS Paper (GS-I, GS-II, GS-III, GS-IV) and Syllabus section this query targets.
   - **Answer Writing Pro-Tip**: Provide actionable recommendations on how to present this topic in Mains (e.g. diagrams, flowcharts, landmark case laws, committee quotes).
   - **Way Forward / Conclusion**: Balanced, optimistic 2-line conclusion.

2. Always cite your source documents accurately at the end of key points using [Source Name, Page X].

DO NOT perform any web searches or invent unverified facts. Use the context provided below.
"""

        user_prompt = f"""Student Question: {query}

Retrieved UPSC Context:
{context_str}
"""

        try:
            prompt = ChatPromptTemplate.from_messages([
                ("system", system_prompt),
                ("user", user_prompt)
            ])
            
            chain = prompt | self.llm
            response = chain.invoke({})
            answer_text = response.content
        except Exception as e:
            logger.warning(f"[Tutor Agent] LLM API call fallback: {e}")
            answer_text = self._fallback_response(query, context_chunks)

        sources = [
            {"title": chunk["source"], "page": chunk["page"]}
            for chunk in context_chunks
        ]

        return {
            "answer": answer_text,
            "sources": sources,
            "agent_used": "Tutor Agent"
        }

    def _fallback_response(self, query: str, context_chunks: List[Dict[str, Any]]) -> str:
        ctx_summary = context_chunks[0]["content"] if context_chunks else "Standard UPSC Civil Services syllabus guidelines."
        src_name = context_chunks[0]["source"] if context_chunks else "Standard Core Reference"
        
        return f"""### 📌 Core Concept Explanation

{ctx_summary}

---

### 🏛️ UPSC Syllabus Relevance
* **GS Paper**: GS Paper II / GS Paper III (Depending on core theme)
* **Topic Focus**: Statutory, Regulatory & Constitutional Bodies / Indian Economy / Modern Indian History

---

### 💡 UPSC Mains Answer Writing Pro-Tip
* **Presentation**: Structure your answer into clear headings: *Background, Core Provisions, Challenges, and Recommendations*.
* **Enrichment**: Always cite landmark judgments, Law Commission reports, or Parliamentary Committee findings to boost your score by 1.5 - 2 marks per answer!

*(Reference: {src_name})*
"""

tutor_agent = TutorAgent()
