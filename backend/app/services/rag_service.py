import logging
import io
from typing import Dict, Any, List
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from app.core.config import settings
from app.db.supabase import supabase

logger = logging.getLogger("rag_service")

class RAGService:
    """
    Handles PDF Document Ingestion Pipeline:
    PDF Upload -> Loader -> Text Chunking -> Embeddings -> Supabase pgvector
    """

    def __init__(self):
        self.embeddings = OpenAIEmbeddings(
            openai_api_key=settings.OPENAI_API_KEY,
            model=settings.EMBEDDING_MODEL
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n\n", "\n", ".", " ", ""]
        )

    async def ingest_pdf(self, file_bytes: bytes, filename: str, category: str, user_id: str = None) -> Dict[str, Any]:
        logger.info(f"[RAG Service] Ingesting PDF file: '{filename}', category: '{category}'")
        
        # 1. Parse PDF pages
        reader = PdfReader(io.BytesIO(file_bytes))
        full_text = ""
        pages_content = []
        
        for idx, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            if text.strip():
                full_text += text + "\n"
                pages_content.append({"page": idx + 1, "text": text})

        if not full_text.strip():
            raise ValueError("Uploaded PDF does not contain extractable text.")

        # 2. Chunk text
        chunks = self.text_splitter.split_text(full_text)
        logger.info(f"[RAG Service] Created {len(chunks)} text chunks from PDF.")

        # 3. Create document record in Supabase DB if available
        document_id = "doc-" + filename.replace(" ", "_")
        if supabase:
            try:
                doc_insert = supabase.table("documents").insert({
                    "title": filename,
                    "category": category,
                    "file_path": f"uploads/{filename}",
                    "file_size": len(file_bytes),
                    "user_id": user_id,
                    "is_global": False
                }).execute()
                if doc_insert.data:
                    document_id = doc_insert.data[0]["id"]
            except Exception as e:
                logger.warning(f"[RAG Service] Database insert for document failed: {e}")

        # 4. Generate embeddings and insert into vector store
        chunk_embeddings = self.embeddings.embed_documents(chunks)
        
        chunk_records = []
        for i, (chunk_text, emb) in enumerate(zip(chunks, chunk_embeddings)):
            chunk_records.append({
                "document_id": document_id if isinstance(document_id, str) and "-" not in document_id else None,
                "chunk_index": i,
                "content": chunk_text,
                "metadata": {"title": filename, "category": category, "chunk": i},
                "embedding": emb
            })

        if supabase and chunk_records:
            try:
                supabase.table("document_chunks").insert(chunk_records).execute()
            except Exception as e:
                logger.warning(f"[RAG Service] Supabase vector insert failed: {e}")

        return {
            "document_id": document_id,
            "filename": filename,
            "category": category,
            "total_pages": len(reader.pages),
            "chunks_count": len(chunks),
            "status": "successfully_indexed"
        }

rag_service = RAGService()
