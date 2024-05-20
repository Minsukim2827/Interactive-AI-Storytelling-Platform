import React, { useEffect, useState } from 'react';
import axios from './../axios'; // Ensure the path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "./../AuthProvider"; // Import useAuth to access user context


const DiscoverPage = () => {
    const [storybooks, setStorybooks] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/storybooklist');
                const storybooksArray = Object.values(response.data);
                console.log(storybooksArray);
                setStorybooks(storybooksArray);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleBookmark = async (storybookId) => {
        if(user)
            console.log(storybookId);
        else{
            console.log("User not authenticated");

        }
    }

    return (
        <div className="min-h-screen max-w-screen pt-24">
            <h1 className="text-center text-4xl font-bold dark:text-white my-8">Discover Storybooks</h1>
            <div className="text-black grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-20">
                {storybooks.map(storybook => (
                    <div key={storybook.storybook_id} className="bg-gray-800 dark:bg-slate-200 rounded-3xl overflow-hidden shadow-2xl">
                        <img src={storybook.coverimage} alt={storybook.storybook_title} className="w-full h-auto" />
                        <div className="p-4">
                            <h3 className="text-white font-bold dark:text-black text-lg leading-tight truncate">{storybook.storybook_title}</h3>
                            <p className="text-gray-400 mt-1 font-bold">By: {storybook.username}</p>
                            <div className="mt-4">
                                <span className="text-white dark:text-gray-800 font-medium">Viewership:</span> <span className="text-white dark:text-black">{storybook.viewership}</span>
                            </div>
                            <div className="flex justify-start items-center mt-2">
                                <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full mr-2">
                                    Likes: {storybook.likes}
                                </button>
                                <button className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full">
                                    Dislikes: {storybook.dislikes}
                                </button>
                                <button
                                    className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-full ml-2"
                                    onClick={() => handleBookmark(storybook.storybook_id)}
                                >
                                    <FontAwesomeIcon icon={faBookmark} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}

export default DiscoverPage;
