import './../css/tailwind.css';
import React from 'react';

const TailwindTest = () => {
    return (
        <div className="p-6 max-w-sm mx-auto bg-black dark:bg-blue-400 rounded-xl shadow-md flex items-center space-x-4 ">
            <div>
                <h1 className="text-xl font-medium text-white dark:text-black">Welcome to Tailwind!</h1>
                <p className="text-gray-500">You're ready to build something amazing.</p>
            </div>
        </div>
    );
};

export default TailwindTest;
