import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePage from './CreatePage/CreatePage'; // Adjust the path as necessary
import UsersList from './UserPage/UsersList'; // Import the UsersList component
import Navbar from './Navbar/Navbar'; 
import { ThemeProvider } from "@/components/Navbar/theme-provider"
import HomePage from './HomePage/HomePage';
function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      
      <Navbar />
        <Routes>
          <Route path="/" element={
            <>
            <HomePage />
            </>
          } />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/users" element={<UsersList />} /> 
        </Routes>
      
    </Router>
    </ThemeProvider>
  );
}

export default App;
