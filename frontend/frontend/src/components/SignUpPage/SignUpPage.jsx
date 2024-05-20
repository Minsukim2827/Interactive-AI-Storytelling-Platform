import React, { useState } from 'react';
import axios from './../axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory for redirection

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

  const navigate = useNavigate(); // Hook for redirection

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      const response = await axios.post('/api/register', {
        username: username,
        email:email,
        password:password
      });
      alert('Registration successful! You can now login.');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage('Failed to register: ' + error.response.data.error);
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Failed to register: Endpoint not found');
      } else {
        setErrorMessage('Failed to register: ' + error.message);
      }
    }
    
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="dark:bg-white bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 rounded-2xl" onSubmit={handleRegister}>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-500">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-white dark:text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="example" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-white dark:text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-white dark:text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="g00dpassw@rd" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
