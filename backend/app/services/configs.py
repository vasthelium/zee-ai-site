from app.services.secrets import get_secret

CONFIG_CACHE = {}

def loadconfig_tomemory():
    global CONFIG_CACHE
    CONFIG_CACHE = get_secret()
    print("CONFIG_CACHE:", CONFIG_CACHE)
