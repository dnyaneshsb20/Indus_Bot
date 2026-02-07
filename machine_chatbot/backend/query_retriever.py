import faiss
import pickle
from sentence_transformers import SentenceTransformer

VECTOR_DB_DIR = "vector_db"
model = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")


def detect_machine(user_query: str):
    query = user_query.lower()
    if "cnc" in query:
        return "cnc_machine"
    elif "drilling" in query:
        return "drilling_machine"
    elif "lathe" in query:
        return "lathe_machine"
    elif "milling" in query:
        return "milling_machine"
    elif "grinding" in query:
        return "grinding_machine"
    elif "injection" in query:
        return "injection_molding_machine"
    return None

def retrieve_chunks(machine_name, query, top_k=2):
    index = faiss.read_index(f"{VECTOR_DB_DIR}/{machine_name}/{machine_name}.faiss")

    with open(f"{VECTOR_DB_DIR}/{machine_name}/{machine_name}.pkl", "rb") as f:
        metadata = pickle.load(f)

    chunks = metadata["chunks"]
    query_embedding = model.encode([query]).astype("float32")
    _, indices = index.search(query_embedding, top_k)

    return [chunks[i] for i in indices[0]]

def retrieve_chunks_auto(user_query, top_k=2):
    machine = detect_machine(user_query)
    if not machine:
        return [], None
    return retrieve_chunks(machine, user_query, top_k), machine
