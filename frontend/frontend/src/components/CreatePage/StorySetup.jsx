import React, { useState } from 'react';

function StorySetup({ onSubmit }) {

  const [selectedGenre, setGenre] = useState('');
  const [artStyle, setArtStyle] = useState('');
  const [numPages, setNumPages] = useState('');

  const genres = ["Fantasy", "Sci-Fi", "Romance", "Mystery", "Adventure", "Comedy"]
  const artStyles = ["Anime", "Cartoon", "Realistic", "Pixel", "Abstract", "Surreal"]


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGenre || !artStyle) {
      alert('Please select a genre and art style');
      return;
    }
    onSubmit(selectedGenre, artStyle, numPages);
  }

  return (
    <div className="text-center mt-24 font-bold">
      <h1 className="text-2xl">Setup your story!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="mb-2 mt-10 text-xl">Select Genre</h2>

          {genres.map((genre) => (
            <button
              type="button"
              key={genre}
              onClick={(e) => {
                e.preventDefault();
                setGenre(genre);
              }}
              className={`mr-2 mb-2 px-3 py-2 rounded ${selectedGenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="mb-2 mt-10 text-xl">Select Art Style</h2>
          {artStyles.map((style) => (
            <button
              type="button"
              key={style}
              onClick={(e) => {
                e.preventDefault();
                setArtStyle(style);
              }}
              className={`mr-2 mb-2 px-3 py-2 rounded ${artStyle === style ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
            >
              {style}
            </button>
          ))}

          <div className="mt-10">
            <button type="submit" className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white transition-colors">Submit</button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default StorySetup;
