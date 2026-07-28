import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("upsc_mentor_main")

# Enable LangSmith Tracing if configured
if settings.LANGCHAIN_TRACING_V2.lower() == "true" and settings.LANGCHAIN_API_KEY:
    os.environ["LANGCHAIN_TRACING_V2"] = "true"
    os.environ["LANGCHAIN_ENDPOINT"] = settings.LANGCHAIN_ENDPOINT
    os.environ["LANGCHAIN_API_KEY"] = settings.LANGCHAIN_API_KEY
    os.environ["LANGCHAIN_PROJECT"] = settings.LANGCHAIN_PROJECT
    logger.info(f"LangSmith Tracing ENABLED for project: '{settings.LANGCHAIN_PROJECT}'")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Backend API engine for UPSC AI Mentor featuring LangGraph orchestration, Supabase RAG vector search, Tavily web search, and LangSmith tracing."
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev/preview deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

import time
from fastapi import Request
from fastapi.responses import JSONResponse

# Global Request Timing & Quality Tracking Middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = f"{process_time:.4f}s"
        return response
    except Exception as exc:
        logger.error(f"[Global Exception Handler] Unhandled error: {exc}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"message": "Internal Server Error", "detail": str(exc)}
        )

@app.get("/")
async def root():
    return {
        "message": "UPSC AI Mentor API System Online",
        "version": settings.VERSION,
        "docs": "/docs",
        "langgraph_agents": ["Knowledge Agent", "Tutor Agent", "Test Agent", "Research Agent"]
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "supabase": "connected" if settings.SUPABASE_URL else "mock",
        "langsmith_tracing": settings.LANGCHAIN_TRACING_V2,
        "project": settings.LANGCHAIN_PROJECT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
