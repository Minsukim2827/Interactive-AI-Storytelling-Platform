import React, { useState } from 'react';

function HomePage() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form submission here, such as sending the input value to the server
    console.log("Submitted value:", inputValue);
    setInputValue('');
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
          placeholder="Enter your information"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HomePage;