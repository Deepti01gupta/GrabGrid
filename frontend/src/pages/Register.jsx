import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import '../../src/styles/authStyles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    hostelBlock: '',
    roomNumber: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { isDark } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-[#181a2a] relative overflow-hidden">
      {/* Background Circles */}
      <div className="bg-circles">
        <div className="bg-circle one"></div>
        <div className="bg-circle two"></div>
      </div>
      {/* Glass Card */}
      <div className="glass-card p-10 max-w-md w-full flex flex-col relative z-10">
        {/* Illustration Placeholder (replace src with your asset) */}
        <img src="/login-3d.png" alt="register-illustration" className="illustration" />
        <h2 className="font-display text-4xl font-bold text-center mb-4 text-cyan-100 tracking-wide drop-shadow-lg">REGISTER</h2>
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-cyan-200 mb-2">FULL NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg bg-[#23264a] text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg tracking-wide"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-cyan-200 mb-2">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg bg-[#23264a] text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg tracking-wide"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-cyan-200 mb-2">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg bg-[#23264a] text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg tracking-wide"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="hostelBlock" className="block text-sm font-semibold text-cyan-200 mb-2">HOSTEL BLOCK</label>
              <input
                type="text"
                id="hostelBlock"
                name="hostelBlock"
                placeholder="e.g., Block A"
                value={formData.hostelBlock}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-none rounded-lg bg-[#23264a] text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg tracking-wide"
              />
            </div>
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-semibold text-cyan-200 mb-2">ROOM NUMBER</label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                placeholder="e.g., 101"
                value={formData.roomNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-none rounded-lg bg-[#23264a] text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg tracking-wide"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-cyan-200 mb-2">PHONE NUMBER</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg bg-[#23264a] text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg tracking-wide"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#0a1a3a] text-cyan-100 font-bold py-3 rounded-lg mt-2 text-lg tracking-wide hover:bg-[#1a2a5a] transition disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'SUBMIT'}
          </button>
        </form>
        <div className="flex justify-between mt-6 text-cyan-200 text-base">
          <Link to="/login" className="hover:underline text-cyan-300">LOGIN</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
