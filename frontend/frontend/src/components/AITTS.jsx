import React, { useState } from 'react';
import axios from "./axios";


const AITTS = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = () => {
        setIsPlaying(true);
        try {
            const audio = new Audio(`/api/user/tts?text=${text}`);
            audio.play();
            audio.onended = () => {
                setIsPlaying(false);
            };
        }
        catch (error) {
            console.error('Error generating audio:', error);
        }
    };

    return (
        <div>
            <button onClick={playAudio}>Play Audio</button>
            {isPlaying && <p>Audio is playing...</p>}
        </div>
    );
};

export default AITTS;
