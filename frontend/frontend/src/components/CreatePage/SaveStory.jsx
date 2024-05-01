import React, { useState } from 'react';

function SaveStory({ title, setTitle, onSave }) {
    return (
      <div className="mt-4 p-4 border-t-2">
        <h2 className="text-lg font-bold">Include a Title</h2>
        <div className="flex items-center space-x-4 mt-2">
          <input
            type="text"
            placeholder="Enter story title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={onSave}
            disabled={!title.trim()}
            className="border hover:bg-gray-100 rounded px-4 py-2"
          >
            Save Story
          </button>
        </div>
      </div>
    );
  }
  
  export default SaveStory;
