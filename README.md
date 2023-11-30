# Resumivise

This web app uses GPT technology to assist you in customizing your resume according to the job description you provide. It also gives you an overall idea of how well your resume aligns with the requirements of the job description.

## Overview

The project uses a tool called OpenAI's GPT API to prepare the resume. It takes out important information like the person's name, email, phone number, skills, and other details. After that, it checks this information with a job description you provide. This helps in adjusting and improving the resume to match the job requirements better.

## Installation
1. Clone the Resumivise repository: `git clone https://github.com/your-username/Resumivise.git`
2. Navigate to the project directory: `cd Resumivise`

### Backend
The backend is built using FastAPI and resides in the `api` directory. If you check out `package.json`, it's responsible for running FastAPI. For Windows users, simply replace `. venv/bin/activate` with `venv\Scripts\activate.bat` in the `"fastapi-dev"` configuration. Note that, replace `package.json.backup` with `package.json` as it creates virtual environemt for the Python frist, then it will run `main.py`.

If you want to run FastAPI seperately, just do the below procedure:

   1. Create a virtual environment: `python -m venv venv`
   2. Activate the virtual environment:
      - For Windows: `venv\Scripts\activate.bat`
      - For Unix/Linux: `source venv/bin/activate`
   3. Install the required dependencies: `pip3 install -r requirements.txt`
   4. Run the main script: `python3 -m api.main`


### Frontend
1. Install the required packages: `npm install`
2. Run it in development mode: `npm run dev`
3. Visit `http://localhost:3000` URL in your browser

## Usage


## Contributing
Contributions are welcome! 
Please refere to [CONTRIBUTING](CONTRIBUTING.md) document for more information. 


## License