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
    securityDeposit: 0,
    borrowDuration: 7,
    availableFrom: '',
    availableUntil: '',
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          imageUrl: reader.result,
        });
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({
      ...formData,
      imageUrl: '',
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

          <div>
            <label htmlFor="itemImage" className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
              Item Image (Optional)
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${isDark ? 'border-gray-600 hover:border-blue-500 bg-gray-700' : 'border-gray-300 hover:border-blue-500 bg-gray-50'}`}>
              <input
                type="file"
                id="itemImage"
                name="itemImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="itemImage" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg mx-auto" />
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className={`mx-auto h-12 w-12 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-4-8l-6 6m6-6l-6-6m6 6h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Upload Item Image</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>PNG, JPG, GIF, WEBP up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className={`mt-2 text-sm ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'} font-medium`}
              >
                Remove Image
              </button>
            )}
          </div>

          <div className={`${isDark ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-300'} border rounded-lg p-4 mb-6`}>
            <p className={`text-sm font-medium ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
              ℹ️ Hostel Block and Room Number will be auto-populated from your profile
            </p>
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
