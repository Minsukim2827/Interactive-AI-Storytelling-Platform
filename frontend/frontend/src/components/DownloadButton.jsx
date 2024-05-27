import React from 'react';

const DownloadButton = ({ onClick }) => {
  return (
    <button className="download-button" onClick={onClick}>
      <i className="fa fa-download"></i> Download
    </button>
  );
};

export default DownloadButton;
