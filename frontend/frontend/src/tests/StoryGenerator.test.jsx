import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StoryGenerator from '../components/CreatePage/StoryGenerator';
import axios from '../components/axios';

vi.mock('../components/axios');

describe('StoryGenerator', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  it('calls axios and updates page content on generate page button click', async () => {
    axios.post.mockResolvedValue({
      data: { text: 'Generated story text', image: 'path/to/image.jpg' }
    });

    // Include parameters with genre and artStyle
    const parameters = { genre: 'Adventure', artStyle: 'Cartoon' };

    render(<StoryGenerator parameters={parameters} />);
    const input = screen.getByPlaceholderText(/Enter your input for the next page/i);
    fireEvent.change(input, { target: { value: 'New user input' } });
    fireEvent.click(screen.getByText(/Generate Page/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/generate-story', {
        prompt: expect.any(String),
        artStyle: 'Cartoon',
      });
      expect(screen.getByText('Generated story text')).toBeInTheDocument();
      expect(screen.getByAltText('Story Image')).toHaveAttribute('src', 'path/to/image.jpg');
    });
  });
});
