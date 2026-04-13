from app.services.LLM import sendmatchtollm
from app.rag.retrieval import retrieve

def matchservice(job_description):

    # corpus = gc.EMBEDDINGS_CACHE
    neighbors = retrieve(job_description)

    result = sendmatchtollm(job_description, neighbors)

    return result
