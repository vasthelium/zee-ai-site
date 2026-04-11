from app.services.db_service import read_embeddingdata

EMBEDDINGS_CACHE = []

def load_to_memory():
    global EMBEDDINGS_CACHE 
    EMBEDDINGS_CACHE = read_embeddingdata()
