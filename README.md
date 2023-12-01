# Resumivise

This web app uses GPT technology to assist you in customizing your resume according to the job description you provide. It also gives you an overall idea of how well your resume aligns with the requirements of the job description.

## Overview

The project uses a tool called OpenAI's GPT API to prepare the resume. It takes out important information like the person's name, email, phone number, skills, and other details. After that, it checks this information with a job description you provide. This helps in adjusting and improving the resume to match the job requirements better.

## Installation
1. Clone the Resumivise repository: `git clone https://github.com/your-username/Resumivise.git`
2. Navigate to the project directory: `cd Resumivise`

### Backend
   1. Navigate to the backend directory: `cd backend`
   2. Create a virtual environment: `python -m venv venv`
   3. Activate the virtual environment:
      - For Windows: `venv\Scripts\activate.bat`
      - For Unix/Linux: `source venv/bin/activate`
   4. Install the required dependencies: `pip3 install -r requirements.txt`
   5. Run the main script: `python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4`


### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install the required packages: `npm install`
3. Run it in development mode: `npm run dev`
4. Visit `http://localhost:3000` URL in your browser

### Docker

Two Dockerfiles are available, one for backend the other in frontend directory. Run the below command to install the dependencies and run the project:

#### Backend

```
docker build -t resumivise_backend:latest .
docker run -p 8000:8000 resumivise_backend
```

#### Frontend

```
docker build -t resumivise_frontend:latest .
docker run -p 3000:3000 resumivise_frontend
```

## Usage


## Contributing
Contributions are welcome! 
Please refere to [CONTRIBUTING](CONTRIBUTING.md) document for more information. 


## License