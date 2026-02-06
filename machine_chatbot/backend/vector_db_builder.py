import os
import pickle
import faiss
import numpy as np

from embedding_generator import generate_embeddings

VECTOR_DB_DIR = "vector_db"

def build_vector_db():
    all_data = generate_embeddings()

    for machine, content in all_data.items():
        chunks = content["chunks"]
        embeddings = content["embeddings"]

        # Convert embeddings to numpy float32
        embeddings = np.array(embeddings).astype("float32")

        # Create FAISS index
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(embeddings)

        # Create machine folder
        machine_dir = os.path.join(VECTOR_DB_DIR, machine)
        os.makedirs(machine_dir, exist_ok=True)

        # Save FAISS index
        faiss_path = os.path.join(machine_dir, f"{machine}.faiss")
        faiss.write_index(index, faiss_path)

        # Save metadata using pickle
        metadata = {
            "machine": machine,
            "chunks": chunks
        }

        pkl_path = os.path.join(machine_dir, f"{machine}.pkl")
        with open(pkl_path, "wb") as f:
            pickle.dump(metadata, f)

        print(f"✅ Vector DB created for {machine}")

if __name__ == "__main__":
    build_vector_db()
