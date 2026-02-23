import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-100 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg dark:shadow-2xl dark:border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="font-display text-3xl font-bold text-white hover:text-blue-100 transition-colors">
            💎 GrabGrid
          </Link>

          <ul className="flex items-center gap-6 flex-wrap">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/items" className="text-white hover:text-blue-100 transition-colors font-semibold">
                    Browse Items
                  </Link>
                </li>

                <li>
                  <Link to="/add-item" className="text-white hover:text-blue-100 transition-colors font-semibold">
                    Add Item
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard" className="text-white hover:text-blue-100 transition-colors font-semibold">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <span className="text-blue-100 text-sm font-semibold">
                    Welcome, {user?.name}
                  </span>
                </li>

                <li>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-blue-500 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-gray-600 transition-colors"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDark ? '☀️' : '🌙'}
                  </button>
                </li>

                <li>
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-blue-100 transition-colors font-semibold">
                    Login
                  </Link>
                </li>

                <li>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-blue-500 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-gray-600 transition-colors"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDark ? '☀️' : '🌙'}
                  </button>
                </li>

                <li>
                  <Link to="/register" className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-semibold">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
