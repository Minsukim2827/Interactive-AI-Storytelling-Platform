import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../AuthProvider'; 

const GenerateStoryPage = () => {
    const { user } = useAuth(); 

    return (
        <div className="flex flex-col items-center lg:mt-20 h-100vh pt-24">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                Generate Your Story
                <br></br>
                <span className="bg-gradient-to-r from-green-500 to-blue-800 text-transparent bg-clip-text">
                    {" "}
                    unleash your creativity
                </span>
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Welcome to the story generation page! Here you can create unique and captivating stories using AI. Just provide some initial ideas or themes, and let the AI do the rest. Whether you're looking to write a short story, a novel, or just explore creative writing, this tool is for you.
            </p>
            {user ? (
                <div className="mt-4">
                    <Link to="/create">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Create Now
                        </button>
                    </Link>
                </div>
            ) : (
                <div>
                    <p className="mt-4 text-lg text-center ">
                        Generate a story now by logging in or signing up!
                    </p>
                    <div className="mt-4 flex gap-4 justify-center">
                        <Link to="/login">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Log In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateStoryPage;
