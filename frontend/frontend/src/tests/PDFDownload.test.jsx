// PDFDownload.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import PDFDownload from '../components/PDFDownload';

vi.mock('@react-pdf/renderer', () => ({
  PDFViewer: ({ children }) => <div>{children}</div>,
  Document: ({ children }) => <div>{children}</div>,
  Page: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <div>{children}</div>,
  View: ({ children }) => <div>{children}</div>,
  Image: ({ src, style }) => <img src={src} style={style} alt={`mocked image - ${src}`} />,
  StyleSheet: {
    create: (styles) => styles,
  },
  PDFDownloadLink: ({ document, fileName, children }) => (
    <a href="#" download={fileName}>
      {children({ loading: false })}
    </a>
  ),
}));

describe('PDFDownload', () => {
  const mockData = {
    coverimage: 'coverimage.png',
    storybook_title: 'Mock Storybook Title',
    image1: 'image1.png',
    text1: 'Text 1',
    image2: 'image2.png',
    text2: 'Text 2',
    image3: 'image3.png',
    text3: 'Text 3',
    image4: 'image4.png',
    text4: 'Text 4',
    image5: 'image5.png',
    text5: 'Text 5',
  };

  it('renders PDFDownloadLink with correct file name', () => {
    render(<PDFDownload data={mockData} />);

    const linkElement = screen.getByText(/Download PDF/i).closest('a');
    expect(linkElement).toHaveAttribute('download', `${mockData.storybook_title}.pdf`);
  });
});
