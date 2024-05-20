
import React from 'react';

const StoryDisplay = ({ storybook, openStorybookModal }) => (
    <div
        key={storybook.storybook_id}
        className="text-white bg-gray-800 rounded-b lg:rounded-2xl p-4 flex flex-col justify-between leading-normal max-w-sm mx-auto"
    >
        <div className="mb-8">
            <div className="font-bold text-xl mb-2 text-white">
                {storybook.storybook_title}
            </div>
            <img
                src={storybook.coverimage}
                alt={storybook.storybook_title}
                className="w-80"
            />
            <button className="text-white" onClick={() => openStorybookModal(storybook)}>
                Open Modal
            </button>
            <p className="text-sm text-white flex items-center mt-4">
                By: {storybook.username}
            </p>
        </div>
        <div className="flex items-center">
            <div className="text-sm text-white">
                <div className="leading-none">
                    Viewership: {storybook.viewership}
                </div>
                <div className="flex mt-2 text-white">
                    <p className="mr-4 text-white">Likes: {storybook.likes}</p>
                    <p>Dislikes: {storybook.dislikes}</p>
                </div>
            </div>
        </div>
    </div>
);

export default StoryDisplay;
