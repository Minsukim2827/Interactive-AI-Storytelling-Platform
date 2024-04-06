from transformers import pipeline
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
API_KEY = os.getenv("API_KEY")

# Initialize the text generation pipeline
text_generator = pipeline('text-generation', model='gpt2')
def generate_text(prompt, max_length=100):
    generated_text = text_generator(prompt, max_length=max_length)[0]['generated_text']
    return generated_text


#generate image function
def generate_image(payload):
    headers = {"Authorization": f"Bearer {API_KEY}"}
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.content
    except requests.RequestException as e:
        print(f"Error generating image: {e}")
        return None  # Return None or handle the error as needed
