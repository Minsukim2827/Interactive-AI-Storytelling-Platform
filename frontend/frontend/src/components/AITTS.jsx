import React, { useState } from 'react';
import axios from "./axios";


const AITTS = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing

    const playAudio = async () => { // Play audio function
        setIsPlaying(true);
        try { // Make a POST request to the backend to generate audio
            const response = await axios.post("/api/user/tts", { text }, { responseType: 'blob' });
            const audioUrl = URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
            const audio = new Audio(audioUrl);
            audio.play(); // Play the audio
            audio.onended = () => {
                setIsPlaying(false);
            };
        } catch (error) { // Log error if audio generation fails
            console.error('Error generating audio:', error);
        }
    };

    return ( // Button to play audio
        <div> 
            <button onClick={playAudio}>Play Audio</button>
            {isPlaying && <p>Audio is playing...</p>}
        </div>
    );
};

export default AITTS;
