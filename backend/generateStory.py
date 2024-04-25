import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key= os.getenv("OPENAI_KEY"))

story = ['Introduction of Main Character and Setting: Introduce the main character in their usual environment to set the stage.',
         'Inciting Incident: Show an event that disrupts the status quo, like finding a mysterious map or receiving a strange gift.',
         'Rising Action/Challenge: Depict the main character facing a challenge that complicates the story.',
         'Climax: Illustrate the peak of the story where the tension reaches its highest point.',
         'Resolution and Ending: Conclude with the aftermath of the climax, showing the main characters return to a new normal or reflecting on their journey.']

previous_prompt = ""

def generate_story(prompt):
    result = {
    0: {
        "text": "",
        "image": ""
    },
    1: {
        "text": "",
        "image": ""
    },
    2: {
        "text": "",
        "image": ""
    },
    3: {
        "text": "",
        "image": ""
    },
    4: {
        "text": "",
        "image": ""
    }
}
    for i in range(len(story)):
        if i == 0:
            first_prompt_text = f"{story[i]}. Generate the first text based on a prompt about a fun and colorful story involving {prompt}. After generating the first text, subsequent prompts will guide the creation of the remaining parts of the story."
            first_generated_text = generate_text(first_prompt_text)
            first_prompt_image = f"{story[i]} Generate the first image based on a story dialogue, which is {first_generated_text}. After generating the first image, subsequent prompts will guide the creation of the remaining parts of the story."
            first_generated_image = generate_image(first_prompt_image)
            result[i]["text"], result[i]["image"] = first_generated_text, first_generated_image
            previous_prompt = first_generated_text
        else:
            subsequent_prompt_text = f"{story[i]}. Generate the next text based on the previous text, which is {previous_prompt}."
            subsequent_generated_text = generate_text(subsequent_prompt_text)
            subsequent_prompt_image = f"{story[i]} Generate the next image based on the previous text, which is {subsequent_generated_text}."
            subsequent_generated_image = generate_image(subsequent_prompt_image)
            result[i]["text"], result[i]["image"] = subsequent_generated_text, subsequent_generated_image
            previous_prompt = subsequent_generated_text
    print("Story generation successful")
    print(result)
    return result

def generate_text(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"{prompt}"},],
        )
        print("text generation successful")
        return response.choices[0].message.content
    except Exception as e:
        print(f"an error occured: {e}")
        return None

def generate_image(prompt):
    try:
        if not prompt:
            print("Failed to generate text, cannot generate image without text prompt")
            return None    
            
        response = client.images.generate(
            model="dall-e-2",
            prompt=f"{prompt}",
            size="256x256",
            quality="standard",
            n=1,
        )
        print("image generation successful")
        return response.data[0].url
    except Exception as e:
        print(f"an error occured: {e}")
        return None