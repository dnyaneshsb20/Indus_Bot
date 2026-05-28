#query_retriever.py
import faiss
import pickle
from sentence_transformers import SentenceTransformer
from rapidfuzz import process, fuzz
# 🔧 spelling + synonym fix
SYNONYM_FIX = {
    "ccn": "cnc",
    "cnc machinee": "cnc machine",
    "lathee": "lathe",
    "driling": "drilling",
    "millng": "milling",
}

def normalize_query(query: str):
    q = query.lower()

    for wrong, correct in SYNONYM_FIX.items():
        q = q.replace(wrong, correct)

    return q
VECTOR_DB_DIR = "vector_db"
model = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")


MACHINES = {
    "cnc machine": "cnc_machine",
    "lathe machine": "lathe_machine",
    "drilling machine": "drilling_machine",
    "milling machine": "milling_machine",
    "grinding machine": "grinding_machine",
    "injection molding machine": "injection_molding_machine",
}

def detect_machine(user_query: str):
    query = user_query.lower()

    best_match = process.extractOne(query, MACHINES.keys(), scorer=fuzz.partial_ratio)
        # 🔍 DEBUG LINES (ADD HERE)
    print("QUERY:", query)
    print("MATCH:", best_match)

    if best_match and best_match[1] > 70:
        return MACHINES[best_match[0]]

    return None

def retrieve_chunks(machine_name, query, top_k=2):
    index = faiss.read_index(f"{VECTOR_DB_DIR}/{machine_name}/{machine_name}.faiss")

    with open(f"{VECTOR_DB_DIR}/{machine_name}/{machine_name}.pkl", "rb") as f:
        metadata = pickle.load(f)

    chunks = metadata["chunks"]
    query_embedding = model.encode([query]).astype("float32")
    _, indices = index.search(query_embedding, top_k)

    return [chunks[i] for i in indices[0]]

FRONTEND_MACHINE_MAP = {
    "cnc router": "cnc_machine",
    "lathe machine": "lathe_machine",
    "drilling machine": "drilling_machine",
    "milling machine": "milling_machine",
    "grinding machine": "grinding_machine",
    "injection molding machine": "injection_molding_machine",
}

def retrieve_chunks_by_machine(machine_name, user_query, top_k=2):
    user_query = normalize_query(user_query)
    
    # Map from frontend machine name to internal folder name
    machine = FRONTEND_MACHINE_MAP.get(machine_name.lower(), None)
    
    # Fallback to auto-detect if not found or no machine name passed
    if not machine:
        return retrieve_chunks_auto(user_query, top_k)
        
    try:
        return retrieve_chunks(machine, user_query, top_k), machine
    except Exception as e:
        print(f"Error reading vector DB for {machine}: {e}")
        return [], machine

def retrieve_chunks_auto(user_query, top_k=2):
    # 🔥 normalize first
    user_query = normalize_query(user_query)

    machine = detect_machine(user_query)
    if not machine:
        return [], None
    return retrieve_chunks(machine, user_query, top_k), machine
