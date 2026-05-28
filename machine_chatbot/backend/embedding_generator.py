#embedding_generator.py
from sentence_transformers import SentenceTransformer
try:
    from backend.text_preprocessor import extract_all_manuals, clean_text, chunk_text
except ImportError:
    from text_preprocessor import extract_all_manuals, clean_text, chunk_text

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embeddings():
    all_embeddings = {}

    manuals = extract_all_manuals()

    for machine, text in manuals.items():
        cleaned_text = clean_text(text)
        chunks = chunk_text(cleaned_text)

        embeddings = model.encode(chunks)

        all_embeddings[machine] = {
            "chunks": chunks,
            "embeddings": embeddings
        }

    return all_embeddings


if __name__ == "__main__":
    data = generate_embeddings()

    for machine, content in data.items():
        print(f"\n--- {machine.upper()} ---")
        print(f"Number of chunks: {len(content['chunks'])}")
        print(f"Embedding vector shape: {content['embeddings'].shape}")
