import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './../css/App.css';
import HomePage from './HomePage'; // Adjust the path as necessary
import UsersList from './UsersList'; // Import the UsersList component

function App() {
 return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Users</h1>
          <nav>
            <Link to="/homepage">Home</Link>
            <Link to="/users">Users</Link> {/* Add a link to the UsersList page */}
          </nav>
        </header>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/users" element={<UsersList />} /> {/* Route for displaying the users list */}
        </Routes>
      </div>
    </Router>
 );
}

export default App;
