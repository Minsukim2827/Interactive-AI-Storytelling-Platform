import React from 'react';

const Navigation = ({ totalPages, currentFormIndex }) => (
  // Displays the pages and the current page number
  <p className="text-center mt-4 font-bold">Page {currentFormIndex + 1} of {totalPages}</p>
);

export default Navigation;