import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText } from 'lucide-react';
import '@/css/index.css'; // Import TailwindCSS
import { ModeToggle } from './modeToggle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'create', href: '/create' },
  { label: 'users', href: '/users' },
];

const Navbar = () => {
  return (
    <nav className="max-w-full bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-lg">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-2">
          <BookOpenText className="mr-2" />
          AI Storytelling
        </Link>
      </div>
      <div>
      <ul className="flex space-x-4 items-center">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.href} className="hover:text-gray-300">
              {item.label}
            </Link>
          </li>
        ))}
        </ul>
        </div>
        <div className="flex items-center gap-4">
        <ModeToggle />
        <Link to="/login" className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white transition-colors">Login</Link>
        </div>
    </nav>
  );
};

export default Navbar;
