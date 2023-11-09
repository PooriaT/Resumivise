from PyPDF2 import PdfReader
import json


def read_pdf(file):
    reader = PdfReader(file)
    #number_of_pages = len(reader.pages)
    page = reader.pages[0]
    text = page.extract_text()
    return json.dumps({'text': text})


if __name__ == '__main__':
    #print(read_pdf('./resume/resume.pdf'))
    pass