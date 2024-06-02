import React, { useEffect, useState } from "react";
import axios from "./../axios"; // Ensure the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./../AuthProvider"; // Import useAuth to access user context
import StorybookModal from "../Modals";

const DiscoverPage = () => {
  const [storybooks, setStorybooks] = useState([]);
  const [selectedStorybook, setSelectedStorybook] = useState(null); //storybook modal for disc page
  const { user } = useAuth();
  const [sortType, setSortType] = useState("");

  const closeStorybookModal = () => {
    setSelectedStorybook(null);
  };

  const openStorybookModal = (storybook) => {
    
    console.log("discoverypage storybook data:");
    console.log(storybook);

    setSelectedStorybook(storybook);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/storybooklist");
        const storybooksArray = Object.values(response.data);
        setStorybooks(storybooksArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const calculatePercentage = (likes, dislikes, type) => {
    const total = likes + dislikes;
    return total
      ? type === "likes"
        ? (likes / total) * 100
        : (dislikes / total) * 100
      : 0;
  };

  const handleLike = async (storybookId) => {
    try {
      const response = await axios.post("/api/storybook/like", { storybookId });
      const updatedLikes = response.data.likes;
      updateStorybooks(storybookId, updatedLikes, "likes");
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleDislike = async (storybookId) => {
    try {
      const response = await axios.post("/api/storybook/dislike", {
        storybookId,
      });
      const updatedDislikes = response.data.dislikes;
      updateStorybooks(storybookId, updatedDislikes, "dislikes");
    } catch (error) {
      console.error("Error updating dislike:", error);
    }
  };

  const updateStorybooks = (storybookId, updatedCount, type) => {
    const updatedStorybooks = storybooks.map((storybook) => {
      if (storybook.storybook_id === storybookId) {
        return { ...storybook, [type]: updatedCount };
      }
      return storybook;
    });
    setStorybooks(updatedStorybooks);
  };

  const handleBookmark = async (storybookId) => {
    if (user) {
      const bookmarkData = { userId: user.id, storybookId };
      axios
        .post("/api/user/save-bookmarks", bookmarkData)
        .then((response) =>
          console.log("Story bookmarked successfully:", response.data)
        )
        .catch((error) => console.error("Error bookmarking story:", error));
    } else {
      console.log("User not authenticated");
    }
  };

  const sortStorybooks = () => {
    let sortedBooks = [...storybooks];
    switch (sortType) {
      case "views":
        sortedBooks.sort((a, b) => b.viewership - a.viewership);
        break;
      case "upvotes":
        sortedBooks.sort(
          (a, b) =>
            b.likes / (b.likes + b.dislikes) - a.likes / (a.likes + a.dislikes)
        );
        break;
      case "alphabetical-asc":
        sortedBooks.sort((a, b) =>
          a.storybook_title.localeCompare(b.storybook_title)
        );
        break;
      case "alphabetical-desc":
        sortedBooks.sort((a, b) =>
          b.storybook_title.localeCompare(a.storybook_title)
        );
        break;
      default:
        break;
    }
    setStorybooks(sortedBooks);
  };

  return (
    <div className="min-h-screen max-w-screen pt-24">
      <h1 className="text-center text-4xl font-bold dark:text-white my-8">
        Discover Storybooks
      </h1>
      <div>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="m-4 p-2 rounded dark:text-black"
        >
          <option value="">Select Sort Type</option>
          <option value="views">Sort by Views</option>
          <option value="upvotes">Sort by Upvotes</option>
          <option value="alphabetical-asc">Alphabetical Ascending</option>
          <option value="alphabetical-desc">Alphabetical Descending</option>
        </select>
        <button
          onClick={sortStorybooks}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Sort
        </button>
      </div>
      <div className="text-black grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-20">
        {storybooks.map((storybook) => (
          <div
            key={storybook.storybook_id}
            className="bg-gray-800 dark:bg-slate-200 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={storybook.coverimage}
              alt={storybook.storybook_title}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="text-white font-bold dark:text-black text-lg leading-tight truncate">
                {storybook.storybook_title}
              </h3>
              <p className="text-gray-400 mt-1 font-bold">
                By: {storybook.username}
              </p>

              <button className="text-white" onClick={() => openStorybookModal(storybook)}>
                Open Modal
            </button>

              {selectedStorybook && (
                <StorybookModal
                  storybook={selectedStorybook}
                  onClose={closeStorybookModal}
                />
              )}

              <div className="mt-4">
                <span className="text-white dark:text-gray-800 font-medium">
                  Viewership:
                </span>
                <span className="text-white dark:text-black">
                  {storybook.viewership}
                </span>
              </div>
              <div className="flex justify-start items-center mt-2">
                <button
                  className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full mr-2"
                  onClick={() => handleLike(storybook.storybook_id)}
                >
                  Likes: {storybook.likes}
                </button>
                <button
                  className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full"
                  onClick={() => handleDislike(storybook.storybook_id)}
                >
                  Dislikes: {storybook.dislikes}
                </button>
                <button
                  className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-full ml-auto"
                  onClick={() => handleBookmark(storybook.storybook_id)}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
              </div>
              <div className="mt-4 w-full flex bg-none h-2 dark:bg-none rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${calculatePercentage(
                      storybook.likes,
                      storybook.dislikes,
                      "likes"
                    )}%`,
                  }}
                  className="bg-blue-500 h-full rounded-l-full"
                ></div>
                <div
                  style={{
                    width: `${calculatePercentage(
                      storybook.likes,
                      storybook.dislikes,
                      "dislikes"
                    )}%`,
                  }}
                  className="bg-red-500 h-full rounded-r-full"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
