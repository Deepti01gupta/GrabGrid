import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRatings = ({ userId }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/ratings/user/${userId}`);
        setRatings(res.data.ratings || []);
      } catch {
        setRatings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [userId]);

  if (loading) return <div>Loading ratings...</div>;
  if (!ratings.length) return <div>No ratings yet.</div>;

  return (
    <div className="user-ratings">
      <h3>User Reviews</h3>
      {ratings.map((r) => (
        <div key={r._id} className="rating-entry" style={{ borderBottom: '1px solid #eee', marginBottom: 8 }}>
          <div>
            <strong>{r.reviewerId?.name || 'User'}</strong> &nbsp;
            <span style={{ color: '#f5b50a' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
          </div>
          {r.review && <div style={{ marginTop: 4 }}>{r.review}</div>}
          <div style={{ fontSize: 12, color: '#888' }}>{new Date(r.createdAt).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
};

export default UserRatings;
