import React, { useState } from 'react';

function Create() {
  //variables for input and generated text setting initial variables to empty
  const [inputValue, setInputValue] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);


  //function to handle change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  //function to handle submit event of generating image and text
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await response.blob(); // Get image blob
      console.log(data);
      setGeneratedImage(URL.createObjectURL(data)); // Set the generated image
      setInputValue('');
    } catch (error) {
      console.error('Error generating image:', error);
      setInputValue('');
    }
    try {
      //send  post request to the backend ai to generate text
      const response = await fetch('http://127.0.0.1:5000/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await response.json();
      setGeneratedText(data.generated_text);
      setInputValue('');
    } catch (error) {
      console.error('Error generating text:', error);
      setInputValue(''); //clears input field
    }
  };

  //function to handle key down event
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission when pressing Enter in the input field
      handleSubmit(event); //call handle submit function
    }
  };

  //jsx rendering
  return (
    <div>
      <h2>Storybook create</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange} //call handlechange function
          onKeyDown={handleKeyDown} //call handle key down function
          placeholder="Prompt"
        />
        <button type="submit">Submit</button>
      </form>
      {generatedImage && (
        <div className="flex justify-center">
          <img src={generatedImage} alt="Generated Image" className="max-w-lg h-auto" />
        </div>
      )} {/* Display the generated image */}
      {generatedText && <p className="text-lg font-normal text-gray-800"> {generatedText}</p> } {/* Display the generated text */}

    </div>
  );
}


export default Create;