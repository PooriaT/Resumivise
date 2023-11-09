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

    
    def extractInfoFromResume(self,resume_data):
        response =  self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional Software Developer who can provide a outstanding resume.",
                },
                {
                    "role": "user",
                    "content": "I need you to go through the data and extract all the infromation including name, phone number, location \
                    , email, github link, linkedin link, Summary, skills, education, and work experience. Return the output in the JSON \
                    format. I only need the JSON no more text has to be provided. The resume content is as follows \n\n" + resume_data
                }
            ],
            model="gpt-3.5-turbo-16k",
        )
      
        return response.choices[0].message.content
    
    def compareResumeWithJobDescription(self, extracted_resume_data, job_description_data):
        pass

    def alignResumeInfoWithJobDescription(self):
        pass


if __name__ == "__main__":
    pass