import React, { useState, useEffect, useContext } from "react";
import StoryGenerator from "./StoryGenerator";
import { useAuth } from "./../AuthProvider";
import PageDisplay from "./PageDisplay";
import Navigation from "./Navigation";
import SaveStory from "./SaveStory";
import StorySetup from "./StorySetup";
import axios from "./../axios";
import { useNavigate } from "react-router-dom";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, XIcon } from "react-share";

function CreatePage() {
  const { user } = useAuth();
  const [showSetupPage, setShowSetupPage] = useState(true);
  const [parameters, setParameters] = useState({
    genre: "",
    artStyle: "",
    numPages: "",
    privacy: "false",
  });
  const [pages, setPages] = useState([]);
  const [title, setTitle] = useState("");
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [maxViewedPageIndex, setMaxViewedPageIndex] = useState(0);
  const [saveStatus, setSaveStatus] = useState(null);
  const navigate = useNavigate();

  // Function to handle the parameters submitted by the user
  const handleSetupSubmit = (genre, artStyle, numPages, privacy) => {
    setParameters({ genre, artStyle, numPages, privacy });
    console.log("Parameters submitted:", genre, artStyle, numPages, privacy);
    setShowSetupPage(false);
  };

  // Function to update the pages array
  const handleUpdate = (pageKey, text, image) => {
    setPages((oldPages) => {
      const pageIndex = oldPages.findIndex((page) => page.key === pageKey);
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

  // Function to save the story to the backend
  const handleSaveStory = () => {
    if (user) {
      const storyData = {
        title: title,
        pages: pages,
        userId: user.id,
        genre: parameters.genre,
        artStyle: parameters.artStyle,
        privacy: parameters.privacy,
      };
      // Send the story data to the backend
      console.log("attempting to send to backend");
      console.log(storyData);
      axios
        .post("/api/user/save-story", storyData)
        .then((response) => {
          console.log("Story saved successfully:", response.data);
          setSaveStatus({
            type: "success",
            message: "Story saved successfully! Navigationg to Home in 1.5s",
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((error) => {
          // Error saving story message
          console.error("Error saving story:", error);
          setSaveStatus({
            type: "error",
            message: "Failed to save story. Please try again.",
          });
        });
    } else {
      // User not authenticated
      console.log("User not authenticated");
      setSaveStatus({
        type: "error",
        message: "You must be logged in to save a story.",
      });
    }
  };

  // Function to navigate to a specific form
  const navigateToForm = (index) => {
    console.log("Navigating to form index:", index);
    setCurrentFormIndex(index);
    if (index > maxViewedPageIndex) {
      setMaxViewedPageIndex(index);
    }
  };

  // Function to navigate to the next form
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

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      console.log("Redirecting because user is not logged in");
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      {user ? (
        showSetupPage ? (
          <StorySetup onSubmit={handleSetupSubmit} />
        ) : (
          <div className="w-11/12 max-w-screen-lg flex flex-col items-center">
            <Navigation
              totalPages={maxViewedPageIndex + 1}
              currentFormIndex={currentFormIndex}
            />{" "}
            {/* Display navigation */}
            <PageDisplay pages={pages} navigateToForm={navigateToForm} />{" "}
            {/* Display the pages */}
            <StoryGenerator
              key={currentFormIndex}
              onUpdate={handleUpdate}
              currentPage={pages[currentFormIndex]}
              onNextPage={onNextPage}
              parameters={parameters}
            />{" "}
            {/* Generate the story */}
            {currentFormIndex === 5 && (
              <>
                <SaveStory title={title} setTitle={setTitle} onSave={handleSaveStory} />
                <div className = "flex row items-center gap-3">
                <h2>Share</h2>
                <EmailShareButton subject="My Story" body={"https://googole.com"}>
                  <EmailIcon size={40} round />
                </EmailShareButton>
                <TwitterShareButton title="share" url={"https://google.com"} hashtags={["AI"]} related={[]}>
                  <XIcon size={40} round />
                </TwitterShareButton>
                <FacebookShareButton url={"https://google.com"}>
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                </div>
              </>
            )}{" "}
            {/* Save the story */}
            {saveStatus && (
              // Display the save status message
              <div
                className={`mt-4 text-center p-2 ${
                  saveStatus.type === "success"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {saveStatus.message}
              </div>
            )}
          </div>
        )
      ) : (
        // Display message if user is not logged in
        <div className="text-center mt-24 font-bold ">
          <p>Please log in to access this page.</p>
        </div>
      )}
    </div>
  );
}

export default CreatePage;
