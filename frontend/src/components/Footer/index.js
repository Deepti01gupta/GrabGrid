import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

/**
 * Professional Footer
 * Comprehensive footer with links, info, and branding
 */
const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Browse Items', to: '/items' },
        { label: 'How It Works', to: '/' },
        { label: 'Security', to: '/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/' },
        { label: 'Blog', to: '/' },
        { label: 'Careers', to: '/' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '/' },
        { label: 'Terms of Service', to: '/' },
        { label: 'Contact', to: '/' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Twitter', to: '#' },
        { label: 'GitHub', to: '#' },
        { label: 'Discord', to: '#' },
      ],
    },
  ];

  return (
    <footer 
      className="border-t mt-20"
      style={{
        backgroundColor: isDark ? '#040D12' : '#FCF9EA',
        borderColor: isDark ? '#3D5A5A' : '#D9D1CC'
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
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
              <span 
                className="text-lg font-bold"
                style={{color: isDark ? '#E7F6F2' : '#2C3333'}}
              >
                GrabGrid
              </span>
            </Link>
            <p 
              className="text-sm leading-relaxed"
              style={{color: isDark ? '#395B64' : '#5C6366'}}
            >
              Share, borrow, and connect with your community. Make the most of what you have.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="transition-colors text-lg"
                style={{
                  color: isDark ? '#395B64' : '#8B8B8B',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? '#6482AD' : '#5C8374';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? '#395B64' : '#8B8B8B';
                }}
              >
                𝕏
              </a>
              <a 
                href="#" 
                className="transition-colors text-lg"
                style={{
                  color: isDark ? '#395B64' : '#8B8B8B',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? '#6482AD' : '#5C8374';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? '#395B64' : '#8B8B8B';
                }}
              >
                👾
              </a>
              <a 
                href="#" 
                className="transition-colors text-lg"
                style={{
                  color: isDark ? '#395B64' : '#8B8B8B',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? '#6482AD' : '#5C8374';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? '#395B64' : '#8B8B8B';
                }}
              >
                💬
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 
                className="font-semibold mb-4 text-sm"
                style={{color: isDark ? '#E7F6F2' : '#2C3333'}}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors"
                      style={{
                        color: isDark ? '#395B64' : '#5C6366',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = isDark ? '#6482AD' : '#5C8374';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isDark ? '#395B64' : '#5C6366';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div 
          className="border-t pt-8"
          style={{borderColor: isDark ? '#3D5A5A' : '#D9D1CC'}}
        >
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <p 
                className="text-2xl font-bold"
                style={{color: isDark ? '#A5C9CA' : '#6482AD'}}
              >
                10K+
              </p>
              <p 
                className="text-xs"
                style={{color: isDark ? '#395B64' : '#5C6366'}}
              >
                Items Shared
              </p>
            </div>
            <div>
              <p 
                className="text-2xl font-bold"
                style={{color: isDark ? '#93B1A6' : '#7FA1C3'}}
              >
                5K+
              </p>
              <p 
                className="text-xs"
                style={{color: isDark ? '#395B64' : '#5C6366'}}
              >
                Active Users
              </p>
            </div>
            <div>
              <p 
                className="text-2xl font-bold"
                style={{color: isDark ? '#5C8374' : '#5C8374'}}
              >
                50K+
              </p>
              <p 
                className="text-xs"
                style={{color: isDark ? '#395B64' : '#5C6366'}}
              >
                Transactions
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p 
              className="text-sm"
              style={{color: isDark ? '#395B64' : '#5C6366'}}
            >
              © {currentYear} GrabGrid. All rights reserved. Made with ❤️ for communities.
            </p>
            <div className="flex gap-6 text-sm">
              <Link 
                to="/" 
                className="transition-colors"
                style={{
                  color: isDark ? '#395B64' : '#5C6366',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? '#6482AD' : '#5C8374';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? '#395B64' : '#5C6366';
                }}
              >
                Privacy
              </Link>
              <Link 
                to="/" 
                className="transition-colors"
                style={{
                  color: isDark ? '#395B64' : '#5C6366',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? '#6482AD' : '#5C8374';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? '#395B64' : '#5C6366';
                }}
              >
                Terms
              </Link>
              <Link 
                to="/" 
                className="transition-colors"
                style={{
                  color: isDark ? '#395B64' : '#5C6366',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? '#6482AD' : '#5C8374';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? '#395B64' : '#5C6366';
                }}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
