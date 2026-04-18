import os

def load_data():

    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    resume_path = os.path.join(base_dir, "data", "resume.txt")
    trusic_path = os.path.join(base_dir, "data", "trusic.txt")
    healthengine_path = os.path.join(base_dir, "data", "healthengine.txt")
    airesumesite_path = os.path.join(base_dir, "data", "Ai_resume_rag.txt")

    corpus_data = []

    if os.path.exists(resume_path):
        with open(resume_path, "r") as f:
            content_r = f.read()
            corpus_data.append({"source": "resume", 
                        "content": content_r})
    if os.path.exists(trusic_path):
        with open(trusic_path, "r") as f:
            content_t = f.read()
            corpus_data.append({"source": "trusic", 
                        "content": content_t})
            
    if os.path.exists(healthengine_path):
        with open(healthengine_path, "r") as f:
            content_e = f.read()
            corpus_data.append({"source": "Health Engine", 
                        "content": content_e})
            
    if os.path.exists(airesumesite_path):
        with open(airesumesite_path, "r") as f:
            content_a = f.read()
            corpus_data.append({"source": "Ai Resume Site", 
                        "content": content_a})

    return corpus_data