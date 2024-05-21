import React, { useEffect, useState } from "react";
import axios from "./../axios";
import { useAuth } from "./../AuthProvider"; // Import useAuth to access user context
import ImageModal from "../Modals";
import StoryDisplay from "./StoryDisplay";

const Bookmarks = () => {
    const { user } = useAuth(); // Access user context

    return (
        <div className="w-full flex justify-center">
            {user ? (
                <div className="w-11/12 max-w-screen-lg flex flex-col items-center">
                    <h1 className="w-full text-center text-3xl font-bold my-8">Bookmarks</h1>
                </div>
            ) : (
                // Display message if user is not logged in
                <p>Please log in to access this page.</p>
            )}
        </div>
    );

};

export default Bookmarks;