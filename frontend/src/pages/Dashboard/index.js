import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/axios';
import { Button, Card, Alert, EmptyState, StatCard, Badge, Skeleton } from '../../components/UI/index';
import ItemCard from '../../components/ItemCard';
import { componentClasses } from '../../styles/designSystem';

/**
 * Professional Dashboard Page
 * Modern, responsive layout with improved UX and visual hierarchy
 */
const Dashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  // State Management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [_actionLoading, setActionLoading] = useState(null); // eslint-disable-line no-unused-vars

  const [dashboard, setDashboard] = useState({
    ownedItems: [],
    borrowedItems: [],
    pendingRequests: [],
    returnedItems: [],
    overdueItems: [],
    history: [],
  });

  const [myRequests, setMyRequests] = useState([]);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [dashRes, reqRes] = await Promise.all([
        api.get('/dashboard'),
        api.get('/borrow/my-borrows'),
      ]);
      
      setDashboard(dashRes.data);
      setMyRequests(reqRes.data.borrows || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle borrow request approval
  const handleApproveBorrow = async (borrowId) => {
    try {
      setActionLoading(borrowId);
      await api.post('/borrow/approve', { borrowId });
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve request');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle borrow request rejection
  const handleRejectBorrow = async (borrowId) => {
    try {
      setActionLoading(borrowId);
      await api.post('/borrow/reject', { borrowId });
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject request');
    } finally {
      setActionLoading(null);
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'added', label: 'My Items', icon: '📦', count: dashboard.ownedItems.length },
    { id: 'borrowed', label: 'Borrowed', icon: '📥', count: dashboard.borrowedItems.length },
    { id: 'my-requests', label: 'Requests Sent', icon: '📤', count: myRequests.length },
    { id: 'requests', label: 'Incoming', icon: '🔔', count: dashboard.pendingRequests.length },
    { id: 'history', label: 'History', icon: '📜', count: dashboard.history?.length || 0 },
  ];

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'} py-8`}>
        <div className={componentClasses.container}>
          <Skeleton count={3} height="2rem" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton height="10rem" />
            <Skeleton height="10rem" />
            <Skeleton height="10rem" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'} py-8`}>
        <div className={componentClasses.container}>
          <Alert
            type="error"
            title="Failed to Load Dashboard"
            message={error}
            onClose={() => setError(null)}
          />
          <div className="mt-6 flex justify-center">
            <Button variant="primary" onClick={fetchDashboardData}>
              🔄 Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'} transition-colors duration-200`}>
      
      {/* Header Section */}
      <div className={`${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} border-b`}>
        <div className={componentClasses.container + ' py-8'}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className={componentClasses.text.h1}>Dashboard</h1>
              <p className={componentClasses.text.muted + ' mt-2'}>
                Welcome back, <span className="font-semibold text-neutral-600 dark:text-neutral-400">{user?.name}</span> 👋
              </p>
            </div>
            <Button
              variant="primary"
              icon="➕"
              onClick={() => navigate('/add-item')}
              className="hidden sm:inline-flex"
            >
              Add New Item
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} border-b sticky top-16 z-[98]`}>
        <div className={componentClasses.container}>
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-teal-400'
                    : `border-transparent ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}`
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && (
                  <Badge variant="primary" className="text-xs ml-1">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={componentClasses.container + ' py-8'}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Profile Information Card */}
            <Card className="overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-500 to-teal-500 relative" />
              
              <div className="px-6 pb-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row gap-4 -mt-12 mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center text-4xl font-bold text-white flex-shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 mt-8 sm:mt-0">
                    <h2 className={componentClasses.text.h3}>{user?.name}</h2>
                    <p className={componentClasses.text.muted}>{user?.email}</p>
                  </div>
                </div>

                {/* Personal Details */}
                <div>
                  <h3 className={componentClasses.text.h4 + ' mb-4 text-neutral-700 dark:text-neutral-300'}>
                    Personal Information
                  </h3>
                  <div className={componentClasses.grid.cols2 + ' gap-4'}>
                    {[
                      { label: 'Full Name', value: user?.name },
                      { label: 'Email', value: user?.email },
                      { label: 'Phone Number', value: user?.phoneNumber },
                      { label: 'Hostel Block', value: user?.hostelBlock },
                      { label: 'Room Number', value: user?.roomNumber },
                    ].map(field => (
                      <div key={field.label}>
                        <p className={componentClasses.text.muted}>{field.label}</p>
                        <p className="font-medium text-neutral-900 dark:text-white mt-1">{field.value || '—'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Credibility & Statistics */}
            <div>
              <h2 className={componentClasses.text.h2 + ' mb-6'}>Your Statistics</h2>
              
              <div className={componentClasses.grid.cols4}>
                <StatCard
                  icon="⭐"
                  label="Trust Score"
                  value={user?.trustScore || 0}
                  color="blue"
                />
                <StatCard
                  icon="⭐"
                  label="Avg. Rating"
                  value={(user?.averageRating || 0).toFixed(1)}
                  color="purple"
                />
                <StatCard
                  icon="👍"
                  label="Total Ratings"
                  value={user?.totalRatings || 0}
                  color="green"
                />
                <StatCard
                  icon="💰"
                  label="Total Earnings"
                  value={`₹${(user?.totalEarnings || 0).toLocaleString()}`}
                  color="orange"
                />
                <StatCard
                  icon="📦"
                  label="Items Shared"
                  value={user?.itemsShared || 0}
                  color="blue"
                />
                <StatCard
                  icon="📥"
                  label="Items Borrowed"
                  value={user?.itemsBorrowed || 0}
                  color="purple"
                />
                <StatCard
                  icon="📊"
                  label="Active Borrows"
                  value={dashboard.borrowedItems.length}
                  color="green"
                />
                <StatCard
                  icon="⏳"
                  label="Pending Requests"
                  value={dashboard.pendingRequests.length}
                  color="orange"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to share more? 🚀</h3>
              <p className="opacity-90 mb-6">Add your items to help others and earn credits!</p>
              <Button
                variant="primary"
                onClick={() => navigate('/add-item')}
                icon="➕"
              >
                Add Your First Item
              </Button>
            </div>
          </div>
        )}

        {/* MY ITEMS TAB */}
        {activeTab === 'added' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={componentClasses.text.h2}>Items You've Added</h2>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {dashboard.ownedItems.length} items
              </span>
            </div>

            {dashboard.ownedItems.length > 0 ? (
              <div className={componentClasses.grid.cols3}>
                {dashboard.ownedItems.map(item => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    type="owned"
                    showActions={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📦"
                title="No items added yet"
                description="Start sharing your items with the community!"
                action={
                  <Button
                    variant="primary"
                    onClick={() => navigate('/add-item')}
                    icon="➕"
                  >
                    Add Your First Item
                  </Button>
                }
              />
            )}
          </div>
        )}

        {/* BORROWED ITEMS TAB */}
        {activeTab === 'borrowed' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={componentClasses.text.h2}>Items You've Borrowed</h2>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {dashboard.borrowedItems.length} items
              </span>
            </div>

            {dashboard.borrowedItems.length > 0 ? (
              <div className={componentClasses.grid.cols2}>
                {dashboard.borrowedItems.map(item => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    type="borrowed"
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📥"
                title="No borrowed items"
                description="Browse and borrow items from other users!"
                action={
                  <Button
                    variant="primary"
                    onClick={() => navigate('/items')}
                    icon="🔍"
                  >
                    Browse Items
                  </Button>
                }
              />
            )}
          </div>
        )}

        {/* REQUESTS SENT TAB */}
        {activeTab === 'my-requests' && (
          <div>
            <div className="mb-6">
              <h2 className={componentClasses.text.h2}>Requests You've Sent</h2>
              <p className={componentClasses.text.muted + ' mt-1'}>
                Track all the borrowing requests you've made
              </p>
            </div>

            {myRequests.length > 0 ? (
              <div className={componentClasses.grid.cols3}>
                {myRequests.map(req => (
                  <ItemCard
                    key={req._id}
                    item={req}
                    type="borrowed"
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📤"
                title="No requests sent"
                description="Browse items and send a borrow request!"
                action={
                  <Button
                    variant="primary"
                    onClick={() => navigate('/items')}
                    icon="🔍"
                  >
                    Browse Items
                  </Button>
                }
              />
            )}
          </div>
        )}

        {/* INCOMING REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className={componentClasses.text.h2}>Incoming Requests</h2>
                <p className={componentClasses.text.muted + ' mt-1'}>
                  Requests from others to borrow your items
                </p>
              </div>
              <Badge variant="danger">{dashboard.pendingRequests.length}</Badge>
            </div>

            {dashboard.pendingRequests.length > 0 ? (
              <div className={componentClasses.grid.cols2}>
                {dashboard.pendingRequests.map(req => (
                  <ItemCard
                    key={req._id}
                    item={req}
                    type="request"
                    onAction={(borrowId, action) => {
                      if (action === 'approve') {
                        handleApproveBorrow(borrowId);
                      } else if (action === 'reject') {
                        handleRejectBorrow(borrowId);
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="🔔"
                title="No pending requests"
                description="When others request your items, they'll appear here."
              />
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div>
            <h2 className={componentClasses.text.h2 + ' mb-6'}>Request History</h2>

            {dashboard.history && dashboard.history.length > 0 ? (
              <div className="space-y-4">
                {dashboard.history.map(req => (
                  <Card key={req._id} className="hover:shadow-lg transition-shadow">
                    <div className="p-6 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={componentClasses.text.h4}>
                          {req.itemId?.name || 'Unknown Item'}
                        </h3>
                        <div className="flex gap-4 mt-3 text-sm">
                          <span className={componentClasses.text.muted}>
                            From: {req.borrowerId?.name || 'Unknown'}
                          </span>
                          <span className={componentClasses.text.muted}>
                            {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge variant={req.status === 'Active' ? 'success' : 'danger'}>
                        {req.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📜"
                title="No history"
                description="Your request history will appear here."
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
