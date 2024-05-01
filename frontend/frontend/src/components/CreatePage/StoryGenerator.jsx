import React, { useState, useEffect } from 'react';
import axios from './../axios';
import { Image } from 'lucide-react';

function StoryGenerator({ onUpdate, initialContent }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [storyPages, setStoryPages] = useState({
    'cover page': initialContent || { text: '', image: '' },
    'introduction page': { text: '', image: '' },
    'second page': { text: '', image: '' },
    'third page': { text: '', image: '' },
    'fourth page': { text: '', image: '' },
    'last page': { text: '', image: '' }
  });
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const prompts = {
    'cover page': 'page 1/6: front cover: cover page of the story',
    'introduction page': 'page 2/6: Introduction of Main Character and Setting',
    'second page': 'page 3/6: Inciting Incident',
    'third page': 'page 4/6: Rising Action/Challenge',
    'fourth page': 'page 5/6: Climax',
    'last page': 'page 6/6: Resolution and Ending'
  };

  useEffect(() => {
    if (initialContent) {
      setStoryPages(prev => ({
        ...prev,
        [Object.keys(prompts)[currentPage]]: initialContent
      }));
    }
  }, [initialContent, currentPage]);

  const handleGeneratePage = async () => {
    setLoading(true);
    await generatePageContent(currentPage, userInput);
    setLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < Object.keys(prompts).length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const generatePageContent = async (pageIndex, userInput) => {
    const pageKeys = Object.keys(prompts);
    const previousText = pageIndex > 0 ? storyPages[pageKeys[pageIndex - 1]].text : '';
    const prompt = `${prompts[pageKeys[pageIndex]]} The previous page's text was: ${previousText} Current prompt: ${userInput}`;
    try {
      const response = await axios.post('/generate-story', { prompt });
      setStoryPages(prev => ({
        ...prev,
        [pageKeys[pageIndex]]: { text: response.data.text, image: response.data.image }
      }));
      onUpdate(pageKeys[pageIndex], response.data.text, response.data.image);
    } catch (error) {
      console.error('Error generating story page:', error);
    }
  };

  const isContentReady = () => {
    const page = storyPages[Object.keys(prompts)[currentPage]];
    return page.image && (currentPage === 0 || page.text);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-xl font-bold">{Object.keys(prompts)[currentPage]}</h1>
      <div className="flex flex-col items-center border-2 border-blue-500 max-w-xs w-full p-4">
        <p className='mb-4'>{storyPages[Object.keys(prompts)[currentPage]].text}</p>
        {storyPages[Object.keys(prompts)[currentPage]].image ? (
          <img src={storyPages[Object.keys(prompts)[currentPage]].image} alt="Story Image" className="max-w-full h-auto" />
        ) : (
          <Image /> // Adjust size and other props as needed
        )}
      </div> 
      <input
        type="text"
        placeholder="Enter your input for the next page"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="mt-2 border rounded p-2"
      />
      <button
        onClick={handleGeneratePage}
        disabled={loading || userInput.trim() === ''}
        className="border hover:bg-gray-100 rounded px-4 py-2"
      >
        Generate Page
      </button>
      {isContentReady() && (
        <button
          onClick={handleNextPage}
          disabled={loading}
          className="border hover:bg-gray-100 rounded px-4 py-2"
        >
          Next Page
        </button>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default StoryGenerator;
