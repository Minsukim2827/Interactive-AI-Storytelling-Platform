import React, { useState, useEffect } from 'react';
import './../css/App.css';

function App() {
  const [users, setUsers] = useState([]);

  // Function to fetch users from the API and set them in state
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users'); // Update the endpoint if necessary
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []); // The empty array ensures this effect runs once on component mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>Users</h1>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </header>
    </div>
  );
}

export default App;