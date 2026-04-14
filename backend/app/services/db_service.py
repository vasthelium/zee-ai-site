from app.services.db_repository import (pgconnect, init_db, create_text_embeddings_table, insert_text_embeddings, 
connection_pool, read_stored_embeddingsdata)
from app.rag.embeddings import embed

def sendembeddings_db():
    paired = embed()
    conn = pgconnect()
    try:
        init_db(conn)
        create_text_embeddings_table(conn)
        for items in paired:
            insert_text_embeddings(conn, items)
        conn.commit()
        print(f"Inserted {len(paired)} records")
    finally:
        connection_pool.putconn(conn)
    

def read_embeddingdata():
    conn = pgconnect()
    try:
        embedding_data = read_stored_embeddingsdata(conn)
    finally:
        connection_pool.putconn(conn)
    return embedding_data

if __name__ == "__main__":
    sendembeddings_db()


