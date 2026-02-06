from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.answer_generator import generate_answer

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

class AnswerResponse(BaseModel):
    answer: str

@app.get("/")
def root():
    return {"message": "Machine Chatbot Backend Running"}

@app.post("/ask", response_model=AnswerResponse)
def ask_question(data: QuestionRequest):
    response = generate_answer(data.question)
    return {"answer": response}
