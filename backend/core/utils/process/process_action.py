import os
import json
from core.api.gptApi import GptApi
from core.utils.services.reading_file import reading_data


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

def process_upload_resume(filename, file_content, client_id):
    file_extension = get_file_extension(filename).lower()
    if file_extension in ['docx', 'pdf']:
        file_name = name_generator('uploaded_resume',client_id)
        with open(f"./static/resume/{file_name}.{file_extension}", 'wb') as f:
            f.write(file_content.read())
        data = reading_data(f"./static/resume/{file_name}.{file_extension}")
        gptClient = get_client()
        extracted_resume_data = gptClient.extract_info_from_resume(data['text'])

        try:
            extracted_resume_data = json.loads(extracted_resume_data)
            extracted_resume_filename = name_generator('extracted_resume',client_id)
            with open(f"./static/resume/{extracted_resume_filename}.json", 'w') as file:
                json.dump(extracted_resume_data, file)
            os.remove(f"./static/resume/{file_name}.{file_extension}")
            return 'successfully uploaded'
        except Exception as e:
            return f'Error: {e}'
    else:
        return 'Failed to upload'
    
def process_upload_job_description(job_description_data, client_id):
    try:
        job_description_filename = name_generator('job_description',client_id)
        with open(f"./static/resume/{job_description_filename}.txt", 'w') as file:
                file.write(job_description_data)
        return "Job description received successfully"
    except Exception as e:
        return f'Error: {e}'


def process_compare(client_id):
    gptClient = get_client()
    extracted_resume_filename = name_generator('extracted_resume',client_id)
    job_description_filename = name_generator('job_description',client_id)
    
    try: 
        with open(f"./static/resume/{extracted_resume_filename}.json") as file:
            extracted_resume_data = file.read()
        with open(f"./static/resume/{job_description_filename}.txt") as file:
                job_description_data = file.read()
        return gptClient.compare_resume_with_job_description(
            extracted_resume_data, 
            job_description_data
        )
    except FileNotFoundError:
        return "There is something wrong. It may be that you have not uploaded any resume or job description!!"


def process_revise(client_id):
    gptClient = get_client()
    extracted_resume_filename = name_generator('extracted_resume',client_id)
    job_description_filename = name_generator('job_description',client_id)
    
    try: 
        with open(f"./static/resume/{extracted_resume_filename}.json") as file:
            extracted_resume_data = file.read()
        with open(f"./static/resume/{job_description_filename}.txt") as file:
                job_description_data = file.read()
        return gptClient.align_resume_info_with_job_description(
            extracted_resume_data, 
            job_description_data
        )
    except FileNotFoundError:
        return "There is something wrong. It may be that you have not uploaded any resume or job description!!"
