import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../../src/styles/authStyles.css';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
    // Redirect to dashboard if already logged in
    useEffect(() => {
      if (user) {
        navigate('/dashboard');
      }
    }, [user, navigate]);
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
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
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
        <img src="/login-3d.png" alt="login-illustration" className="illustration" />
        <h2 className="font-display text-4xl font-bold text-center mb-4 text-cyan-100 tracking-wide drop-shadow-lg">LOGIN</h2>
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-cyan-200 mb-2">USERNAME</label>
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

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#0a1a3a] text-cyan-100 font-bold py-3 rounded-lg mt-2 text-lg tracking-wide hover:bg-[#1a2a5a] transition disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'SUBMIT'}
          </button>
        </form>
        <div className="flex justify-between mt-6 text-cyan-200 text-base">
          <Link to="/register" className="hover:underline text-cyan-300">REGISTER</Link>
          <Link to="/forgot-password" className="hover:underline text-cyan-300">FORGOT PASSWORD</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
