import React, { useState } from 'react';

function StorySetup({ onSubmit }) { 

  const [genre, setGenre] = useState('');
  const [artStyle, setArtStyle] = useState('');
  const [numPages, setNumPages] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className="text-center mt-24 font-bold">
      <h1>Setup your story!</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StorySetup;
