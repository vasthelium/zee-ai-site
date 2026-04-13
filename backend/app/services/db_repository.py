import os 
import psycopg2
from psycopg2 import pool
from textwrap import dedent

dsn = os.getenv("DATABASE_URL")
if not dsn:
    raise ValueError("DB URL not set in this terminal")
connection_pool = pool.SimpleConnectionPool(1, 10, dsn)

def pgconnect():
    return connection_pool.getconn()

def init_db(conn):
    with conn.cursor() as cur:
        cur.execute(dedent("""
        CREATE EXTENSION IF NOT EXISTS vector
            """))
    #conn.commit()- not needed we do this service layer

def create_text_embeddings_table(conn):
    with conn.cursor() as cur:
        cur.execute(dedent("""
    CREATE TABLE IF NOT EXISTS text_embeddings 
        (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT now(),
        source TEXT,
        content TEXT,
        embedding vector(1536)
        )
            """))
    print("Table Ensured")
    #conn.commit()- not needed we do this service layer

def insert_text_embeddings(conn, record):
    with conn.cursor() as cur:
        cur.execute(dedent("""
            INSERT INTO text_embeddings 
        (
        source,
        content,
        embedding
        )
        VALUES (%s, %s, %s)
        RETURNING id;        
        """), (
            record["source"],
            record["content"],
            record["embedding"]
        ))
    #conn.commit()- not needed we do this service layer
        embedding_id = cur.fetchone()[0]
    return embedding_id

def read_stored_embeddingsdata(conn):
    with conn.cursor() as cur:
            cur.execute(dedent("""
            SELECT source, content, embedding
            FROM text_embeddings
            ORDER BY created_at DESC
        """
        ))
            row = cur.fetchall()
    if not row:
        return []
    embedding_list = []

    for r in row:
        source = r[0]
        content = r[1]
        embedding = r[2]

        embedding_list.append({
            "source": source,
            "content": content,
            "embedding": embedding
        })
    return embedding_list