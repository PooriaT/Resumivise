import os
import json
from core.api.gptApi import GptApi
from core.utils.services.file_processor import reading_data, writing_data

STORAGE_FILE_PATH = './core/storage/files/resume/'
PUBLIC_FILE_PATH = './core/public/files/resume/'

class GptClientWrapper:
    def __init__(self):
        self.client = GptApi()

    def get_instance(self):
        return self.client

client_wrapper = GptClientWrapper()

def get_client():
    return client_wrapper.get_instance()

def name_generator(filename,client_id):
    return f"{filename}_{client_id}"

def get_file_extension(filename):
    return filename.split('.')[-1]

def read_file(file_name, file_type):
    with open(f"{STORAGE_FILE_PATH}{file_name}.{file_type}", encoding='utf-8') as file:
        return file.read()

def process_upload_resume(filename, file_content, client_id):
    file_extension = get_file_extension(filename).lower()
    os.makedirs(STORAGE_FILE_PATH, exist_ok=True)
    if file_extension in ['docx', 'pdf']:
        file_name = name_generator('uploaded_resume',client_id)
        with open(f"{STORAGE_FILE_PATH}{file_name}.{file_extension}", 'wb') as f:
            f.write(file_content.read())
        data = reading_data(f"{STORAGE_FILE_PATH}{file_name}.{file_extension}")
        gpt_client = get_client()
        extracted_resume_data = gpt_client.extract_info_from_resume(data['text'])

        try:
            extracted_resume_data = json.loads(extracted_resume_data)
            extracted_resume_filename = name_generator('extracted_resume',client_id)
            with open(f"{STORAGE_FILE_PATH}{extracted_resume_filename}.json", 'w', encoding='utf-8') as file:
                json.dump(extracted_resume_data, file)
            os.remove(f"{STORAGE_FILE_PATH}{file_name}.{file_extension}")
            return 'successfully uploaded'
        except json.JSONDecodeError as e:
            return f'Error decoding JSON: {e}'
    else:
        return 'Failed to upload'

def process_upload_job_description(job_description_data, client_id):
    os.makedirs(STORAGE_FILE_PATH, exist_ok=True)
    try:
        job_description_filename = name_generator('job_description',client_id)
        with open(f"{STORAGE_FILE_PATH}{job_description_filename}.txt", 'w', encoding='utf-8') as file:
            file.write(job_description_data)
        return "Job description received successfully"
    except Exception as e:
        return f'Error: {e}'

def process_compare(client_id):
    gpt_client = get_client()
    extracted_resume_filename = name_generator('extracted_resume',client_id)
    job_description_filename = name_generator('job_description',client_id)

    try:
        extracted_resume_data = read_file(extracted_resume_filename, 'json')
        job_description_data = read_file(job_description_filename, 'txt')
        return gpt_client.compare_resume_with_job_description(
            extracted_resume_data,
            job_description_data
        )
    except FileNotFoundError:
        return iter("Something is wrong. Resume or job description not found!!")

def process_revise(client_id):
    gpt_client = get_client()
    extracted_resume_filename = name_generator('extracted_resume', client_id)
    job_description_filename = name_generator('job_description', client_id)

    try:
        extracted_resume_data = read_file(extracted_resume_filename, 'json')
        job_description_data = read_file(job_description_filename, 'txt')
        return gpt_client.align_resume_info_with_job_description(
            extracted_resume_data,
            job_description_data
        )
    except FileNotFoundError:
        return iter("Something is wrong. Resume or job description not found!!")

def process_download_resume(data, client_id):
    os.makedirs(PUBLIC_FILE_PATH, exist_ok=True)
    revised_resume_filename = name_generator('revised_resume',client_id)
    print(data)
    try:
        message = writing_data(f"{PUBLIC_FILE_PATH}{revised_resume_filename}.docx", data)
        return f"{PUBLIC_FILE_PATH}{revised_resume_filename}.docx", message
    except Exception as e:
        message = f'Error: {e}'
        return revised_resume_filename, message
