# from transformers import pipeline
import requests
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key= os.getenv("OPENAI_KEY"))

# Return generated image and text 
def generate_story(data):
    prompt = data['prompt']
    if not prompt:
        return {'error': 'Prompt is required'}, 400
    try:
        text_result = generate_text(prompt)
        image_result = generate_image(text_result)
        return {'text': text_result, 'image': image_result}
    except Exception as e:
        return {'error': str(e)}, 500

# Generate text based on the prompt
def generate_text(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"Generate a 10-word intro for a kids' book about {prompt}."},
            ],
        )
        print("text generation successful")
        return response.choices[0].message.content
    except Exception as e:
        print(f"an error occured: {e}")
        return None

# Generate an image based on the text
def generate_image(prompt):
    try:
        if prompt is None:
            print("Failed to generate text")
            return None    
            
        response = client.images.generate(
            model="dall-e-2",
            prompt=f"cartoony, friendly {prompt}",
            size="256x256",
            quality="standard",
            n=1,
        )
        print("image generation successful")
        return response.data[0].url
    except Exception as e:
        print(f"an error occured: {e}")
        return None
