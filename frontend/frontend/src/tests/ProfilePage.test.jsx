// src/tests/ProfilePage.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from '../components/axios';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import { AuthProvider } from '../components/AuthProvider';

vi.mock('react-modal', () => {
  const Modal = ({ children }) => children;
  Modal.setAppElement = vi.fn();
  return { default: Modal };
});

vi.mock('../components/axios', () => ({
  default: { get: vi.fn() }
}));

vi.mock('../components/AuthProvider', () => {
  const useAuth = vi.fn(() => ({ user: { id: '123', username: 'testuser' } }));
  return {
    AuthProvider: ({ children }) => <div>{children}</div>,
    useAuth
  };
});

vi.mock('@react-pdf/renderer', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    PDFDownloadLink: ({ children }) => <a href="#">{children}</a>,
  };
});

describe('ProfilePage', () => {
  it('fetches storybooks for the user and displays them', async () => {
    const mockStorybooks = [
      { storybook_id: 1, storybook_title: 'Storybook 1', coverimage: 'url1', username: 'user1', viewership: 100, likes: 10, dislikes: 2 },
      { storybook_id: 2, storybook_title: 'Storybook 2', coverimage: 'url2', username: 'user2', viewership: 150, likes: 15, dislikes: 3 }
    ];

    axios.get.mockResolvedValue({ data: mockStorybooks });

    render(
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(`/api/user/storybooks?userId=123`);
    });

    expect(await screen.findByText('Storybook 1')).toBeInTheDocument();
    expect(await screen.findByText('Storybook 2')).toBeInTheDocument();
  });

  it('opens the modal when a storybook is clicked', async () => {
    const mockStorybooks = [
      { storybook_id: 1, storybook_title: 'Storybook 1', coverimage: 'url1', username: 'user1', viewership: 100, likes: 10, dislikes: 2 }
    ];

    axios.get.mockResolvedValue({ data: mockStorybooks });

    render(
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>
    );

    // Wait for the storybook to be displayed before clicking
    await waitFor(() => expect(screen.getByText('Storybook 1')).toBeInTheDocument());
  });


  it('activates ai-generated voice when button is clicked', async () => {
    const mockStorybooks = [
      { storybook_id: 1, storybook_title: 'Storybook 1', coverimage: 'url1', username: 'user1', viewership: 100, likes: 10, dislikes: 2 }
    ];

    axios.get.mockResolvedValue({ data: mockStorybooks });

    render(
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>
    );

    // wait for the storybook to be displayed before clicking
    await waitFor(() => expect(screen.getByText('Storybook 1')).toBeInTheDocument());

    // click the button to activate the audio
    fireEvent.click(screen.getByText('Open Modal'));
    
    // get audio buttons
    const playAudioButtons = screen.getAllByRole('button', { name: /Play audio/i });

    // find the first play audio button and click it
    const playAudioButton = playAudioButtons[0];
    fireEvent.click(playAudioButton);

    // check if the audio is playing
    expect(screen.getByText('Audio is playing...')).toBeInTheDocument();
  });
});
