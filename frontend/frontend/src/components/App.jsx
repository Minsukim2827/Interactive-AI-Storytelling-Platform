import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './../css/App.css';
import Create from './Create'; 
import UsersList from './UsersList'; 
import './../css/tailwind.css';
import TailwindTest from './tailwindtest';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>AI story telling</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/users">Users</Link> {/* Add a link to the UsersList page */}
          </nav>
        </header>


        <Routes>
          <Route path="/" element={<TailwindTest />} />
          <Route path="/create" element={<Create />} />
          <Route path="/users" element={<UsersList />} /> {/* Route for displaying the users list */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
