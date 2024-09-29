# # script.py
# import sys

# def main(arg):
#     print(f"Received argument: {arg}")

# if __name__ == "__main__":
#     if len(sys.argv) > 1:
#         main(sys.argv[1])
#     else:
#         print("No argument provided.")
import PyPDF2
import json
import os
import docx
import pytesseract
from PIL import Image
import cv2
import os
from hercai import Hercai
import requests
import urllib.parse  # Importing urllib to handle URL encoding
import sys
sys.stdout.reconfigure(encoding='utf-8')


typeCv = """{
    name?: string | null;
    age?: string | null;
    email?: string | null;
    phone?: string | null;
    work_experience?:
        | {
            work_role?: string | null;
            work_period?: string | null;
            work_responsabilites?: string | null;
        }[]
        | null;
    education?:
        | {
            education_institution?: string | null;
            education_period?: string | null;
        }[]
        | null;
    languages?:
        | {
            language_name?: string | null;
            language_level?: string | null;
        }[]
        | null;
    skills?: string | null;
}"""

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    scale_factor = 4.0       # Asta influenteaza mult textul schimbarea de la 4 la 5 and more
    new_width = int(grayscale_image.shape[1] * scale_factor)
    new_height = int(grayscale_image.shape[0] * scale_factor)
    resized_image = cv2.resize(grayscale_image, (new_width, new_height), interpolation=cv2.INTER_LINEAR)

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    contrast_enhanced_image = clahe.apply(resized_image)

    denoised_image = cv2.medianBlur(contrast_enhanced_image, 3)
    _, binary_image = cv2.threshold(denoised_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    return binary_image

def convertImage(file_path):
    processed_image = preprocess_image(file_path)
    temp_filename = "result.jpg"
    cv2.imwrite(temp_filename, processed_image)
    pil_image = Image.open(temp_filename)
    custom_config = r'--oem 3 --psm 4'
    extracted_text = pytesseract.image_to_string(pil_image, lang='ron', config=custom_config)
    os.remove(temp_filename)
    return extracted_text

def readFile(file_path):
    # file_path = os.path.abspath(file_path)
    
    file_extension = os.path.splitext(file_path)[1]
    file_extension = str(file_extension.lower()).replace('"','')

    if file_extension == '.pdf':
        with open(file_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            pdf_text: str = ""
            for page_number in range(len(reader.pages)):
                page = reader.pages[page_number]
                pdf_text += page.extract_text()
        return pdf_text
    
    if file_extension == '.docx':
        doc = docx.Document(file_path)
        doc_text: str = ""
        for t in doc.paragraphs:
            doc_text += t.text
        return doc_text

    if file_extension == '.doc':
        return {}
    
    if file_extension == '.jpg' or file_extension == '.png':
        return convertImage(file_path)

    raise ValueError(f"Unsupported file format: {file_extension}")




# def textToJSON(text: str):
#     herc = Hercai()
#     __ = f'Please generate a json object based on this Typescript type {type} using this input data: {text}'
#     res_question = herc.question(model='v3', content=__)
#     return json.dump(res_question['reply'])

#this is __main__
def llm_set_txt_to_json(cv_promt):
    # Define the base URL and the variable content
    base_url = "https://hercai.onrender.com/turbo/hercai"
    # Updated parameters to ensure the response contains specific keys
    parameters = (
        'Please return a JSON object with the following keys: '
        f'{typeCv}'
        'If any value is not found in the CV, '
        'set it to null. value, please return only json format'
    )
    # URL-encode the parameters and question
    encoded_parameters = urllib.parse.quote(parameters)
    encoded_question = urllib.parse.quote(cv_promt)

    # Send a GET request with the query parameter 'parameters' and 'question'
    response = requests.get(f"{base_url}?&question={str(cv_promt) + parameters}")

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        reply = data.get('reply')
        # Print the response content
        return reply
    else:
         return response.status_code

print(llm_set_txt_to_json(readFile(sys.argv[1])))

