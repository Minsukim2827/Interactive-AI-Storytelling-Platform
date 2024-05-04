
import React from 'react';

const PageDisplay = ({ pages, navigateToForm }) => (
  <div className='w-full flex flex-wrap justify-center'>
    {/* Iterate through the pages array */}
    {pages.map((page, index) => (
      <div key={index} className="relative m-1 border border-black">
        {/* Display the generated image */}
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
