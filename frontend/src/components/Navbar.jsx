import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBookOpen, FaUserGraduate, FaImages, FaSignInAlt } from 'react-icons/fa';
import logo from '../images/mathlogo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-[#2b005a] z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Math Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-100 flex items-center gap-1">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/materials" className="hover:text-yellow-100 flex items-center gap-1">
              <FaBookOpen /> Materials
            </Link>
          </li>
          <li>
            <Link to="/students" className="hover:text-yellow-100 flex items-center gap-1">
              <FaUserGraduate /> Students
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:text-yellow-100 flex items-center gap-1">
              <FaImages /> Gallery
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
            <li>
              <Link to="/" onClick={toggleMenu} className="hover:text-blue-600 flex items-center gap-2">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/materials" onClick={toggleMenu} className="hover:text-blue-600 flex items-center gap-2">
                <FaBookOpen /> Materials
              </Link>
            </li>
            <li>
              <Link to="/students" onClick={toggleMenu} className="hover:text-blue-600 flex items-center gap-2">
                <FaUserGraduate /> Students
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={toggleMenu} className="hover:text-blue-600 flex items-center gap-2">
                <FaImages /> Gallery
              </Link>
            </li>
            
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
