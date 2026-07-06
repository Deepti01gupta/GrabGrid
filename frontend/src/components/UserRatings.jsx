import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from './UI/index';

/**
 * UserRatings - premium styled review feed
 */
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
    if (userId) fetchRatings();
  }, [userId]);

  const renderStars = (count) => (
    <span>
      <span className="text-yellow-400">{'★'.repeat(count)}</span>
      <span className="text-yellow-400 opacity-30">{'★'.repeat(5 - count)}</span>
    </span>
  );

  if (loading) {
    return (
      <div>
        <h3 className="text-base font-bold text-text-primary mb-3">Reviews</h3>
        <div className="space-y-3">
          <Skeleton height="4rem" count={3} className="rounded-lg" />
        </div>
      </div>
    );
  }

  if (!ratings.length) {
    return (
      <div>
        <h3 className="text-base font-bold text-text-primary mb-3">Reviews</h3>
        <p className="text-text-muted text-sm text-center py-4">No reviews yet — be the first to lend or borrow! 🤝</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-base font-bold text-text-primary mb-4">
        Reviews <span className="text-text-muted font-normal text-sm">({ratings.length})</span>
      </h3>
      <div className="space-y-4">
        {ratings.map((r) => (
          <div
            key={r._id}
            className="p-4 rounded-xl bg-card-bg border border-card-border/50 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary uppercase">
                  {(r.reviewerId?.name || 'U').charAt(0)}
                </div>
                <span className="font-semibold text-sm text-text-primary">
                  {r.reviewerId?.name || 'Anonymous User'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                {renderStars(r.rating)}
                <span className="text-text-muted text-xs font-medium">({r.rating}/5)</span>
              </div>
            </div>
            {r.review && (
              <p className="text-text-secondary text-sm mt-2 leading-relaxed pl-9">{r.review}</p>
            )}
            <p className="text-text-muted text-xs mt-2 pl-9">
              {new Date(r.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRatings;
