import os
import json
from docReader import read_docx
from gptApi import GptApi


def reading_data():
    file_path = './resume/resume.docx'
    file_extension = os.path.splitext(file_path)[1].lower()

    if file_extension == '.pdf':
        print("It's a pdf")
    elif file_extension == '.docx':
        data = json.loads(read_docx(file_path))
    else:
        raise('File type not supported')
    return data


if __name__ == '__main__':
    data = reading_data()   
    gptClinet = GptApi()
    extracted_resume_data = gptClinet.extractInfoFromResume(data['text'])
    print(extracted_resume_data)