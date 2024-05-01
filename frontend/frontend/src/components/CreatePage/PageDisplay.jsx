// PageDisplay.jsx
import React from 'react';

const PageDisplay = ({ pages, navigateToForm }) => (
  <div className='w-full flex flex-wrap justify-center'>
    {pages.map((page, index) => (
      <div key={index} className="relative m-1 border border-black">
        <img
          src={page.image}
          alt={`Generated Image ${index + 1}`}
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigateToForm(index)}
        />
      </div>
    ))}
  </div>
);

export default PageDisplay;

