import os 
from dotenv import load_dotenv
from openai import OpenAI
from docReader import read_docx
import json
import asyncio

load_dotenv()
openaiApiKey = os.getenv("OPENAI_API_KEY")


class GptApi:
    def __init__(self):
        self.client = OpenAI(api_key=openaiApiKey)

    
    def extract_info_from_resume(self,resume_data):
        response =  self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional Software Developer who can provide a outstanding resume.",
                },
                {
                    "role": "user",
                    "content": f"""I need you to go through the data and extract all the infromation including name, phone number, location 
                    , email, github link, linkedin link, Summary, skills, education, and work experience. Return the output in the JSON 
                    format. I only need the JSON no more text has to be provided. The resume content is as follows \n\n {resume_data}"""
                }
            ],
            model="gpt-3.5-turbo-16k",
        )
      
        return response.choices[0].message.content
    
    def compare_resume_with_job_description(self, extracted_resume_data, job_description_data):
        response =  self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional Software Developer who can provide a outstanding resume. \
                        Also, you are hiring manger who are completely familiar with resume format and job description.",
                },
                {
                    "role": "user",
                    "content": f"""I extracted all information from the resume and provide it in JSON format for you.
                        In addition, I supply you with a job description. I need you go through all the information and 
                        compare the resume with the job description. Then, estimate the precentage of matching the resume 
                        with the job descritpion as well as point out all the flaws in the resume that needs to be corrected.
                        \n\n The resume infomration is as follows in JSON format: \n\n {extracted_resume_data}. \n\n 
                        You can find the job descirpiton here: \n\n {job_description_data}"""
                }
            ],
            model="gpt-3.5-turbo-16k",
        )
      
        return response.choices[0].message.content

    def align_resume_info_with_job_description(self, extracted_resume_data, job_description_data):
        response =  self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional Software Developer who can provide a outstanding resume. \
                        Also, you are hiring manger who are completely familiar with resume format and job description.",
                },
                {
                    "role": "user",
                    "content": f"""I provide you all information from the resume in JSON format for you. In addition, 
                        I supply you with a job description. I need you go through all the information and 
                        tailor the resume based on the Job description. Let's do it step by step. I want you to 
                        revise all parts of the resume including summary, skills, Professional experience, projects, 
                        education and certifications if applicable. Then only print out the JSON format of all new information 
                        for the resume. The format has to be same as what I provided for you in the extracted data from the 
                        main version of resume. I only need the JSON no more text has to be provided. \n\n The resume 
                        infomration is as follows in JSON format: \n\n {extracted_resume_data}. \n\n You can find 
                        the job descirpiton here: \n\n {job_description_data}"""
                }
            ],
            model="gpt-3.5-turbo-16k",
        )
      
        return response.choices[0].message.content


if __name__ == "__main__":
    pass