from fastapi import FastAPI, Request
from app.services.chat_services import chatservice
from pydantic import BaseModel
from contextlib import asynccontextmanager
from app.global_cache import load_to_memory

@asynccontextmanager
async def lifespan(app: FastAPI):
    #startup
    load_to_memory()
    #shutdown
    yield

app = FastAPI(lifespan=lifespan)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/chat")
async def sendchat(request: ChatRequest):
    user_input = request.message

    callchat = chatservice(user_input)

    return callchat







