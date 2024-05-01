import React from 'react';

const Navigation = ({ totalPages, currentFormIndex }) => (
  <p className="text-center">Page {currentFormIndex + 1} of {totalPages}</p>
);

export default Navigation;