from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.chat_db import save_message, create_chat
from backend.answer_generator import generate_answer
from backend.supabase_client import supabase

app = FastAPI(title="Machine Troubleshooting Chatbot")

# ✅ CORS configuration (VERY IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str
    chat_id: str | None = None

class AnswerResponse(BaseModel):
    answer: str
    chat_id: str

@app.get("/")
def root():
    return {"message": "Machine Chatbot Backend Running"}

@app.post("/ask", response_model=AnswerResponse)
def ask_question(data: QuestionRequest):

    chat_id = data.chat_id

    if not chat_id:
        chat_id = create_chat()

    # Save user message
    save_message(chat_id, "user", "text", {"text": data.question})

    response = generate_answer(data.question)

    # Save bot message
    save_message(chat_id, "bot", "text", {"text": response})

    return {
        "answer": response,
        "chat_id": chat_id
    }

@app.get("/chats")
def get_chats():
    response = supabase.table("chats").select("*").order("created_at", desc=True).execute()
    return response.data

@app.get("/messages/{chat_id}")
def get_messages(chat_id: str):
    response = supabase.table("messages").select("*").eq("chat_id", chat_id).order("created_at").execute()
    return response.data
