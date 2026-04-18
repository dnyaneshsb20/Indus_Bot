from backend.query_retriever import retrieve_chunks_auto
import os
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

# Toggle between local and LLM
USE_LLM = True  # 🔥 keep False for now

# Initialize client only if needed


client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ✅ LOCAL VERSION (your original logic — simplified)
def generate_answer_local(user_query: str):
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
def generate_answer_llm(user_query: str):
    print("🚀 LLM FUNCTION CALLED")
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
        return generate_answer_local(user_query)  # 🔥 fallback


# 🔥 MAIN FUNCTION
def generate_answer(user_query: str):
    if USE_LLM:
        return generate_answer_llm(user_query)
    else:
        return generate_answer_local(user_query)