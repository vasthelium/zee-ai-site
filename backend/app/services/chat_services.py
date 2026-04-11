from app.rag.pipeline import rag_pipeline

def chatservice(user_input):

    user_output = rag_pipeline(user_input)
    
    return user_output
