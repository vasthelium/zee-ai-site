from openai import OpenAI
import numpy as np
import app.global_cache as gc
from app.global_cache import load_to_memory
import app.services.configs as config
import ast


DEBUG = False

def retrieve(user_input):
    """
    Retrieve top relevant chunks using embedding similarity.
    """
    # --- Step 1: Convert user query to embedding ---
    client = OpenAI(api_key=config.CONFIG_CACHE["OPENAI_API_KEY"])
    embedding_convert = client.embeddings.create(
        model="text-embedding-3-small",
        input=user_input
    )
    q_vec = embedding_convert.data[0].embedding
    q_vec = np.array(q_vec)

    # --- Step 2: Load stored embeddings ---
    stored_vecs = gc.EMBEDDINGS_CACHE
    if not stored_vecs:
        return []

    neighbors = []

    # --- Step 3: Compute similarity ---
    for chunk in stored_vecs:
        t_vec = chunk["embedding"]

        if isinstance(t_vec, str):
            t_vec = ast.literal_eval(t_vec)
        if not isinstance(t_vec, np.ndarray):
            t_vec = np.array(t_vec)
        
        # Use dot product (efficient for normalized embeddings)
        sim = np.dot(q_vec, t_vec)

        neighbors.append({
            "score": sim,
            "content": chunk["content"],
            "source": chunk["source"]
        })

    # --- Step 4: Sort by similarity ---
    neighbors.sort(key=lambda x: x["score"], reverse=True)

    # Debug (temporary)
    if DEBUG:
        for n in neighbors[:5]:
            print(n["score"], n["content"][:60])

    # --- Step 5: Return top results ---
    return neighbors[:5]

if __name__ == "__main__":
    load_to_memory()
    print("CACHE SIZE:", len(gc.EMBEDDINGS_CACHE))

    res = retrieve("How many years of experience does Syed Zameer M has?")
    
    for r in res:
        print(r["score"], r["content"])