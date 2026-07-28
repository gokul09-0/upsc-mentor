# 🚀 UPSC AI Mentor - Step-by-Step Setup & Installation Guide

This guide outlines how to configure, run locally, and deploy the **UPSC AI Mentor** platform.

---

## 1. System Requirements
- Node.js 18.x or 20.x
- Python 3.11 or higher
- Supabase Cloud account (with PostgreSQL + `pgvector`)
- OpenAI API Key
- Tavily Search API Key
- LangSmith API Key (Optional for tracing)

---

## 2. Database & Supabase Setup
1. Create a project on [Supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of [`database/schema.sql`](file:///c:/Users/gokul/Downloads/UPSC%20Mentor/database/schema.sql) and execute the query.
4. Verify that the `vector` extension is created and all 7 core tables are present:
   - `users`, `documents`, `document_chunks`, `chat_history`, `mock_tests`, `test_results`, `bookmarks`.

---

## 3. Backend Setup (FastAPI)
```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# 3. Install requirements
pip install -r requirements.txt

# 4. Set environment variables (Copy .env.example)
cp ../.env.example .env

# 5. Run FastAPI Server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be available at: `http://localhost:8000/docs`

---

## 4. Frontend Setup (Next.js 14)
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env.local
cp ../.env.example .env.local

# 4. Start Next.js Development Server
npm run dev
```
Frontend will be accessible at: `http://localhost:3000`

---

## 5. Deployment Instructions

### Deploying Backend to Render
1. Connect your GitHub repository to [Render.com](https://render.com).
2. Click **New Web Service** and select `render.yaml` blueprint OR select Docker runtime pointing to `backend/Dockerfile`.
3. Add Environment variables (`OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`, `TAVILY_API_KEY`, `LANGCHAIN_API_KEY`).

### Deploying Frontend to Vercel
1. Import repository to [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Add Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_URL`).
4. Click **Deploy**.
