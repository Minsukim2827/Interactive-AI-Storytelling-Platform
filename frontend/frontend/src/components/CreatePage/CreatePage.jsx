import React, { useState, useEffect } from 'react';
import StoryGenerator from './StoryGenerator';
import { useAuth } from './../AuthProvider';

function CreatePage() {
  const { user } = useAuth();
  const [pages, setPages] = useState([]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  const handleUpdate = (pageKey, text, image) => {
    const updatedPages = pages.map((page, index) => {
      if (index === currentFormIndex) {
        return { key: pageKey, text, image };
      }
      return page;
    });
    setPages(updatedPages);
  };

  const navigateToForm = (index) => {
    setCurrentFormIndex(index);
  };

  useEffect(() => {
    if (!user) {
      console.log("Redirecting because user is not logged in");
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      {user ? (
        <div className="w-11/12 max-w-screen-lg flex flex-col items-center">
          <p className="text-center">Page {currentFormIndex + 1} of {pages.length}</p>
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
          <div className='w-full flex flex-wrap justify-center'>
            <StoryGenerator 
              onUpdate={handleUpdate} 
              initialContent={pages[currentFormIndex]}
            />
          </div>
        </div>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}

export default CreatePage;
