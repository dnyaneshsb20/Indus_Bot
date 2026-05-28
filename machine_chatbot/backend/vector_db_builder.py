#vector_db_builder.py
import os
import pickle
import faiss
import numpy as np

try:
    from backend.embedding_generator import generate_embeddings
except ImportError:
    from embedding_generator import generate_embeddings
    
import hashlib
import json

VECTOR_DB_DIR = "vector_db"
DATA_DIR = "data"
STATE_FILE = os.path.join(VECTOR_DB_DIR, "db_state.json")

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

        print(f"[SUCCESS] Vector DB created for {machine}")

def get_data_folder_hash():
    hasher = hashlib.md5()
    if not os.path.exists(DATA_DIR):
        return None
        
    for root, dirs, files in os.walk(DATA_DIR):
        for file in sorted(files):
            if file.endswith((".txt", ".pdf", ".docx", ".xlsx")):
                file_path = os.path.join(root, file)
                stat = os.stat(file_path)
                hasher.update(f"{file_path}_{stat.st_mtime}_{stat.st_size}".encode('utf-8'))
    return hasher.hexdigest()

def check_and_build_vector_db():
    print("\n[INFO] Checking if documents have changed...")
    current_hash = get_data_folder_hash()
    
    if current_hash is None:
        print("[WARNING] Data folder not found. Skipping build.")
        return

    previous_hash = None
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r") as f:
                state = json.load(f)
                previous_hash = state.get("hash")
        except Exception:
            pass
            
    if current_hash != previous_hash:
        print("[INFO] Changes detected in documents! Rebuilding vector database...")
        build_vector_db()
        
        os.makedirs(VECTOR_DB_DIR, exist_ok=True)
        with open(STATE_FILE, "w") as f:
            json.dump({"hash": current_hash}, f)
        print("[SUCCESS] Vector database updated and state saved.\n")
    else:
        print("[INFO] No changes detected in documents. Skipping vector database build.\n")

if __name__ == "__main__":
    build_vector_db()
