from backend.query_retriever import retrieve_chunks_auto

def generate_answer(user_query: str):
    chunks, machine = retrieve_chunks_auto(user_query)

    if not machine:
        return "Unable to identify the machine type from the given query."

    if not chunks:
        return "No relevant information found in the machine manuals."

    machine_name = machine.replace("_", " ").title()

    answer = [f"Based on the {machine_name} manual, the recommended solution steps are:"]
    seen = set()
    step_no = 1

    for chunk in chunks:
        text = chunk.split("solution")[-1] if "solution" in chunk else chunk
        words = text.split()
        sentence = ""

        for w in words:
            if w.isdigit():
                if sentence.strip() and sentence not in seen:
                    answer.append(f"{step_no}. {sentence.strip()}")
                    seen.add(sentence.strip())
                    step_no += 1
                sentence = ""
            else:
                sentence += w + " "

        if sentence.strip() and sentence not in seen:
            answer.append(f"{step_no}. {sentence.strip()}")
            seen.add(sentence.strip())
            step_no += 1

    answer.append(
        "\nSafety Note: Always switch off the machine and follow standard safety procedures before maintenance."
    )

    return "\n".join(answer)
