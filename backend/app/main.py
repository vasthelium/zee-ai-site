from fastapi import FastAPI, Request
from app.services.chat_services import chatservice
from pydantic import BaseModel
from contextlib import asynccontextmanager
from app.global_cache import load_to_memory
from app.services.match_service import matchservice
from app.services.configs import loadconfig_tomemory
from app.services.db_repository import init_dbpool
import app.services.configs as config

@asynccontextmanager
async def lifespan(app: FastAPI):
    #startup
    loadconfig_tomemory()
    init_dbpool(config.CONFIG_CACHE["DATABASE_URL"])
    load_to_memory()
    #shutdown
    yield

app = FastAPI(lifespan=lifespan)

class ChatRequest(BaseModel):
    message: str

class MatchRequest(BaseModel):
    job_description: str


@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/chat")
async def sendchat(request: ChatRequest):
    user_input = request.message

    callchat = chatservice(user_input)

    return callchat

@app.post("/match")
async def sendmatch(request: MatchRequest):
    user_input = request.job_description

    callmatch = matchservice(user_input)

    return callmatch








