import os

file_path = './resume/resume.docx'

file_extension = os.path.splitext(file_path)[1].lower()

if file_extension == '.pdf':
    print("It's a pdf")
elif file_extension == '.docx':
    print("It's a docx")
else:
    raise('File type not supported')