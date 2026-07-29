# 🏛️ UPSC AI Mentor - Production AI Preparation Platform

> **Production Blueprint**  

> Built following the complete **AI Software Development Life Cycle (AI SDLC)** with a production multi-agent architecture using **LangGraph**, **FastAPI**, **Next.js 14**, **Supabase pgvector**, **Tavily Web Search**, and **LangSmith**.

---

## 🌟 Key Features

1. **🔒 Secure Authentication**: Email and password authentication powered strictly by **Supabase Auth**.
2. **📚 RAG Knowledge Retrieval**: RAG search over indexed standard UPSC textbooks (NCERT, M. Laxmikanth, Spectrum, PYQs) using **Supabase pgvector** (1536-dim OpenAI embeddings).
3. **🌐 Live Web Research**: Real-time retrieval of government press releases (PIB), Union Budget highlights, Supreme Court judgments, and Economic Survey updates via **Tavily Search API**.
4. **📝 AI Mock Test & MCQ Engine**: Automated Prelims standard MCQ generation, negative marking evaluation (-0.66 per wrong answer), and weak area diagnostics.
5. **📊 Progress Dashboard**: Comprehensive analytics on cumulative accuracy, subject breakdown, study streaks, and weak/strong topics.
6. **🎨 Human-Centered SaaS UI**: Premium Glassmorphism interface built with Next.js 14 (App Router), Tailwind CSS, Lucide Icons, and dark mode.

---

## 🧠 LangGraph Multi-Agent Architecture

The core AI engine uses **LangGraph** to orchestrate **exactly FOUR specialized agents**:

```
                              [User Prompt]
                                    │
                                    ▼
                         [LangGraph Intent Router]
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
[1. Knowledge Agent]       [3. Test Agent]            [4. Research Agent]
       │                            │                            │
       ▼ (Vector Docs)              ▼ (Mock Test & MCQs)         ▼ (Tavily Web Search)
[2. Tutor Agent]             [Final Response]             [GPT Current Affairs]
       │                                                         │
       ▼                                                         ▼
 [Final Response]                                          [Final Response]
```

### Agent Responsibilities & Capabilities:
- **Agent 1: Knowledge Agent**: Retrieves relevant chunks from Supabase `pgvector`. Performs cosine similarity search across uploaded PDFs, NCERTs, Laxmikanth, and PYQs.
- **Agent 2: Tutor Agent**: Synthesizes retrieved RAG context into structured Mains-style answers (Introduction, Body with Subheadings, UPSC Relevance, Answer Writing Tips, Conclusion). *Never performs retrieval directly.*
- **Agent 3: Test Agent**: Generates custom Prelims MCQs, evaluates student responses, calculates UPSC scores with negative marking, and diagnoses topic weak areas.
- **Agent 4: Research Agent**: Executes live web searches via **Tavily API** for recent PIB announcements, government schemes, and legal judgments. *Never accesses vector DB*. ALWAYS provides source links & citations.

---

## 🛠️ Technology Stack

| Layer | Technology Used |
|---|---|
| **Frontend** | Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | FastAPI, Python 3.11+, Pydantic v2, Uvicorn |
| **AI Framework** | LangGraph, LangChain, OpenAI GPT-4o, OpenAI Embeddings (`text-embedding-3-small`) |
| **Database & Vector Store** | Supabase PostgreSQL, `pgvector` HNSW extension, Supabase Auth |
| **Web Search** | Tavily Search API |
| **Observability** | LangSmith Tracing & Evaluation |
| **Deployment** | Vercel (Frontend), Render / Docker (Backend) |

---

## 🗄️ Database Schema (`database/schema.sql`)

The database consists of 7 PostgreSQL tables with Row Level Security (RLS):
1. `users` - Syncs user profile with Supabase Auth (`target_year`, `optional_subject`, `study_streak`).
2. `documents` - Catalog of uploaded PDF study materials and standard core textbooks.
3. `document_chunks` - Stores 1536-dimensional vector embeddings with HNSW index for fast similarity matching.
4. `chat_history` - Session history with agent metadata and source citations.
5. `mock_tests` - AI generated question sets and options.
6. `test_results` - Evaluated student test scores, accuracy, and topic weakness breakdowns.
7. `bookmarks` - Bookmarked study materials.

---

## 📄 Application Pages

| Page Route | Description |
|---|---|
| `/login` | Supabase email & password authentication |
| `/register` | User onboarding with target exam year selection |
| `/dashboard` | Executive summary, study streak, continue learning, PIB current affairs widget |
| `/chat` | ChatGPT-style interface with markdown rendering, streaming, citations, PDF upload |
| `/materials` | Subject categories, search filters, document viewer, bookmarks |
| `/mock-test` | Subject & difficulty picker, interactive quiz runner, instant report |
| `/progress` | Subject accuracy radar, study streak, historical test logs |
| `/profile` | User preferences, optional subject, target year update |
| `/settings` | System service status, LangSmith tracing toggle, RAG threshold slider |

---

## ⚙️ Quick Start

Check out [`INSTALLATION.md`](file:///c:/Users/gokul/Downloads/UPSC%20Mentor/INSTALLATION.md) for full step-by-step setup instructions.

```bash
# Backend (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (Next.js)
cd frontend
npm install
npm run dev
```

---

## 📝 Verification & Testing
- Run pytest for agent routing logic:
  ```bash
  cd backend && pytest
  ```
- Check API docs at `http://localhost:8000/docs`
- Access Next.js web application at `http://localhost:3000`

---

## 📜 License
Developed for Production Deployment. Open Source MIT License.
