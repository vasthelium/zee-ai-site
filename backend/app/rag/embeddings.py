from app.rag.loader import load_data
from app.rag.chunker import chunking
from openai import OpenAI
from app.services.configs import CONFIG_CACHE

"""
approach 1 tested works : 

def embed():
    corpus_data = load_data()
    chunked_data = chunking(corpus_data)

    send_open_ai = chunked_data[0]["content"]
    
    client = OpenAI()
    embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=send_open_ai
    )

    print(len(embedding.data[0].embedding))

"""

"""approach 2 """
def embed():
    corpus_data = load_data()
    chunked_data = chunking(corpus_data)

    text_to_embed = []

    for items in chunked_data:
        text_to_embed.append(items["content"]
        )
    
    client = OpenAI(api_key=CONFIG_CACHE["OPENAI_API_KEY"])
    embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=text_to_embed
    )
    #used to test
    print(len(chunked_data))
    print(len(embedding.data))
    print(len(embedding.data[0].embedding))
    paired = []

    for i in range(len(embedding.data)):
        item = chunked_data[i]
        pairdict = {
            "source":item["source"],
            "content":item["content"],
            "embedding":embedding.data[i].embedding
        }

        paired.append(pairdict)
    return paired


"""
DID THIS FIRST FOR SEPERATE LEARNING NOW MERGED.
def pair_text_embedding(chunked_data, embedding):

    paired = []

    for i in range(len(embedding.data)):
        item = chunked_data[i]
        pairdict = {
            "source":item["source"],
            "content":item["content"],
            "embedding":embedding.data[i].embedding
        }

        paired.append(pairdict)
    return paired
"""

if __name__ == "__main__":
    embed()



