// src/components/Header.tsx
import { useEffect, useState } from 'react';
import {  SunIcon,  MoonIcon, ArrowRightOnRectangleIcon,Squares2X2Icon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check if current page is dashboard
  const isDashboard = location.pathname === '/dashboard'; // Adjust path as needed

  // Get user from localStorage and initialize dark mode
  useEffect(() => {
    const userData = localStorage.getItem('authToken');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    navigate('/dashboard'); // Adjust path as needed
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-8xl mx-auto px-10 sm:px-6 lg:px-14">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://dsvgjymmlgbkpexngmjh.supabase.co/storage/v1/object/public/images/branding/KENNAH%20LOGO-03.png"
                alt="Logo"
              />
            </div>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            {/* User greeting */}
            {user && (
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hello, {user.name}
                </p>
              </div>
            )}

            {/* Dashboard button (shown when not on dashboard) */}
            {!isDashboard && (
              <button
                onClick={goToDashboard}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                title="Dashboard"
              >
                <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}