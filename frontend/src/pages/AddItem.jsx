import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useTheme } from '../context/ThemeContext';

const AddItem = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Book',
    condition: 'Good',
    description: '',
    hostelBlock: '',
    roomNumber: '',
    securityDeposit: 0,
    borrowDuration: 7,
    availableFrom: '',
    availableUntil: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      await api.post('/items', formData);
      navigate('/items');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-2xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
        <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 text-center`}>
          Add New Item to Share
        </h2>
        <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>Fill in the details about your item</p>

        {error && (
          <div className={`border px-4 py-3 rounded-lg mb-6 ${isDark ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="itemName" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
              Item Name *
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              placeholder="e.g., Data Structures Book"
              value={formData.itemName}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="Book">Book</option>
                <option value="Lab Kit">Lab Kit</option>
                <option value="Appliance">Appliance</option>
                <option value="Sports Equipment">Sports Equipment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="condition" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Used">Used</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your item in detail..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 resize-none ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="hostelBlock" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Hostel Block *
              </label>
              <input
                type="text"
                id="hostelBlock"
                name="hostelBlock"
                placeholder="e.g., Block A"
                value={formData.hostelBlock}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <div>
              <label htmlFor="roomNumber" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Room Number *
              </label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                placeholder="e.g., 101"
                value={formData.roomNumber}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="borrowDuration" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Borrow Duration (days) *
              </label>
              <input
                type="number"
                id="borrowDuration"
                name="borrowDuration"
                min="1"
                max="90"
                value={formData.borrowDuration}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <div>
              <label htmlFor="securityDeposit" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Security Deposit (₹)
              </label>
              <input
                type="number"
                id="securityDeposit"
                name="securityDeposit"
                min="0"
                value={formData.securityDeposit}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="availableFrom" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Available From *
              </label>
              <input
                type="date"
                id="availableFrom"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <div>
              <label htmlFor="availableUntil" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Available Until *
              </label>
              <input
                type="date"
                id="availableUntil"
                name="availableUntil"
                value={formData.availableUntil}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-60"
          >
            {loading ? 'Adding Item...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
