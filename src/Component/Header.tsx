import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, ArrowRightOnRectangleIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const userData = localStorage.getItem('authToken');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Navigate to dashboard
  const goToDashboard = () => navigate('/dashboard');

  return (
    <header className="bg-white dark:bg-[#000] shadow-sm transition-colors duration-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 ">
              <img
                className="h-8 w-auto dark:invert dark:brightness-0 dark:hover:brightness-100 transition-all duration-200"
                src="https://dsvgjymmlgbkpexngmjh.supabase.co/storage/v1/object/public/images/branding/KENNAH%20LOGO-03.png"
                alt="Logo"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hello, {user.name}
                </p>
              </div>
            )}

            {!isDashboard && (
              <button
                onClick={goToDashboard}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Dashboard"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}