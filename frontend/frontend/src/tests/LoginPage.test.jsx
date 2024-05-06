import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import { AuthProvider } from '../components/AuthProvider';

// Mocking axios with default export
vi.mock('../components/axios', () => {
  return {
    default: {
      post: vi.fn(() => Promise.resolve({ data: { user: { name: 'Test User' } } })),
    },
  };
});

describe('LoginPage', () => {
    it('renders the login form and accepts input', async () => {
        render(
          <Router>
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          </Router>
        );
      
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
      
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
      
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'password');
      
        expect(usernameInput).toHaveValue('testuser');
        expect(passwordInput).toHaveValue('password');
      });
      

});
