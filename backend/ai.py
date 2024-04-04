from transformers import pipeline

# Initialize the text generation pipeline
text_generator = pipeline('text-generation', model='gpt2')

def generate_text(prompt, max_length=50):
    generated_text = text_generator(prompt, max_length=max_length)[0]['generated_text']
    return generated_text
