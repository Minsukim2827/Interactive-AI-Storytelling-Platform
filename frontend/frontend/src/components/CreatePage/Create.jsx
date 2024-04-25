import React, { useState } from 'react';
import './../../css/index.css'
import axios from './../axios';

function Create({ onUpdateForms }) {
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
    setInputValue('');

    try {
      const imageResponse = await axios.post('generate-image', { prompt: inputValue });
      const data = await imageResponse.data;
      console.log("data retrieved from backend", data);
      const imageUrl = URL.createObjectURL(new Blob([data]));
      setGeneratedImage(imageUrl);

      try {
        //send  post request to the backend ai to generate text
        const textResponse = await axios.post('generate-text', { prompt: inputValue });
        const textData = await textResponse.data;
        setGeneratedText(textData.generated_text);
        onUpdateForms(imageUrl, textData.generated_text, inputValue);
      } catch (textError) {
        console.error('Error generating text:', textError);
        setInputValue(''); //clears input field
      }
    } catch (imageError) {
      console.error('Error generating image:', imageError);
      setInputValue('');
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
    <div className="h-screen flex flex-col items-center">
      <h2 className="mt-4 mb-4">Storybook create</h2>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Prompt"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </div>
        </form>
      </div>
      {generatedImage && (
        <div className="w-full max-w-lg mb-4 mt-4">
          <img src={generatedImage} alt="Generated Image" className="w-full" />
        </div>
      )}
      {generatedText && (
        <p className="text-lg font-normal text-gray-800 mb-4">{generatedText}</p>
      )}
    </div>
  );
  

}


export default Create;