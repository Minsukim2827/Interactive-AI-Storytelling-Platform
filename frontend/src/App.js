import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const response = await fetch('http://localhost:5000/api/hello');
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <button onClick={handleClick}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
