import React, { useEffect, useState } from "react";
import axios from "./../axios";
import { useAuth } from "./../AuthProvider"; // Import useAuth to access user context
import ImageModal from "../Modals";
import { Link } from 'react-router-dom';
import StoryDisplay from "./StoryDisplay";


const ProfilePage = () => {
  const [storybooks, setStorybooks] = useState([]);
  const [selectedStorybook, setSelectedStorybook] = useState(null);
  const { user } = useAuth(); // Access user context

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        try {

          const response = await axios.get(`/api/user/storybooks?userId=${user.id}`);
          const storybooksArray = Object.values(response.data);
          setStorybooks(storybooksArray);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      } else {
        console.log('No user ID found');
      }
    };

    fetchData();
  }, [user]);

  const openStorybookModal = (storybook) => {
    setSelectedStorybook(storybook);
  };

  const closeStorybookModal = () => {
    setSelectedStorybook(null);
  };

  return (
    <div className="flex flex-col flex-wrap justify-center align-center items-center pt-20">
      {/* set title based on the logged in users name */}
      <h1 className="w-full text-center text-3xl font-bold my-8">
        {user ? `${user.username}'s Profile Page` : "User's StoryBooks"}
      </h1>

      {user && (
        <div className="mt-1 ">
          <Link to="/bookmarks">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
              Bookmarks
            </button>
          </Link>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
            Settings
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {storybooks.map((storybook) => (
         <StoryDisplay key={storybook.storybook_id} storybook={storybook} openStorybookModal={openStorybookModal} />
        ))}
        {selectedStorybook && (
          <ImageModal storybook={selectedStorybook} onClose={closeStorybookModal} />
        )}
      </div>
      <div className="max-w-7xl mt-10"></div>
    </div>
  );
};

export default ProfilePage;
