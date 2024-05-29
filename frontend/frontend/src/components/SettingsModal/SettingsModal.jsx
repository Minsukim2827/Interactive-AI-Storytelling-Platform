import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaCog, FaUser, FaUniversalAccess, FaTimes } from 'react-icons/fa';
import GeneralSettings from './GeneralSettings';
import AccountSettings from './AccountSettings';
import AccessibilitySettings from './AccessibilitySettings';
import "./SettingsModal.css";

const SettingsModal = ({ isOpen, onRequestClose }) => {
  const [currentSettingsPage, setCurrentSettingsPage] = useState('General');
  const [theme, setTheme] = useState('light');

  const handlePageChange = (page) => {
    setCurrentSettingsPage(page);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '900px',
          height: '500px',
          margin: 'auto',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
          backgroundColor: theme === 'dark' ? '#333' : '#fff', // Adjust background color based on theme
          color: theme === 'dark' ? '#fff' : '#333', // Adjust text color based on theme
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Settings</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginLeft: '20px', position: 'relative' }}>
        <div className='subNavBar' style={{ width: '200px', height: '375px', marginRight: '20px', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
          {/* settings options with icons */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}><FaCog style={{ marginRight: '5px' }} /><button className="settings-button" onClick={() => handlePageChange('General')}>General</button></div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}><FaUser style={{ marginRight: '5px' }} /><button className="settings-button" onClick={() => handlePageChange('Account')}>Account</button></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><FaUniversalAccess style={{ marginRight: '5px' }} /><button className="settings-button" onClick={() => handlePageChange('Accessibility')}>Accessibility</button></div>
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '0' }}>
          <button className="close-button" onClick={onRequestClose}><FaTimes style={{ marginRight: '5px' }} />Close</button>
        </div>
        <div className='dynamicUpdateSettingsPage' style={{width: '600px'}}>
          {/* Content for the div */}
          {currentSettingsPage === 'General' && <GeneralSettings onThemeChange={handleThemeChange} />}
          {currentSettingsPage === 'Account' && <AccountSettings />}
          {currentSettingsPage === 'Accessibility' && <AccessibilitySettings />}
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
