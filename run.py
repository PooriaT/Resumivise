import os
import json
from docReader import read_docx, write_docx
from pdfReader import read_pdf
from gptApi import GptApi


def reading_data():
    file_path = './resume/resume.pdf'
    file_extension = os.path.splitext(file_path)[1].lower()

    if file_extension == '.pdf':
        data = json.loads(read_pdf(file_path))
    elif file_extension == '.docx':
        data = json.loads(read_docx(file_path))
    else:
        raise('File type not supported')
    return data


if __name__ == '__main__':
    data = reading_data()   
    gptClinet = GptApi()
    extracted_resume_data = gptClinet.extract_info_from_resume(data['text'])

    with open('./resume/job_description.txt') as file:
        job_description_data = file.read()
    
    compared_data = gptClinet.compare_resume_with_job_description(extracted_resume_data, job_description_data)
    print("****************************************************")
    print("Compared Data")
    print("****************************************************")
    print(compared_data)
    print("\n")
    tailored_resume_data = gptClinet.align_resume_info_with_job_description(extracted_resume_data, job_description_data)
    print("****************************************************")
    print("Tailored Resume")
    print("****************************************************")
    print(tailored_resume_data)