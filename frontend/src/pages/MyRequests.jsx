import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

const MyRequests = () => {
  const { isDark } = useTheme();
  const [requests, setRequests] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('incoming');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [requestsRes, borrowsRes] = await Promise.all([
        api.get('/borrow/my-requests'),
        api.get('/borrow/my-borrows'),
      ]);

      setRequests(requestsRes.data.borrows || []);
      setBorrows(borrowsRes.data.borrows || []);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (borrowId) => {
    setLoadingId(borrowId);
    setError('');
    setSuccess('');
    try {
      await api.post('/borrow/approve', { borrowId });
      setSuccess('Request approved successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchData();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to approve request';
      setError(errorMsg);
      console.error('Failed to approve', error);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (borrowId) => {
    setLoadingId(borrowId);
    setError('');
    setSuccess('');
    try {
      await api.post('/borrow/reject', { borrowId });
      setSuccess('Request rejected successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchData();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to reject request';
      setError(errorMsg);
      console.error('Failed to reject', error);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingId(null);
    }
  };

  const handleReturn = async (borrowId) => {
    setLoadingId(borrowId);
    setError('');
    setSuccess('');
    try {
      await api.post('/borrow/return', {
        borrowId,
        conditionOnReturn: 'Good',
      });
      setSuccess('Item returned successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchData();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to return item';
      setError(errorMsg);
      console.error('Failed to return item', error);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} text-center mb-8`}>
          Borrow Management
        </h1>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'incoming'
                ? 'bg-blue-600 text-white shadow-lg'
                : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Incoming Requests
          </button>
          <button
            onClick={() => setActiveTab('my-borrows')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'my-borrows'
                ? 'bg-blue-600 text-white shadow-lg'
                : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            My Borrows
          </button>
        </div>

        {/* Incoming Requests Tab */}
        {activeTab === 'incoming' && (
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              Borrow Requests for Your Items
            </h2>
            {requests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className={`border-l-4 border-blue-500 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}
                  >
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                      {request.itemId?.itemName}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <strong>Requested by:</strong> {request.borrowerId?.name}
                    </p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <strong>Room:</strong> {request.borrowerId?.hostelBlock},{' '}
                      {request.borrowerId?.roomNumber}
                    </p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                      <strong>Status:</strong>{' '}
                      <span className={`inline-block px-3 py-1 rounded font-semibold ${
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'Active' ? 'bg-green-100 text-green-800' :
                        request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </p>

                    {request.status === 'Pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(request._id)}
                          disabled={loadingId === request._id}
                          className={`flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                            loadingId === request._id ? 'opacity-50' : ''
                          }`}
                        >
                          {loadingId === request._id ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          disabled={loadingId === request._id}
                          className={`flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                            loadingId === request._id ? 'opacity-50' : ''
                          }`}
                        >
                          {loadingId === request._id ? 'Rejecting...' : 'Reject'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'} py-8`}>No borrow requests</p>
            )}
          </div>
        )}

        {/* My Borrows Tab */}
        {activeTab === 'my-borrows' && (
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              Items You Have Borrowed
            </h2>
            {borrows.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {borrows.map((borrow) => (
                  <div
                    key={borrow._id}
                    className={`border-l-4 border-green-500 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}
                  >
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                      {borrow.itemId?.itemName}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <strong>Owner:</strong> {borrow.ownerId?.name}
                    </p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <strong>Contact:</strong> {borrow.ownerId?.phoneNumber}
                    </p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <strong>Expected Return:</strong>{' '}
                      {new Date(borrow.expectedReturnDate).toLocaleDateString()}
                    </p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                      <strong>Status:</strong>{' '}
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {borrow.status}
                      </span>
                    </p>

                    {borrow.status === 'Active' && (
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        disabled={loadingId === borrow._id}
                        className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                          loadingId === borrow._id ? 'opacity-50' : ''
                        }`}
                      >
                        {loadingId === borrow._id ? 'Processing...' : 'Mark as Returned'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'} py-8`}>No borrowed items</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
