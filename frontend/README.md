# Zee AI Site
AI-powered portfolio that lets users query, evaluate, and interact with my work instead of reading a static resume.

## Philosophy
Don’t read my resume.
Query it. Evaluate it. Challenge it.

# Architecture
- Frontend: Next.js
- Backend: FastAPI
- Core: Custom RAG pipeline (chunking → retrieval → LLM)
- Data: Structured project + resume corpus

# Key Features
- Conversational portfolio experience
- Context-aware responses grounded in real data
- Fully custom pipeline (no heavy frameworks)
- Clean modular backend design

# Job Matcher
- Paste a job description and evaluate alignment instantly
- Uses the same RAG pipeline (embedding → retrieval → LLM)
- Returns structured output:
  - Match Score (1–10)
  - Summary of fit
  - Key strengths
  - Gaps / missing areas
- Helps simulate real-world job screening and highlights improvement areas

# Project Structure 📂
backend/
  app/
    rag/
    services/
  data/
frontend/
  src/app/

# Future Roadmap
- Advanced AI features

# Note: 
- Personal data files (e.g., resume corpus used for RAG) are excluded from the repository for privacy.
