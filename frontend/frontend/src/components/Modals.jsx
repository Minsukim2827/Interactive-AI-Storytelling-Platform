import React from 'react';
import Modal from 'react-modal';
import AITTS from './AITTS';
import DownloadButton from './DownloadButton';
import generatePDF from './generatePDF';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    margin: '2%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%', // Adjust the maximum width as needed
    maxHeight: '80vh', // Adjust the maximum height as needed
    overflow: 'auto', // Enable scrolling if content overflows
    padding: '0px', // Add padding for better appearance
    border: 'none', // Remove default border
    borderRadius: '10px', // Apply border radius for rounded corners
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Apply shadow for depth
    backgroundColor: 'white', // Set background color
    zIndex: '1000', // Ensure modal appears above other elements
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set overlay background color
  },
};

const StorybookModal = ({ storybook, onClose }) => {
  // Function to handle download action
  const handleDownload = () => {
    generatePDF(storybook); // Pass the storybook data directly
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
      <div id="pdfContent" className="max-w-screen-lg mx-auto dark:bg-black">
        <h2 className="text-2xl font-bold mb-4 text-center">{storybook.storybook_title}</h2>
        <div className="flex flex-wrap gap-4 justify-center space-x-4 overflow-x-auto dark:bg-black">
          <div className="border border-gray-300 rounded-lg p-4 flex-shrink">
            <img src={storybook.coverimage} alt={storybook.storybook_title} className="w-full" />
            <p className="mt-2 text-center">{storybook.text1}</p>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 flex-shrink-0">
            <img src={storybook.image1} alt={storybook.storybook_title} className="w-full" />
            <p className="mt-2 text-center">{storybook.text1}</p>
            <AITTS text={storybook.text1} />
          </div>
          <div className="border border-gray-300 rounded-lg p-4 flex-shrink-0">
            <img src={storybook.image2} alt={storybook.storybook_title} className="w-full" />
            <p className="mt-2 text-center">{storybook.text2}</p>
            <AITTS text={storybook.text2} />
          </div>
          <div className="border border-gray-300 rounded-lg p-4 flex-shrink-0">
            <img src={storybook.image3} alt={storybook.storybook_title} className="w-full" />
            <p className="mt-2 text-center">{storybook.text3}</p>
            <AITTS text={storybook.text3} />
          </div>
          <div className="border border-gray-300 rounded-lg p-4 flex-shrink-0">
            <img src={storybook.image4} alt={storybook.storybook_title} className="w-full" />
            <p className="mt-2 text-center">{storybook.text4}</p>
            <AITTS text={storybook.text4} />
          </div>
          <div className="border border-gray-300 rounded-lg p-4 flex-shrink-0">
            <img src={storybook.image5} alt={storybook.storybook_title} className="w-full" />
            <p className="mt-2 text-center">{storybook.text5}</p>
            <AITTS text={storybook.text5} />
          </div>
          <DownloadButton onClick={handleDownload} />
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close Modal</button>
        </div>
      </div>
    </Modal>
  );
};


export default StorybookModal;
