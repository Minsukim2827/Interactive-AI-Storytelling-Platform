import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText } from 'lucide-react';
import { ModeToggle } from './modeToggle';
import { useAuth } from './../AuthProvider';
import { TranslationButton } from './translationButton';
import { useTranslation } from 'react-i18next';
import SettingsModal from '../SettingsModal/SettingsModal';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Generate Story', href: '/generate' },
  { label: 'Discover', href: '/discover' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/logout');
  };

  return (
    <nav className="absolute left-0 right-0 max-w-full bg-gray-800 text-white p-4 flex justify-between items-center top-0 z-50 backdrop-blur-lg">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-2">
          <BookOpenText className="mr-2" />
          {t('websiteName')}
        </Link>
      </div>
      <ul className="flex space-x-4 items-center">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.href} className="hover:text-gray-300">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <TranslationButton />
        {user ? (
          <>
            <span className="font-bold">{user.username}</span>
            <Link to="/profile" className="px-3 py-2 rounded bg-green-500 hover:bg-green-700 text-white transition-colors">
              Profile
            </Link>
            <button onClick={openModal} className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white transition-colors">Settings</button>
            <button onClick={handleLogout} className="px-3 py-2 rounded bg-red-500 hover:bg-red-700 text-white transition-colors">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white transition-colors">
            Login
          </Link>
        )}
      </div>
      {/* Render the SettingsModal component */}
      <SettingsModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </nav>
  );
};

export default Navbar;
