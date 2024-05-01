import React, { useReducer, useEffect } from 'react';
import axios from './../axios'; // Ensure this path is correct based on your project structure

// Define the initial state for the story generator
const initialState = {
  currentPage: 0,
  storyPages: {
    'cover page': { text: '', image: '' },
    'introduction page': { text: '', image: '' },
    'second page': { text: '', image: '' },
    'third page': { text: '', image: '' },
    'fourth page': { text: '', image: '' },
    'last page': { text: '', image: '' }
  },
  userInput: '',
  loading: false
};

// Reducer function to handle state transitions
function reducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE_CONTENT':
      const updatedStoryPages = {
        ...state.storyPages,
        [action.pageKey]: { text: action.text, image: action.image }
      };
      return {
        ...state,
        storyPages: updatedStoryPages
      };
    case 'SET_CURRENT_PAGE_FROM_PROP':
      return {
        ...state,
        currentPage: action.currentPage,
        storyPages: {
          ...state.storyPages,
          [action.pageKey]: { text: action.text, image: action.image }
        }
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case 'SET_USER_INPUT':
      return {
        ...state,
        userInput: action.input
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    default:
      return state;
  }
}


function StoryGenerator({ onUpdate, currentPage, onNextPage }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (currentPage) {
      dispatch({
        type: 'SET_CURRENT_PAGE_FROM_PROP',
        currentPage: Object.keys(initialState.storyPages).indexOf(currentPage.key),
        pageKey: currentPage.key,
        text: currentPage.text,
        image: currentPage.image
      });
    }
  }, [currentPage]);
  

  const handleGeneratePage = async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    const pageKeys = Object.keys(state.storyPages);
    const currentPageKey = pageKeys[state.currentPage];
    const prompt = `Generate content for: ${currentPageKey} with input: ${state.userInput}`;
    try {
      const response = await axios.post('/generate-story', { prompt });
      dispatch({
        type: 'SET_PAGE_CONTENT',
        pageKey: currentPageKey,
        text: response.data.text,
        image: response.data.image
      });
      onUpdate(currentPageKey, response.data.text, response.data.image);
    } catch (error) {
      console.error('Error generating story page:', error);
    }
    dispatch({ type: 'SET_LOADING', loading: false });
  };

  const handleNextPage = () => {
    if (state.currentPage < Object.keys(state.storyPages).length - 1) {
      dispatch({ type: 'NEXT_PAGE' });
      onNextPage();  
    }
  };

  const currentPageKey = Object.keys(state.storyPages)[state.currentPage];
  const currentPageData = state.storyPages[currentPageKey];

  return (
    <div className="flex flex-col items-center space-y-4">
    <h1 className="text-xl font-bold">{currentPageKey}</h1>
    <div className="flex flex-col items-center border-2 border-blue-500 max-w-xs w-full p-4">
      <p className='mb-4'>{currentPageData.text}</p>
      {currentPageData.image && (
        <img src={currentPageData.image} alt="Story Image" className="max-w-full h-auto" />
      )}
    </div>
      <input
        type="text"
        placeholder="Enter your input for the next page"
        value={state.userInput}
        onChange={(e) => dispatch({ type: 'SET_USER_INPUT', input: e.target.value })}
        className="mt-2 border rounded p-2 text-black"
      />
      <button
        onClick={handleGeneratePage}
        disabled={state.loading || state.userInput.trim() === ''}
        className="border hover:bg-gray-100 rounded px-4 py-2"
      >
        Generate Page
      </button>
      {state.currentPage < Object.keys(state.storyPages).length - 1 && currentPageData.text && currentPageData.image && (
        <button
          onClick={handleNextPage}
          disabled={state.loading}
          className="border hover:bg-gray-100 rounded px-4 py-2"
        >
          Next Page
        </button>
      )}
      {state.loading && <p>Loading...</p>}
    </div>
  );
}

export default StoryGenerator;

