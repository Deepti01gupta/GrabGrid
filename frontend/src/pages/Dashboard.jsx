import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [actionLoading, setActionLoading] = useState(null);

  const [dashboard, setDashboard] = useState({
    ownedItems: [],
    borrowedItems: [],
    pendingRequests: [],
    returnedItems: [],
    overdueItems: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/dashboard');
      setDashboard(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBorrow = async (borrowId) => {
    try {
      setActionLoading(borrowId);
      await api.post('/borrow/approve', { borrowId });
      alert('Request approved! Notification sent to borrower.');
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve request');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectBorrow = async (borrowId) => {
    try {
      setActionLoading(borrowId);
      await api.post('/borrow/reject', { borrowId });
      alert('Request rejected! Notification sent to borrower.');
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject request');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-lg font-semibold mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
          <button 
            onClick={fetchDashboardData} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'borrowed', label: 'Borrowed', icon: '📥' },
    { id: 'added', label: 'My Items', icon: '📦' },
    { id: 'requests', label: 'Requests', icon: '🔔' },
    { id: 'history', label: 'History', icon: '📜' },
  ];

  const StatCard = ({ label, value, icon }) => (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
      <p className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{value}</p>
    </div>
  );

  const ItemCard = ({ item, type }) => {
    let title, details;
    
    if (type === 'owned') {
      title = item.name;
      details = [
        { label: 'Category', value: item.category },
        { label: 'Condition', value: item.condition },
      ];
    } else if (type === 'borrowed') {
      title = item.itemId?.name || 'Unknown Item';
      details = [
        { label: 'Status', value: item.status },
        { label: 'Borrowed from', value: item.ownerId?.name || 'Unknown' },
      ];
    } else if (type === 'request') {
      title = item.itemId?.name || 'Unknown Item';
      details = [
        { label: 'From', value: item.borrowerId?.name || 'Unknown' },
        { label: 'Status', value: item.status },
      ];
    } else if (type === 'returned') {
      title = item.itemId?.name || 'Unknown Item';
      details = [
        { label: 'Returned by', value: item.borrowerId?.name || 'Unknown' },
        { label: 'Date returned', value: new Date(item.returnedDate).toLocaleDateString() },
      ];
    }

    return (
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 shadow-sm hover:shadow-md transition`}>
        <h3 className={`font-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <div className="space-y-2 mb-4">
          {details?.map((detail, idx) => (
            <div key={idx} className="flex justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{detail.label}:</span>
              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{detail.value}</span>
            </div>
          ))}
        </div>
        
        {/* Action Buttons for Request Tab */}
        {type === 'request' && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleApproveBorrow(item._id)}
              disabled={actionLoading === item._id}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
            >
              {actionLoading === item._id ? '...' : '✓ Accept'}
            </button>
            <button
              onClick={() => handleRejectBorrow(item._id)}
              disabled={actionLoading === item._id}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
            >
              {actionLoading === item._id ? '...' : '✗ Reject'}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back, {user?.name}!</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-6 flex gap-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 font-semibold text-sm border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : `border-transparent ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Profile Card */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-8 shadow-sm`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Full Name</p>
                  <p className={`text-lg font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                  <p className={`text-lg font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatCard label="Items Owned" value={dashboard.ownedItems.length} icon="📦" />
                <StatCard label="Borrowed" value={dashboard.borrowedItems.length} icon="📥" />
                <StatCard label="Pending" value={dashboard.pendingRequests.length} icon="⏳" />
                <StatCard label="Returned" value={dashboard.returnedItems.length} icon="✅" />
                <StatCard label="Overdue" value={dashboard.overdueItems.length} icon="⚠️" />
              </div>
            </div>
          </div>
        )}

        {/* BORROWED */}
        {activeTab === 'borrowed' && (
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Items You've Borrowed</h2>
            {dashboard.borrowedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboard.borrowedItems.map(item => (
                  <ItemCard key={item._id} item={item} type="borrowed" />
                ))}
              </div>
            ) : (
              <p className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No borrowed items</p>
            )}
          </div>
        )}

        {/* ADDED */}
        {activeTab === 'added' && (
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Items You've Added</h2>
            {dashboard.ownedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboard.ownedItems.map(item => (
                  <div key={item._id} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 shadow-sm hover:shadow-md transition overflow-hidden`}>
                    {/* Item Image */}
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <h3 className={`font-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name || item.itemName}</h3>
                    
                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Category:</span>
                        <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{item.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Condition:</span>
                        <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{item.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status:</span>
                        <span className={`font-medium px-2 py-1 rounded text-xs ${
                          item.status === 'Available' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          item.status === 'Borrowed' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>{item.status}</span>
                      </div>
                      {item.description && (
                        <div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.description.substring(0, 80)}...</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.location.href = `/items/${item._id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                      >
                        📋 View
                      </button>
                      <button
                        onClick={() => window.location.href = `/items/${item._id}/edit`}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition"
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No items added yet</p>
            )}
          </div>
        )}

        {/* REQUESTS */}
        {activeTab === 'requests' && (
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pending Requests</h2>
            {dashboard.pendingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboard.pendingRequests.map(req => (
                  <ItemCard key={req._id} item={req} type="request" />
                ))}
              </div>
            ) : (
              <p className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No pending requests</p>
            )}
          </div>
        )}

        {/* HISTORY */}
        {activeTab === 'history' && (
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Request History</h2>
            {dashboard.history && dashboard.history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboard.history.map(req => (
                  <div key={req._id} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 shadow-sm hover:shadow-md transition`}>
                    <h3 className={`font-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.itemId?.name || 'Unknown Item'}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Requester:</span>
                        <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{req.borrowerId?.name || 'Unknown'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status:</span>
                        <span className={`font-medium px-2 py-1 rounded text-xs ${
                          req.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          req.status === 'Rejected' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>{req.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date:</span>
                        <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No history available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;