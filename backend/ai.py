# from transformers import pipeline
import requests
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key= os.getenv("OPENAI_KEY"))

def generate_openai_text(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"Generate a 10-word intro for a kids' book about {prompt}."},
                {"role": "system", "content": "You are a kids storybook generator bot who will receive a prompt and generate a 10-word intro for a kids' book based on the prompt provided."},
            ],
        )
        print("text generation successful")
        return response.choices[0].message.content
    except Exception as e:
        print(f"an error occured: {e}")
        return None
    
def generate(prompt):
    try:
        generated_text = generate_openai_text(prompt)

        if generated_text is None:
            print("Failed to generate text")
            return None    
            
        response = client.images.generate(
            model="dall-e-2",
            prompt=f"cartoony, friendly {generated_text}",
            size="256x256",
            quality="standard",
            n=1,
        )
        print("image generation successful")
        print(generated_text, response.data[0].url)
        return generated_text, response.data[0].url
    except Exception as e:
        print(f"an error occured: {e}")
        return None

# Initialize the text generation pipeline
# text_generator = pipeline('text-generation', model='gpt2')
# def generate_text(prompt, max_length=50):
#     #hard coded text prompt
#     child_friendly_prompt = f"Generate a 10-word intro for a kids' book about {prompt}."
#     generated_text = text_generator(child_friendly_prompt, max_length=50, truncation=True)[0]['generated_text']
#     print(f"Text generation successful: {generated_text}")

#     return generated_text


 #generate image function
# def generate_image(prompt):
#     headers = {"Authorization": f"Bearer {API_KEY}"}
#     # hard coded image prompt
#     payload = {
#         "prompt": f"cartoony, friendly {prompt}",      # Example parameter, adjust based on model requirements
#     }
#     try:
#         print("generating image")
#         response = requests.post(API_URL, headers=headers, json=payload)
#         with open("test_image.png", "wb") as f:
#             f.write(response.content)
#         print(f"image generation successful")
#         return response.content
#     except requests.RequestException as e:
#         print(f"Error generating image: {e}")
#         return None  # Return None or handle the error as needed
