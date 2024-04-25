import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 h-100vh">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        An AI Storytelling Website
        <br></br>
        <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
          {" "}
          for storybook readers
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Welcome to your go-to destination for storybook collections and discovery! Explore this website of resources and community recommendations to find your next captivating read. Whether you're into epic fantasies, crime thrillers, or interstellar adventures, we've got you covered.
      </p>
    </div>
  )};

  export default HomePage;