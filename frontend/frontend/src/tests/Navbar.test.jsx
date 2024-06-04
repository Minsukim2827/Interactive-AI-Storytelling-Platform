import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { AuthProvider } from '../components/AuthProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n'; 
import {expect, it, describe} from 'vitest';

const MockNavbar = () => {
  return (
    <Router>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <Navbar />
        </I18nextProvider>
      </AuthProvider>
    </Router>
  );
};

describe('Navbar', () => {

  it('should render navigation links', () => {
    render(<MockNavbar />);
    const navItems = ['Home','Generate Story', 'Discover'];
    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should render login link when user is not authenticated', () => {
    render(<MockNavbar />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});

