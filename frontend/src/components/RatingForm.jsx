import React, { useState } from 'react';
import axios from 'axios';

const StarRating = ({ value, onChange }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= value ? 'star filled' : 'star'}
          onClick={() => onChange(star)}
          style={{ cursor: 'pointer', fontSize: 24 }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const RatingForm = ({ reviewedUserId, itemId, borrowId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('/api/ratings/add', {
        reviewedUserId,
        itemId,
        borrowId,
        rating,
        review,
      });
      setSuccess('Rating submitted!');
      setRating(0);
      setReview('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rating-form">
      <label>Rate this user:</label>
      <StarRating value={rating} onChange={setRating} />
      <textarea
        placeholder="Write a review (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={3}
        style={{ width: '100%', marginTop: 8 }}
      />
      <button type="submit" disabled={loading || rating < 1} style={{ marginTop: 8 }}>
        {loading ? 'Submitting...' : 'Submit Rating'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
    </form>
  );
};

export default RatingForm;
