'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/ContextProvider/AuthProviderWrap';
import Image from 'next/image';

import worpdressLogo from './../../assets/images/logo-wordpress-49504.png';
import { zsettings } from '@/settings/ZSettings';
import { deleteAccessToken } from '@/utils/apiServer';

// Define the shape of the props this component expects
interface HeaderProps {
  // userEmail: string;
  pageId?: number
}

// Minimal SVG for a WordPress-like logo placeholder (for completeness)
const WordPressLogo: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    // Tailwind Class: text-blue-600 for WordPress blue color
    className="text-blue-600"
    fill="currentColor"
    aria-label="WordPress Logo"
  >
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm7.6 12.3c-.6.3-1.6.4-2.6.4-2.7 0-4.8-1.5-5.9-4.2l-4.4 7.6c.7.2 1.4.3 2.1.3 3.9 0 7.1-2.6 8.2-6.1zM6.5 8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm-.8 5.7l2.8-4.9c1.1 2.3 3.1 3.5 5.5 3.5 1.2 0 2.2-.3 3.1-.9L9.3 17c-1.3-.3-2.6-.9-3.6-1.9z" />
  </svg>
);

const HeaderSmallForLoggedUser: React.FC<HeaderProps> = (data) => {

  const { pageId } = data

  const { user, setUser, signOut } = useAuth();

  console.log("Logged user:", user);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Implement actual logout logic here (e.g., API call, cookie removal)
    console.log('Logging out...');
    // alert('Logout clicked'); // Placeholder action
    /*setUser(null);
    deleteAccessToken()*/
    signOut();
    setIsDropdownOpen(false);

  };

  if (user === null) return null;

  return (
    // Header Container:
    // Requested Styling: Light yellow background (bg-yellow-100), small height (h-12 or h-[48px]), fixed top, flex layout
    <header className="static top-0 left-0 right-0 h-12 flex justify-between items-center px-5 bg-yellow-100 shadow-md z-10">

      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link href={`${zsettings.wpURL}/wp-admin`} target='_blank' passHref className='inline-flex items-center'>
          {/* Tailwind Class: inline-flex to align icon properly */}
          <Image alt='Wordpress Admin Dashboard' src={worpdressLogo} width={120} height={120} style={{ width: '30px', height: '30px' }} />
        </Link>
        {
          pageId !== undefined && !isNaN(Number(pageId)) && (
            <Link href={`${zsettings.wpURL}/wp-admin/post.php?post=${pageId}&action=edit`} target='_blank' passHref className='inline-flex items-center ml-2 color-gray' >
              {/* Tailwind Class: inline-flex to align icon properly */}
              Edit Current Page
            </Link>
          )
        }
      </div>

      {/* Right Side: Email Dropdown */}
      <div className="relative">
        {/* Dropdown Button: */}
        {/* Tailwind Classes: font-medium, p-2, rounded, transition, hover:bg-yellow-200 */}
        <button
          className="flex items-center p-2 text-sm font-medium text-gray-700 rounded-md transition duration-150 ease-in-out hover:bg-yellow-200 focus:outline-none"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {user.email}
          {/* Simple Down Arrow */}
          <span className="ml-2 text-xs">&#9660;</span>
        </button>

        {isDropdownOpen && (
          // Dropdown Menu:
          // Tailwind Classes: absolute right-0, mt-1, bg-white, rounded-lg, shadow-lg, border
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20">

            {/* Redirect to profile on WordPress */}
            {/**/
              <Link href="/Dashboard" passHref className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                User Dashboard
              </Link>}

            {/* Logout Action */}
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSmallForLoggedUser;