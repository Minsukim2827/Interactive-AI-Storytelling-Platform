// UsersList.jsx
import React, { useState, useEffect } from 'react';

function UsersList() {
 const [users, setUsers] = useState([]);

 useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
 }, []);

 return (
    <div>
      {users.length > 0 ? (
        <div>
          <button onClick={() => console.log('Button clicked')}>Click Me</button>
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
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
 );
}

export default UsersList;
