import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader';

const ItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark } = useTheme();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/items/${itemId}`);
        setItem(response.data.item);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const isOwner = item && user && item.ownerId._id === user._id;

  const handleBorrowRequest = async () => {
    try {
      setRequestLoading(true);
      setError('');

      console.log('📤 Sending borrow request for item:', itemId);

      const response = await api.post('/borrow/request', { itemId });

      console.log('✅ Borrow request sent:', response.data);

      setSuccessMessage('Borrow request sent successfully!');
      setRequestSent(true);

      // Auto-dismiss success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/my-requests');
      }, 3000);
    } catch (err) {
      console.error('❌ Borrow request error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to send borrow request');
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!item) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`text-center p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>Item not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 flex items-center gap-2 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-semibold transition`}
        >
          ← Back
        </button>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden`}>
          {/* Image Section */}
          <div className="h-96 bg-gray-100 overflow-hidden">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-red-900 border border-red-700 text-red-200' : 'bg-red-100 border border-red-400 text-red-700'}`}>
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-green-900 border border-green-700 text-green-200' : 'bg-green-100 border border-green-400 text-green-700'}`}>
                ✅ {successMessage}
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  item.category === 'Book' ? 'bg-blue-100 text-blue-800' :
                  item.category === 'Lab Kit' ? 'bg-red-100 text-red-800' :
                  item.category === 'Appliance' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.category}
                </span>
              </div>
              <div>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  item.condition === 'New' ? 'bg-green-100 text-green-800' :
                  item.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.condition}
                </span>
              </div>
              <div>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  item.status === 'Available' ? 'bg-green-100 text-green-800' :
                  item.status === 'Requested' ? 'bg-yellow-100 text-yellow-800' :
                  item.status === 'Borrowed' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>

            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {item.itemName}
            </h1>

            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 leading-relaxed`}>
              {item.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Item Details */}
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Item Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Category:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Condition:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Borrow Duration:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.borrowDuration} days</span>
                  </div>
                  {item.securityDeposit > 0 && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Security Deposit:</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{item.securityDeposit}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Available From:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(item.availableFrom).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Available Until:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(item.availableUntil).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Owner Details */}
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Owner Details</h2>
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Owner Name</p>
                    <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.ownerId?.name}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Block {item.hostelBlock}, Room {item.roomNumber}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Rating</p>
                    <p className={`font-semibold text-lg`}>
                      <span className="text-yellow-500">⭐ {(item.ownerId?.rating || 0).toFixed(1)}/5</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {isOwner ? (
                <div className={`flex-1 p-4 rounded-lg text-center ${isDark ? 'bg-amber-900 border border-amber-700' : 'bg-amber-100 border border-amber-400'}`}>
                  <p className={isDark ? 'text-amber-200' : 'text-amber-700'}>
                    This is your item. You cannot send a borrow request for your own item.
                  </p>
                </div>
              ) : item.status !== 'Available' ? (
                <div className={`flex-1 p-4 rounded-lg text-center ${isDark ? 'bg-red-900 border border-red-700' : 'bg-red-100 border border-red-400'}`}>
                  <p className={isDark ? 'text-red-200' : 'text-red-700'}>
                    This item is currently not available for borrowing.
                  </p>
                </div>
              ) : requestSent ? (
                <div className={`flex-1 p-4 rounded-lg text-center ${isDark ? 'bg-green-900 border border-green-700' : 'bg-green-100 border border-green-400'}`}>
                  <p className={isDark ? 'text-green-200' : 'text-green-700'}>
                    ✅ Your request has been sent!
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleBorrowRequest}
                  disabled={requestLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition disabled:opacity-60"
                >
                  {requestLoading ? 'Sending Request...' : 'Send Borrow Request'}
                </button>
              )}

              <button
                onClick={() => navigate('/items')}
                className={`px-6 py-3 rounded-lg font-bold border transition ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
