import React, { useState, useEffect } from 'react';
import StoryGenerator from './StoryGenerator';
import { useAuth } from './../AuthProvider'; // Import useAuth to access user context
import PageDisplay from './PageDisplay';
import Navigation from './Navigation';

function CreatePage() {
  const { user } = useAuth(); // Use the useAuth hook
  const [pages, setPages] = useState([]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  // Handle updates from StoryGenerator
  const handleUpdate = (pageKey, text, image) => {
    const newPage = { key: pageKey, text: text, image: image };
    setPages(oldPages => [...oldPages, newPage]);
    setCurrentFormIndex(pages.length); // Navigate to the latest page
  };

  const totalPages = pages.length; // Total number of pages

  const navigateToForm = (index) => { // Navigate to the form at the specified index
    setCurrentFormIndex(index);
  };

  // Optionally redirect if not logged in
  useEffect(() => {
    if (!user) {
      // Assuming you have a routing mechanism or you want to push to a login route
      console.log("Redirecting because user is not logged in");
      // Redirect to login or perform other appropriate action
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      {user ? ( // Check if the user is logged in
        <div className="w-11/12 max-w-screen-lg flex flex-col items-center">
          <Navigation totalPages={totalPages} currentFormIndex={currentFormIndex} />
          <PageDisplay pages={pages} navigateToForm={navigateToForm} />
          <div className='w-full flex flex-wrap justify-center'>
            <StoryGenerator onUpdate={handleUpdate} />
          </div>
        </div>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}

export default CreatePage;