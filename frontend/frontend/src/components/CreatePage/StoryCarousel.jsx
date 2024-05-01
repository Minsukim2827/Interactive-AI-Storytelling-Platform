import React from 'react';

function StoryCarousel({ storyPages }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-white z-50">
      <div className="carousel">
        {Object.keys(storyPages).map((pageKey, index) => (
          <div key={index} className="carousel-item">
            <h2>{pageKey}</h2>
            <p>{storyPages[pageKey].text}</p>
            <img src={storyPages[pageKey].image} alt={`Page ${index + 1}`} style={{ width: 'auto', height: '200%' }} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label>Give the storybook a name:</label>
        <input type="text" placeholder="Enter story name" className="border p-2" />
        <button className="ml-2 p-2 border">Save Story</button>
      </div>
    </div>
  );
}

export default StoryCarousel;