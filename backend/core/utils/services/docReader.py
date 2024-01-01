from docx import Document
import json
import re

def read_docx(file):
    doc = Document(file)
    section = doc.sections[0]
    header = [hr.text.strip() for hr in section.header.paragraphs if hr.text.strip()] 
    text = [para.text.strip() for para in doc.paragraphs if para.text.strip()]

    data = json.dumps({'text': '\n'.join(header + text)})
    return data
 
def write_docx(filename, data):
    doc = Document()
    section = doc.sections[0]
    header = section.header

    header_text = ""
    for heading, text in data.items():
        if heading in ['name', 'phone_number', 'location', 'email'] or re.match(r'.*link', heading):
            header_text += f"{text} |"
        else:
            doc.add_heading(heading, level=1)
            if isinstance(text, list):
                text = text[0]
            if isinstance(text, dict):
                for key, value in text.items():
                    doc.add_paragraph(f"{key}: {value}")
            else:
                doc.add_paragraph(str(text))
            doc.add_paragraph()

    header.paragraphs[0].text = header_text
    doc.save(filename)


# if __name__ == '__main__':
#     file_name = 'test.docx'
#     json_filename = "../../../static/extracted_resume.json"
#     with open(json_filename, 'r', encoding='utf-8') as f:
#         json_data = json.loads(f.read())
#     write_docx(file_name, json_data)
