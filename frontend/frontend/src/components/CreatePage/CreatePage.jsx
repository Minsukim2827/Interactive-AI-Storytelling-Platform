import React, { useState, useEffect } from 'react';
import StoryGenerator from './StoryGenerator';
import { useAuth } from './../AuthProvider';
import PageDisplay from './PageDisplay';
import Navigation from './Navigation';

function CreatePage() {
  const { user } = useAuth();
  const [pages, setPages] = useState([]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [maxViewedPageIndex, setMaxViewedPageIndex] = useState(0);

  const handleUpdate = (pageKey, text, image) => {
    setPages(oldPages => {
      const pageIndex = oldPages.findIndex(page => page.key === pageKey);
      if (pageIndex !== -1) {
        // Update existing page
        const updatedPages = [...oldPages];
        updatedPages[pageIndex] = { key: pageKey, text, image };
        return updatedPages;
      } else {
        // Add new page
        return [...oldPages, { key: pageKey, text, image }];
      }
    });
  };

  const navigateToForm = (index) => {
    console.log("Navigating to form index:", index); 
    setCurrentFormIndex(index);
    if (index > maxViewedPageIndex) {
      setMaxViewedPageIndex(index);
    }
  };
  const onNextPage = () => {
    const newIndex = currentFormIndex + 1;
    if (newIndex < pages.length) {
      setCurrentFormIndex(newIndex);
      if (newIndex > maxViewedPageIndex) {
        setMaxViewedPageIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    console.log("Current form index updated to:", currentFormIndex);
    console.log("Max viewed page index updated to:", maxViewedPageIndex);
  }, [currentFormIndex, maxViewedPageIndex]);

  useEffect(() => {
    if (!user) {
      console.log("Redirecting because user is not logged in");
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      {user ? (
        <div className="w-11/12 max-w-screen-lg flex flex-col items-center">
          <Navigation totalPages={maxViewedPageIndex + 1} currentFormIndex={currentFormIndex} />
          <PageDisplay pages={pages} navigateToForm={navigateToForm} />
          <StoryGenerator key={currentFormIndex} onUpdate={handleUpdate} currentPage={pages[currentFormIndex]} onNextPage={onNextPage} />


        </div>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}

export default CreatePage;
