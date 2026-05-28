from backend.query_retriever import retrieve_chunks_auto, retrieve_chunks_by_machine
import os
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

# Toggle between local and LLM
USE_LLM = True  # 🔥 keep False for now

# Initialize client only if needed


client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ✅ LOCAL VERSION (your original logic — simplified)
def generate_answer_local(user_query: str, machine_name: str = None):
    if machine_name:
        chunks, machine = retrieve_chunks_by_machine(machine_name, user_query)
    else:
        chunks, machine = retrieve_chunks_auto(user_query)

    if not machine:
        return "Unable to identify the machine type from the given query."

    if not chunks:
        return "No relevant information found in the machine manuals."

    machine_name = machine.replace("_", " ").title()

    answer = [f"Based on the {machine_name} manual:\n"]

    for i, chunk in enumerate(chunks):
        answer.append(f"{i+1}. {chunk.strip()}")

    answer.append("\nSafety Note: Always switch off the machine before maintenance.")

    return "\n".join(answer)


# 🤖 LLM VERSION
def generate_answer_llm(user_query: str, machine_name: str = None):
    print("🚀 LLM FUNCTION CALLED")
    if machine_name:
        chunks, machine = retrieve_chunks_by_machine(machine_name, user_query, top_k=4)
    else:
        chunks, machine = retrieve_chunks_auto(user_query, top_k=4)

    if not machine:
        return "Unable to identify the machine type from the given query."

    if not chunks:
        return "No relevant information found in the machine manuals."

    machine_name = machine.replace("_", " ").title()
    context = "\n\n".join(chunks)

    prompt = f"""
You are a professional industrial machine troubleshooting expert.

Machine: {machine_name}

User Problem:
{user_query}

Manual Extract:
{context}

Instructions:
- Give clear numbered troubleshooting steps
- Each step should be short and actionable
- Do NOT repeat information
- Use simple technician-friendly language
- If multiple causes exist, prioritize most likely ones
- End with a safety warning

Output Format:
1. Step one
2. Step two
3. Step three

Safety Note: ...

Answer:
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful industrial troubleshooting assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        print("✅ LLM RAW RESPONSE:", response)

        return response.choices[0].message.content

    except Exception as e:
        print("LLM Error:", e)
        return generate_answer_local(user_query, machine_name)  # 🔥 fallback

# 🌍 TRANSLATION LOGIC
def translate_to_english(query: str) -> str:
    prompt = f"""
You are a technical translator. 
Translate the following user query to standard English. 
The query could be in English, Hindi, Marathi, or a mix of these languages (including Hinglish/Roman script).
If the query is already entirely in standard English, return it exactly as it is without any changes.
Do NOT add any conversational filler, explanations, or quotes. ONLY return the translated English text.

Query to translate: {query}
"""
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a highly accurate technical translator."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1
        )
        translated_text = response.choices[0].message.content.strip()
        return translated_text
    except Exception as e:
        print("Translation LLM Error:", e)
        return query  # fallback to original if it fails



# 🔥 MAIN FUNCTION
def generate_answer(user_query: str, machine_name: str = None):
    # 0. Translate the query to English first
    english_query = translate_to_english(user_query)
    print(f"🌍 Original Query: {user_query}")
    print(f"🇬🇧 Translated Query: {english_query}")

    # 1. Handle simple greetings
    clean_query = english_query.lower().strip().strip('?!.')
    
    # Format machine name for display
    display_name = machine_name if machine_name else "your equipment"
    
    greetings = {
        "hi": f"Hello! I'm IndusBot, your assistant for the {display_name}. How can I help you today?",
        "hello": f"Hi there! I'm IndusBot. How can I assist you with your {display_name} troubleshooting today?",
        "hey": f"Hello! Need help with the {display_name}? Just let me know the issue.",
        "hi there": f"Hello! How can I assist you with the {display_name} today?",
        "hello there": f"Hi! I'm here to help with your {display_name}. What's on your mind?",
        "good morning": f"Good morning! How can I help you with the {display_name} today?",
        "good afternoon": f"Good afternoon! How can I assist you with the {display_name} today?",
        "good evening": f"Good evening! Ready to help with any questions about the {display_name}.",
        "who are you": "I am IndusBot, an AI assistant designed to help you troubleshoot and maintain industrial machinery using technical manuals.",
        "what can you do": f"I can help you diagnose {display_name} errors, find maintenance schedules, and provide step-by-step troubleshooting guides.",
        "how are you": "I'm functioning perfectly! Ready to help you with any machine issues. How can I assist you?",
    }

    if clean_query in greetings:
        return greetings[clean_query]

    # 2. Proceed to LLM/Local generation for technical queries using the translated query
    if USE_LLM:
        return generate_answer_llm(english_query, machine_name)
    else:
        return generate_answer_local(english_query, machine_name)