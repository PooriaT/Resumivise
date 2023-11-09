from docx import Document
import json

def read_docx(file):
    doc = Document(file)
    section = doc.sections[0]
    header = [hr.text.strip() for hr in section.header.paragraphs if hr.text.strip()] 
    text = [para.text.strip() for para in doc.paragraphs if para.text.strip()]

    data = json.dumps({'header': header, 'text': text})
    return data
    

if __name__ == '__main__':
    #print(read_docx('./resume/resume.docx'))   
    pass