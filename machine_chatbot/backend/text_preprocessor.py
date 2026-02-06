import re
from text_extractor import extract_all_manuals

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def chunk_text(text, chunk_size=100, overlap=20):
    words = text.split()
    chunks = []

    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = words[start:end]
        chunks.append(" ".join(chunk))
        start = end - overlap

    return chunks


if __name__ == "__main__":
    manuals = extract_all_manuals()

    for machine, text in manuals.items():
        print(f"\n--- {machine.upper()} CHUNKS ---")

        cleaned_text = clean_text(text)
        chunks = chunk_text(cleaned_text)

        for i, chunk in enumerate(chunks):
            print(f"\nChunk {i + 1}:\n{chunk}")
