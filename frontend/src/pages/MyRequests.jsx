import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Button, Card, Alert, EmptyState, Badge, Skeleton } from '../components/UI/index';
import { componentClasses } from '../styles/designSystem';

/**
 * Modern Borrow Management dashboard (MyRequests.jsx)
 * Handles incoming borrow requests and user's current borrows
 */
const MyRequests = () => {

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
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch requests data');
      console.error('Failed to fetch borrow lists:', err);
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
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve request');
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
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject request');
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
      setSuccess('Item marked as returned successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process item return');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const maps = {
      'Pending': { variant: 'warning', text: '⏳ Pending' },
      'Active': { variant: 'success', text: '✓ Active' },
      'Approved': { variant: 'success', text: '✓ Approved' },
      'Rejected': { variant: 'error', text: '✕ Rejected' },
      'Returned': { variant: 'primary', text: '📦 Returned' }
    };
    return maps[status] || { variant: 'primary', text: status };
  };

  return (
    <div className="min-h-screen bg-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className={componentClasses.text.h1}>Borrow Management</h1>
          <p className={`${componentClasses.text.muted} mt-2`}>
            Track items you are lending or borrowing from hostel mates
          </p>
        </div>

        {/* Global Notifications */}
        {error && (
          <Alert
            type="error"
            title="Action Failed"
            message={error}
            onClose={() => setError('')}
            className="mb-6"
          />
        )}

        {success && (
          <Alert
            type="success"
            title="Action Succeeded"
            message={success}
            className="mb-6"
          />
        )}

        {/* Tab Buttons */}
        <div className="flex gap-2 justify-center mb-8 bg-surface/50 p-1.5 rounded-xl max-w-sm mx-auto border border-card-border/40">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'incoming'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Lending Requests
          </button>
          <button
            onClick={() => setActiveTab('my-borrows')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'my-borrows'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            My Borrows
          </button>
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="space-y-6">
            <Skeleton height="8rem" count={2} />
          </div>
        ) : (
          /* Incoming tab */
          activeTab === 'incoming' ? (
            <Card className="p-6 md:p-8">
              <h2 className={`${componentClasses.text.h3} mb-6 flex justify-between items-center`}>
                <span>Borrow Requests for Your Items</span>
                <Badge variant="primary" className="text-sm">{requests.length}</Badge>
              </h2>

              {requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requests.map((req) => (
                    <Card key={req._id} className="p-5 border-l-4 border-l-primary flex flex-col justify-between h-full bg-surface/10 hover:shadow-md">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-text-primary">
                            {req.itemId?.itemName || 'Deleted Item'}
                          </h3>
                          <Badge variant={getStatusBadge(req.status).variant}>
                            {getStatusBadge(req.status).text}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-sm text-text-secondary mb-4">
                          <p>👤 <strong>Borrower:</strong> {req.borrowerId?.name}</p>
                          <p>🏢 <strong>Location:</strong> {req.borrowerId?.hostelBlock}, Room {req.borrowerId?.roomNumber}</p>
                          <p>📅 <strong>Requested:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {req.status === 'Pending' && (
                        <div className="flex gap-2 pt-3 border-t border-card-border/30 mt-auto">
                          <Button
                            variant="success"
                            size="sm"
                            className="flex-1"
                            disabled={loadingId === req._id}
                            onClick={() => handleApprove(req._id)}
                          >
                            {loadingId === req._id ? '...' : 'Approve'}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="flex-1"
                            disabled={loadingId === req._id}
                            onClick={() => handleReject(req._id)}
                          >
                            {loadingId === req._id ? '...' : 'Reject'}
                          </Button>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="🔔"
                  title="No requests received"
                  description="When other students request your listed items, they will appear here."
                />
              )}
            </Card>
          ) : (
            /* My borrows tab */
            <Card className="p-6 md:p-8">
              <h2 className={`${componentClasses.text.h3} mb-6 flex justify-between items-center`}>
                <span>Items You Have Borrowed</span>
                <Badge variant="success" className="text-sm">{borrows.length}</Badge>
              </h2>

              {borrows.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {borrows.map((borrow) => (
                    <Card key={borrow._id} className="p-5 border-l-4 border-l-success flex flex-col justify-between h-full bg-surface/10 hover:shadow-md">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-text-primary">
                            {borrow.itemId?.itemName || 'Deleted Item'}
                          </h3>
                          <Badge variant={getStatusBadge(borrow.status).variant}>
                            {getStatusBadge(borrow.status).text}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-sm text-text-secondary mb-4">
                          <p>👤 <strong>Owner:</strong> {borrow.ownerId?.name}</p>
                          <p>📞 <strong>Phone:</strong> {borrow.ownerId?.phoneNumber || 'Not provided'}</p>
                          <p>📅 <strong>Expected Return:</strong> {new Date(borrow.expectedReturnDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {borrow.status === 'Active' && (
                        <div className="pt-3 border-t border-card-border/30 mt-auto">
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full"
                            disabled={loadingId === borrow._id}
                            onClick={() => handleReturn(borrow._id)}
                          >
                            {loadingId === borrow._id ? 'Processing...' : 'Mark as Returned'}
                          </Button>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="📥"
                  title="No borrows active"
                  description="You are not currently borrowing any items from others."
                  action={
                    <Button variant="primary" size="sm" onClick={() => window.location.href='/items'} icon="🔍">
                      Browse Items
                    </Button>
                  }
                />
              )}
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default MyRequests;
