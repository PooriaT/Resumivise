import os
import json
from core.utils.services.docReader import read_docx, write_docx
from core.utils.services.pdfReader import read_pdf

def reading_data(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    if file_extension == '.pdf':
        data = json.loads(read_pdf(file_path))
    elif file_extension == '.docx':
        data = json.loads(read_docx(file_path))
    else:
        data = json.loads('File type not supported')
    return data


def writing_data(file_path, data):
    for chunk in data.iter_content(None, decode_unicode=True):
        if chunk:
            text += f"{chunk} "
    json_data = json.dumps(text)
    write_docx(file_path, json_data)
