import app.services.db_repository as dbrepo
from app.rag.embeddings import embed

def sendembeddings_db():
    paired = embed()
    conn = dbrepo.pgconnect()
    try:
        dbrepo.init_db(conn)
        dbrepo.create_text_embeddings_table(conn)
        for items in paired:
            dbrepo.insert_text_embeddings(conn, items)
        conn.commit()
        print(f"Inserted {len(paired)} records")
    finally:
        dbrepo.connection_pool.putconn(conn)
    

def read_embeddingdata():
    conn = dbrepo.pgconnect()
    try:
        embedding_data = dbrepo.read_stored_embeddingsdata(conn)
    finally:
        dbrepo.connection_pool.putconn(conn)
    return embedding_data


if __name__ == "__main__":
    sendembeddings_db()


