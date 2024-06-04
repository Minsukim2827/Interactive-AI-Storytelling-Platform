import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccountSettings from '../components/SettingsModal/AccountSettings';
import { AuthProvider } from '../components/AuthProvider';

vi.mock('./../AuthProvider', () => ({
  useAuth: () => ({ user: { id: '123' } })
}));
vi.mock('./../axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: { username: 'testUser', email: 'test@example.com' } })),
  post: vi.fn(() => Promise.resolve())
}));

describe('AccountSettings', () => {
    it('fetches user details and displays them', async () => {
      render(
        <AuthProvider>
          <AccountSettings />
        </AuthProvider>
      );
  
      expect(await screen.findByText('testUser')).toBeInTheDocument();
      expect(await screen.findByText('test@example.com')).toBeInTheDocument();
    });
  });
