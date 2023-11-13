import requests
import json

url = "http://localhost:8000/revise"

with requests.get(url, stream=True) as r:
    for chunk in r.iter_content(None, decode_unicode=True):
        if chunk:
            print(chunk, end='', flush=True)