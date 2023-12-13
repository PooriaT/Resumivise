import json
import uvicorn
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from core.utils.process.process_action import process_upload_resume, process_upload_job_description, process_compare, process_revise
# uvicorn.run('main:app', host="0.0.0.0", port=8000, workers=4)

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

@app.post("/api/upload_resume")
def upload_resume(resume: UploadFile = File(...), client_id: str = Form(...)):
    try:
        result = process_upload_resume(resume.filename, resume.file, client_id)
        return json.dumps({'text': result})
    except Exception as e:
        return json.dumps({'text': f"An error occurred: {str(e)}"})


@app.post("/api/upload_job_description")
def upload_job_description(data: dict):
    client_id=data.get('client_id', '')
    job_description = data['text']
    result = process_upload_job_description(job_description, client_id)
    return {"message": result}

@app.get("/api/compare_resume")
def compare_resume(client_id: str = Query(...)):
    compared_data_stream = process_compare(client_id)
    return StreamingResponse(compared_data_stream,
                               media_type='text/event-stream') # This for Streaming
    # return json.dumps(compared_data_stream)

@app.get("/api/revise_resume")
def revise_resume(client_id: str = Query(...)):
    tailored_resume_data_stream = process_revise(client_id)
    return StreamingResponse(tailored_resume_data_stream,
                               media_type='text/event-stream') # This for Streaming
    # return json.dumps(tailored_resume_data_stream)
