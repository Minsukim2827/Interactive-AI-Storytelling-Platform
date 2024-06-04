import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiscoverPage from './../components/DiscoverPage/DiscoverPage';

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

describe('DiscoverPage', () => {
  it('should load the filter button and selections work', async () => {
    render(<DiscoverPage />);

    // check if the sort and select dropdown is in the document, and simulate selecting an option and clicking sort button
    const sortButton = screen.getByRole('button', { name: /sort/i });
    expect(sortButton).toBeInTheDocument();

    const selectDropdown = screen.getByRole('combobox');
    expect(selectDropdown).toBeInTheDocument();

    await userEvent.selectOptions(selectDropdown, 'views');
    expect(selectDropdown.value).toBe('views');

    await userEvent.click(sortButton);

  });
});
