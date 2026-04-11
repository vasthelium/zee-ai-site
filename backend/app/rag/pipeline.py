from app.rag.retrieval import retrieve
from app.services.LLM import sendtollm

def rag_pipeline(user_input):

    neighbors = retrieve(user_input)
    print("NEIGHBORS COUNT:", len(neighbors))
    response = sendtollm(user_input, neighbors)

    return response

