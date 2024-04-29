import React, { useState } from 'react';
import axios from './../axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from './../AuthProvider';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('/api/login', {
        username: username,
        password: password
      });
      login(response.data.user);
      setIsLoginSuccessful(true);
      setTimeout(() => {
        navigate('/'); 
      }, 1500); 
    } catch (error) {
      setIsLoginSuccessful(false);
      setErrorMessage('Failed to login: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-500">
            {errorMessage}
          </div>
        )}
        {isLoginSuccessful && (
          <div className="mb-4 text-sm text-green-500">
            Login Successful! Redirecting in 1.5 seconds...<br/>
            If no redirection, <Link to="/" className="text-blue-500 hover:text-blue-700">click here</Link>.
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
          <Link to="/signup" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Sign Up
</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
