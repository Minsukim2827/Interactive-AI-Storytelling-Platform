import React, { useState, useEffect, useContext } from 'react';
import StoryGenerator from './StoryGenerator';
import { useAuth } from './../AuthProvider';
import PageDisplay from './PageDisplay';
import Navigation from './Navigation';
import SaveStory from './SaveStory';
import axios from './../axios';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const { user } = useAuth();
  const [pages, setPages] = useState([]);
  const [title, setTitle] = useState('');
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [maxViewedPageIndex, setMaxViewedPageIndex] = useState(0);
  const [saveStatus, setSaveStatus] = useState(null);
  const navigate = useNavigate();

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

  const handleSaveStory = () => {
    if (user) {
      const storyData = {
        title: title,
        pages: pages,
        userId: user.id,
      };
      console.log("attempting to send to backend");
      axios.post('/api/user/save-story', storyData)
        .then(response => {
          console.log("Story saved successfully:", response.data);
          setSaveStatus({ type: 'success', message: 'Story saved successfully! Navigationg to Home in 1.5s' });
          setTimeout(() => {
            navigate('/'); 
          }, 1500); 

        })
        .catch(error => {
          console.error("Error saving story:", error);
          setSaveStatus({ type: 'error', message: 'Failed to save story. Please try again.' });
        });
    } else {
      console.log("User not authenticated");
      setSaveStatus({ type: 'error', message: 'You must be logged in to save a story.' });
    }
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
          {currentFormIndex === 5 && <SaveStory title={title} setTitle={setTitle} onSave={handleSaveStory} />}
          {saveStatus && (
            <div className={`mt-4 text-center p-2 ${saveStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {saveStatus.message}
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}

export default CreatePage;
