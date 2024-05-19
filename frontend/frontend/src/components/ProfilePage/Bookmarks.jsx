import React, { useEffect, useState } from "react";
import axios from "./../axios";
import { useAuth } from "./../AuthProvider"; // Import useAuth to access user context
import ImageModal from "../Modals";

const Bookmarks = () => {
    return (
        <div class ="mt-12">
            <h1>Bookmarks</h1>
            {/* Add your bookmark content here */}
        </div>
    );
};

export default Bookmarks;