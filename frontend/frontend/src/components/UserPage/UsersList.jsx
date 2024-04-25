// UsersList.jsx
import React, { useState, useEffect } from 'react';
import axios from '../axios';

function UsersList() {
 const [users, setUsers] = useState([]);
 const [showTable, setShowTable] = useState(false);

 useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
 }, []);

 const toggleTable = () => {
  setShowTable(!showTable);  // Toggle the visibility state
};

return (
  <div className="container mx-auto p-4">
    <button onClick={toggleTable} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click Me
    </button>
    {showTable && users.length > 0 ? (
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      !showTable ? <p>Click the button to show users.</p> : <p>No users found.</p>
    )}
  </div>
);
}

export default UsersList;
