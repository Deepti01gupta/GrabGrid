import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../UI/index';

/**
 * Professional Navigation Bar
 * Modern design with smooth transitions and responsive mobile menu
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/items', label: 'Browse Items', icon: '📦' },
    { to: '/add-item', label: 'Add Item', icon: '➕' },
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-[#040D12] backdrop-blur-sm border-b border-[#D9D1CC] dark:border-[#3D5A5A] shadow-md transition-colors duration-200" style={{backgroundColor: isDark ? '#040D12' : '#FCF9EA'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity"
            style={{
              backgroundImage: isDark 
                ? 'linear-gradient(to right, #5C8374, #93B1A6)' 
                : 'linear-gradient(to right, #6482AD, #7FA1C3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{
                backgroundImage: isDark 
                  ? 'linear-gradient(135deg, #5C8374, #93B1A6)' 
                  : 'linear-gradient(135deg, #6482AD, #7FA1C3)'
              }}
            >
              G
            </div>
            GrabGrid
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated ? (
              navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                  style={{
                    color: isDark ? '#B8D4CE' : '#5C6366',
                    backgroundColor: isDark ? 'transparent' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)';
                    e.currentTarget.style.color = isDark ? '#A5C9CA' : '#6482AD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = isDark ? '#B8D4CE' : '#5C6366';
                  }}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.label}
                </Link>
              ))
            ) : null}
          </div>

          {/* Right Section - User Menu & Actions */}
          <div className="flex items-center gap-4">
            
            {/* User Info (Desktop) */}
            {isAuthenticated && (
              <div 
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)',
                  borderColor: isDark ? '#3D5A5A' : '#D9D1CC'
                }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    backgroundImage: isDark 
                      ? 'linear-gradient(135deg, #5C8374, #93B1A6)' 
                      : 'linear-gradient(135deg, #6482AD, #7FA1C3)'
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{color: isDark ? '#B8D4CE' : '#5C6366'}}
                >
                  {user?.name}
                </span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)',
                color: isDark ? '#93B1A6' : '#6482AD'
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(92, 131, 116, 0.2)' : 'rgba(100, 130, 173, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)';
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <Button
                variant="accent"
                size="sm"
                onClick={handleLogout}
                icon="👋"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Out</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                  icon="🚀"
                >
                  <span className="hidden sm:inline">Register</span>
                  <span className="sm:hidden">Sign Up</span>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)',
                color: isDark ? '#93B1A6' : '#6482AD'
              }}
              aria-label="Toggle menu"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(92, 131, 116, 0.2)' : 'rgba(100, 130, 173, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)';
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden border-t py-4 space-y-2"
            style={{borderColor: isDark ? '#3D5A5A' : '#D9D1CC'}}
          >
            {isAuthenticated ? (
              <>
                <div 
                  className="px-3 py-2 rounded-lg mb-3 border"
                  style={{
                    backgroundColor: isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)',
                    borderColor: isDark ? '#3D5A5A' : '#D9D1CC'
                  }}
                >
                  <p 
                    className="text-sm font-medium"
                    style={{color: isDark ? '#B8D4CE' : '#5C6366'}}
                  >
                    Welcome, {user?.name}
                  </p>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{
                      color: isDark ? '#B8D4CE' : '#5C6366',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(92, 131, 116, 0.1)' : 'rgba(100, 130, 173, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
