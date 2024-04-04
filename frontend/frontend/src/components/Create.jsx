import React, { useState } from 'react';

function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
      setInputValue('');
    }
 };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission when pressing Enter in the input field
      handleSubmit(event);
    }
  };

  return (
    <div>
      <h2>Storybook create</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Prompt"
        />
        <button type="submit">Submit</button>
      </form>
      {generatedText && <p>Generated Text: {generatedText}</p>}
    </div>
  );
}

export default HomePage;