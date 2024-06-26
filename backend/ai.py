# from transformers import pipeline
from io import BytesIO
import requests
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key= os.getenv("OPENAI_KEY"))


def upload_to_imgur(image_url):
    headers = {
        "Authorization": f"Client-ID {os.getenv('IMGUR_CLIENT_ID')}"
    }
    data = {
        'image': image_url,
        'type': 'URL'
    }
    response = requests.post("https://api.imgur.com/3/image", headers=headers, data=data)
    if response.status_code == 200:
        print(response.json())
        return response.json()['data']['link']
    else:
        return None


# Return generated image and text 
def generate_story(prompt, art_style):
    if not prompt:
        return {'error': 'Prompt is required'}, 400
    try:
        text_result = generate_text(prompt)
        image_result = generate_image(text_result, art_style)
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
def generate_image(prompt, art_style):
    try:
        if prompt is None:
            print("Failed to generate text")
            return None    
            
        response = client.images.generate(
            model="dall-e-2",
            prompt=f"{art_style}, friendly {prompt}",
            size="256x256",
            quality="standard",
            n=1,
        )
        print("image generation successful")
        image_url = response.data[0].url
        # Upload the image to Imgur
        imgur_url = upload_to_imgur(image_url)
        if imgur_url is None:
            print("Failed to upload to Imgur")
            return None
        return imgur_url
    except Exception as e:
        print(f"an error occured: {e}")
        return None

# Generate text-to-speech audio stream
def tts_generate(prompt):
    try:
        if prompt is None: # Check if the prompt is empty
            print("Failed to generate tts")
            return None
        
        print("Attempting to generate tts")

        response = client.audio.speech.create( # Generate the audio stream
            model="tts-1",
            voice="shimmer",
            input = f"{prompt}"
        )

        print("tts generation successful")

        audio_stream = BytesIO(response.content) # Convert the audio to a stream
        return audio_stream 
    except Exception as e:
        print(f"an error occured: {e}")
        return None