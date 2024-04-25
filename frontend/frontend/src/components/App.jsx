import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePage from './CreatePage/CreatePage'; // Adjust the path as necessary
import UsersList from './UserPage/UsersList'; // Import the UsersList component
import Navbar from './Navbar/Navbar'; 
import { ThemeProvider } from "@/components/Navbar/theme-provider"
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';
import { AuthProvider } from './AuthProvider';
import FadeInWrapper from './FadeInWrapper';

function App() {
  return (
<AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Navbar />
          <FadeInWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/users" element={<UsersList />} /> 
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignUpPage />} /> 
          </Routes>
          </FadeInWrapper>
        </Router>
      </ThemeProvider>
      </AuthProvider>
  );
}

export default App;
