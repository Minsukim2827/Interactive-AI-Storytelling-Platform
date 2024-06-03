import React, { useReducer, useEffect } from "react";
import axios from "./../axios"; // Ensure this path is correct based on your project structure
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, XIcon } from "react-share";

// Define the initial state for the story generator
const initialState = {
  currentPage: 0,
  storyPages: {
    // Define the pages of the story
    "Cover Page": { text: "", image: "" },
    "Introduction Page": { text: "", image: "" },
    "Second Page": { text: "", image: "" },
    "Third Page": { text: "", image: "" },
    "Fourth Page": { text: "", image: "" },
    "Last Page": { text: "", image: "" },
    privacy: "false",
    genre: "",
    artStyle: "",
  },
  userInput: "",
  loading: false,
};

// Reducer function to handle state transitions
function reducer(state, action) {
  switch (action.type) {
    case "SET_PAGE_CONTENT":
      const updatedStoryPages = {
        ...state.storyPages,
        [action.pageKey]: { text: action.text, image: action.image },
      };
      return {
        ...state,
        storyPages: updatedStoryPages,
      };
    case "SET_CURRENT_PAGE_FROM_PROP":
      return {
        ...state,
        currentPage: action.currentPage,
        storyPages: {
          ...state.storyPages,
          [action.pageKey]: { text: action.text, image: action.image },
        },
      };
    case "NEXT_PAGE":
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case "SET_USER_INPUT":
      return {
        ...state,
        userInput: action.input,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}

// StoryGenerator component to generate story pages
function StoryGenerator({ onUpdate, currentPage, onNextPage, parameters }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (currentPage) {
      dispatch({
        type: "SET_CURRENT_PAGE_FROM_PROP",
        currentPage: Object.keys(initialState.storyPages).indexOf(
          currentPage.key
        ),
        pageKey: currentPage.key,
        text: currentPage.text,
        image: currentPage.image,
      });
    }
  }, [currentPage]);

  // Function to handle the generate page button click
  const handleGeneratePage = async () => {
    dispatch({ type: "SET_LOADING", loading: true });
    const pageKeys = Object.keys(state.storyPages);
    const currentPageKey = pageKeys[state.currentPage];
    const prompt = `Generate content for: ${currentPageKey} with with genre: ${parameters.genre}, and input: ${state.userInput}`;
    console.log(prompt);

    try {
      // Call the backend API to generate the story page
      const response = await axios.post("/generate-story", {
        prompt,
        artStyle: parameters.artStyle,
      });
      dispatch({
        type: "SET_PAGE_CONTENT",
        pageKey: currentPageKey,
        text: response.data.text,
        image: response.data.image,
      });
      onUpdate(currentPageKey, response.data.text, response.data.image);
    } catch (error) {
      //
      console.error("Error generating story page:", error);
    }
    dispatch({ type: "SET_LOADING", loading: false });
  };

  // Function to handle the next page button click
  const handleNextPage = () => {
    if (state.currentPage < Object.keys(state.storyPages).length - 1) {
      dispatch({ type: "NEXT_PAGE" });
      onNextPage();
    }
  };

  const currentPageKey = Object.keys(state.storyPages)[state.currentPage];
  const currentPageData = state.storyPages[currentPageKey];

  const speak = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentPageData.text);
      utterance.lang = "EN"; // Set the language as English
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support voice synthesis function");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-xl font-bold">{currentPageKey}</h1>
      <div className="flex flex-col items-center border-2 border-blue-500 max-w-xs w-full p-4">
        <p className="mb-4">{currentPageData.text}</p>{" "}
        {/* Display the generated text */}
        {currentPageData.image && ( // Display the generated image
          <img
            src={currentPageData.image}
            alt="Story Image"
            className="max-w-full h-auto"
          />
        )}
        {
          // Display the speak to play button
          currentPageData.text && <button onClick={speak}>Speak To Play</button>
        }
      </div>
      <input // User input field
        type="text"
        placeholder="Enter your input for the next page"
        value={state.userInput}
        onChange={(e) =>
          dispatch({ type: "SET_USER_INPUT", input: e.target.value })
        }
        className="mt-2 border rounded p-2 text-black"
      />
      <button // Generate Page button
        onClick={handleGeneratePage}
        disabled={state.loading || state.userInput.trim() === ""}
        className="border bg-green-500 hover:bg-green-600 rounded px-4 py-2"
      >
        Generate Page
      </button>
      {state.currentPage < Object.keys(state.storyPages).length - 1 &&
        currentPageData.text &&
        currentPageData.image && (
          <button // Next Page button
            onClick={handleNextPage}
            disabled={state.loading}
            className="border bg-blue-600 hover:bg-blue-700 rounded px-4 py-2"
          >
            Next Page
          </button>
        )}
      {state.loading && <p>Loading...</p>}
      <h2>share</h2>

      {/* url -> testing Finally, url is the story address */}
      <EmailShareButton subject="My Story" body={"https://googole.com"}>
        <EmailIcon size={40} round></EmailIcon>
      </EmailShareButton>

      <TwitterShareButton
        title="share"
        url={"https://google.com"}
        hashtags={["AI"]}
        related={[]}
      >
        <XIcon size={40} round></XIcon>
      </TwitterShareButton>


      <FacebookShareButton url={"https://google.com"}>
        <FacebookIcon size={40} round></FacebookIcon>
      </FacebookShareButton>
    </div>
  );
}

export default StoryGenerator;
