import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StorySetup from '../components/CreatePage/StorySetup';

describe('StorySetup Component', () => {
  it('updates selected genre when genre button is clicked', () => {
    const { getByText } = render(<StorySetup />);
    const genreButton = getByText('Adventure');
    fireEvent.click(genreButton);
    expect(genreButton).toHaveClass('bg-blue-500 text-white');
  });
  it('updates selected artstyle when art style button is clicked', () => {
    const { getByText } = render(<StorySetup />);
    const artButton = getByText('Realistic');
    fireEvent.click(artButton);
    expect(artButton).toHaveClass('bg-blue-500 text-white');
  });

});