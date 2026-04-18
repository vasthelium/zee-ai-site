import re

def chunking(corpus_data):
    chunked_data = []

    for item in corpus_data:
        source = item["source"]
        content = item["content"]
        paragraphs = re.split(r"\n{2,}", content)
            
        for para in paragraphs:
            clean_para = para.strip()
            if clean_para == "":
                    continue
                 
            chunked_data.append({
                "source": source,
                "content": clean_para
            })

    return chunked_data

"""
if __name__ == "__main__":
    from app.rag.loader import load_data

    corpus_data = load_data()
    chunked_data = chunking(corpus_data)

    print(len(chunked_data))
"""







