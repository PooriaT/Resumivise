import os 
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI

load_dotenv(find_dotenv())
openaiApiKey = os.getenv("OPENAI_API_KEY")

class GptApi:
    def __init__(self):
        self.client = OpenAI(api_key=openaiApiKey)

    
    def extract_info_from_resume(self,resume_data):
        response =  self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "As a professional Software Developer, provide an outstanding resume.",
                },
                {
                    "role": "user",
                    "content": f"""I need you to analyze the provided resume data and extract specific details, including name, phone number, location,
                        email, GitHub link, LinkedIn link, summary, skills, education, and work experience. Please return the output in JSON format.
                        I only require the JSON output without additional text. The resume content is as follows:\n\n{resume_data}"""
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
                    "content": "You are a professional Software Developer with expertise in creating outstanding resumes. \
                        Additionally, you are a hiring manager familiar with resume formats and job descriptions.",
                },
                {
                    "role": "user",
                    "content": f"""I've extracted all the information from the resume and provided it in JSON format for your review.
                        Additionally, I've supplied a job description. Your task is to thoroughly compare the resume with the job description,
                        estimating the percentage of alignment and identifying any flaws in the resume that need correction.
            
                        \n\n The resume information is as follows in JSON format:\n\n {extracted_resume_data}.\n\n 
                        You can find the job description here:\n\n {job_description_data}"""
                }
            ],
            model="gpt-3.5-turbo-16k",
            #stream=True, # Enable streaming. PAY ATTENTION TO THE RETURN VALUE
        )

        # for chunk in response:
        #     current_content = chunk.choices[0].delta.content or ""
        #     yield str(current_content)
        return response.choices[0].message.content

    def align_resume_info_with_job_description(self, extracted_resume_data, job_description_data):
        response =  self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional Software Developer and a hiring manager familiar with resume formats and job descriptions.",
                },
                {
                    "role": "user",
                    "content": f"""I've provided you with all the information from the resume in JSON format, including the job description.
                        I'd like you to carefully tailor the resume based on the job description, covering all sections like summary, 
                        skills, professional experience, projects, and certifications. Change and revise work experience bullet points 
                        based on the job description.
                        Maintain the same resume structure as the original one. I mean same structure not the same content. 
                        Here is the updated JSON format of the revised resume:\n\n {extracted_resume_data}. \n\n 
                        You can find the job description here: \n\n {job_description_data} \n\n 
                        The output must be exclusively in JSON format, providing the complete revised resume."""
                }
            ],
            model="gpt-3.5-turbo-16k",
            #stream=True, # Enable streaming. PAY ATTENTION TO THE RETURN VALUE
        )
      
        # for chunk in response:
        #     current_content = chunk.choices[0].delta.content or ""
        #     yield str(current_content)
        return response.choices[0].message.content