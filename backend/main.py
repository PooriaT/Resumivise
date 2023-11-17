import os
import json
from utils.docReader import read_docx, write_docx
from utils.pdfReader import read_pdf
from api.gptApi import GptApi
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow all origins in development. Adjust as needed for production.
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def reading_data():
    file_path = './static/resume/resume.docx'
    file_extension = os.path.splitext(file_path)[1].lower()

    if file_extension == '.pdf':
        data = json.loads(read_pdf(file_path))
    elif file_extension == '.docx':
        data = json.loads(read_docx(file_path))
    else:
        raise('File type not supported')
    return data


@app.get("/upload_resume")
async def upload_resume():
    print("UPLOAD")
    data = reading_data()
    gptClinet = GptApi()
    extracted_resume_data = gptClinet.extract_info_from_resume(data['text'])

    print("EXTRACTING is finished")
    
    try:
        extracted_resume_data = json.loads(extracted_resume_data)

        # Write JSON data to a text file
        with open('./static/resume/extracted_resume.json', 'w') as file:
            json.dump(extracted_resume_data, file)

        print('JSON data has been successfully written to extracted_resume.json.')

    except json.JSONDecodeError as e:
        print(f'Error decoding JSON: {e}')
    except Exception as e:
        print(f'Error: {e}')

    return {'text': 'successfully uploaded'}

@app.get("/compare_resume")
async def compare_resume():
    print("COMPARE")  
    gptClinet = GptApi()

    with open('./static/resume/extracted_resume.json') as file:
        extracted_resume_data = file.read()

    with open('./static/resume/job_description.txt') as file:
        job_description_data = file.read()

    compared_data_stream = gptClinet.compare_resume_with_job_description(
        extracted_resume_data, 
        job_description_data
        )

    # return StreamingResponse(compared_data_stream,
    #                            media_type='text/event-stream') # This for Streaming
    return json.dumps(compared_data_stream)



@app.get("/revise_resume")
async def revise_resume():
    print("REVISE") 
    gptClinet = GptApi()

    with open('./static/resume/extracted_resume.json') as file:
        extracted_resume_data = file.read()

    with open('./static/resume/job_description.txt') as file:
        job_description_data = file.read()

    tailored_resume_data_stream = gptClinet.align_resume_info_with_job_description(
        extracted_resume_data, 
        job_description_data
        )
    
    # return StreamingResponse(tailored_resume_data_stream,
    #                            media_type='text/event-stream') # This for Streaming
    return json.dumps(tailored_resume_data_stream)

    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)