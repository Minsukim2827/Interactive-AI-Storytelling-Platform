import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './../css/App.css';
import CreatePage from './CreatePage'; // Adjust the path as necessary
import UsersList from './UsersList'; // Import the UsersList component
import './../css/tailwind.css';
import TailwindTest from './tailwindtest';
import Navbar from './Navbar/Navbar'; 
import { ThemeProvider } from "@/components/Navbar/theme-provider"
import HomePage from './HomePage/HomePage';
function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <div className="App flex flex-col h-screen">
      <Navbar />


        <Routes>
          <Route path="/" element={
            <>
            <HomePage />
            <TailwindTest />
            </>
          } />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/users" element={<UsersList />} /> {/* Route for displaying the users list */}
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
