import React, { useEffect, useState } from 'react';
import axios from './../axios'; 
import { useAuth } from './../AuthProvider'; // Import useAuth to access user context
import UserProfile from './UserProfile';

const ProfilePage = () => {
    const [storybooks, setStorybooks] = useState([]);
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

    return (
        <div className="flex flex-col flex-wrap justify-center align-center items-center">
             {/* set title based on the logged in users name */}
            <h1 className="w-full text-center text-3xl font-bold my-8">{user ? `${user.username}'s Profile Page` : "User's StoryBooks"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {storybooks.map(storybook => (
                    <div key={storybook.storybook_id} className="bg-green-blue rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal max-w-sm mx-auto">
                        <div className="mb-8">
                            <div className="font-bold text-xl mb-2">{storybook.storybook_title}</div>
                            <img src={storybook.coverimage} alt={storybook.storybook_title} className="w-80" />
                            <p className="text-sm text-gray-600 flex items-center mt-4">
                                By: {storybook.username}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="text-sm">
                                <div className="leading-none">Viewership: {storybook.viewership}</div>
                                <div className="flex mt-2">
                                    <p className="mr-4">Likes: {storybook.likes}</p>
                                    <p>Dislikes: {storybook.dislikes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="max-w-7xl mt-10">
            {/* <UserProfile /> */}
        </div>
        </div>

    );
}

export default ProfilePage;
