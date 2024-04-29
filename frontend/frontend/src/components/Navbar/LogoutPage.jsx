import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500); // Redirect to homepage after 3 seconds
    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 h-screen">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        You've been logged out.
        <br></br>
        <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
          Redirecting to homepage...
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Thank you for visiting! We hope to see you again soon.
      </p>
    </div>
  );
};

export default LogoutPage;
