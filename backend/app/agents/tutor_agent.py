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
    - Explain concepts using retrieved context ONLY.
    - If context is missing/empty, returns explicit Grounded RAG "Not Found in Knowledge Base" alert.
    - Generate structured answers when context is present.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model=settings.PRIMARY_MODEL,
            temperature=0.2
        )

    def explain_concept(self, query: str, context_chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
        logger.info(f"[Tutor Agent] Formatting response using {len(context_chunks)} retrieved context chunks.")
        
        # Grounded RAG Guardrail: If context chunks are empty, return explicit Not Found response
        if not context_chunks:
            return {
                "answer": f"### ⚠️ Topic Not Found in UPSC Knowledge Base\n\nThe query **\"{query}\"** does not exist in the indexed **UPSC Vector Repository** (Laxmikanth, NCERTs, Spectrum, PYQs) or your uploaded study materials.\n\n* 💡 **Recommendation**: Please ask a question directly related to the **UPSC Civil Services Syllabus** (Polity, History, Economy, Geography, Governance) or upload a PDF document using the **Upload PDF** button above to query it via RAG.",
                "sources": [],
                "agent_used": "Tutor Agent"
            }

        context_str = "\n\n".join([
            f"--- Document Source: {chunk['source']} (Page {chunk['page']}) ---\n{chunk['content']}"
            for chunk in context_chunks
        ])

        system_prompt = """You are the Senior UPSC Mentor AI, an expert evaluator and teacher for the Civil Services Examination (IAS/IPS/IFS).
Your duty is to deliver a structured response based EXCLUSIVELY on the retrieved study materials provided below.

Rules for your response:
1. **Structure your answer like a top UPSC Mains Candidate**:
   - **Introduction**: Brief 2-3 line definition or contextual backdrop.
   - **Core Analysis & Key Concepts**: Clear bullet points with bold sub-headers, relevant Constitutional Articles / Committees / Historical Dates / Economic terms.
   - **UPSC Relevance**: Explicitly state which GS Paper (GS-I, GS-II, GS-III, GS-IV) and Syllabus section this query targets.
   - **Answer Writing Pro-Tip**: Provide actionable recommendations on how to present this topic in Mains (e.g. diagrams, flowcharts, landmark case laws, committee quotes).
   - **Way Forward / Conclusion**: Balanced, optimistic 2-line conclusion.

2. Always cite your source documents accurately at the end of key points using [Source Name, Page X].

If the context does not contain relevant information, state that the concept is not present in the reference documents.
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
        if not context_chunks:
            return f"### ⚠️ Topic Not Found in UPSC Knowledge Base\n\nThe topic **\"{query}\"** is not present in the reference materials."

        ctx_summary = context_chunks[0]["content"]
        src_name = context_chunks[0]["source"]
        
        return f"""### 📌 Core Concept Explanation

{ctx_summary}

---

### 🏛️ UPSC Syllabus Relevance
* **GS Paper**: GS Paper II / GS Paper III (Depending on core theme)
* **Topic Focus**: Core Syllabus Reference

---

### 💡 UPSC Mains Answer Writing Pro-Tip
* **Presentation**: Structure your answer into clear headings: *Background, Core Provisions, Challenges, and Recommendations*.

*(Reference: {src_name})*
"""

tutor_agent = TutorAgent()
