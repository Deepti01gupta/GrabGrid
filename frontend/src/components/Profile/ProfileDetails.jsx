import React from 'react';
import UserRatings from '../UserRatings';
import { Card, Badge } from '../UI/index';
import { componentClasses } from '../../styles/designSystem';

/**
 * Professional ProfileDetails card for the Profile Page
 */
const ProfileDetails = ({ user }) => {
  // Trust badge logic
  let trustBadge = 'Low Rating';
  let badgeVariant = 'error';
  if (user?.trustScore >= 4.5) {
    trustBadge = '⭐ Highly Trusted';
    badgeVariant = 'success';
  } else if (user?.trustScore >= 3.0) {
    trustBadge = '✓ Active Member';
    badgeVariant = 'primary';
  }

  const renderStars = (rating) => {
    const active = Math.round(rating || 0);
    return (
      <span className="text-yellow-500 font-medium">
        {'★'.repeat(active)}
        <span className="opacity-30">{'★'.repeat(5 - active)}</span>
      </span>
    );
  };

  return (
    <Card className="p-6 md:p-8 shadow-md mb-6">
      <h2 className={`${componentClasses.text.h3} mb-6`}>Profile Overview</h2>
      
      {/* Profile Header Block */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-card-border/40 mb-6">
        <img
          src={user?.profilePic?.url || '/default-avatar.png'}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full object-cover border border-card-border shadow-sm flex-shrink-0"
        />
        <div className="text-center sm:text-left flex-1 min-w-0">
          <h3 className={`${componentClasses.text.h3} truncate`}>{user?.name}</h3>
          <p className="text-text-secondary text-sm mt-1">{user?.email}</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
            <Badge variant="primary" className="capitalize text-xs font-semibold">
              Role: {user?.role || 'Student'}
            </Badge>
            <Badge variant={badgeVariant} className="text-xs font-semibold">
              {trustBadge}
            </Badge>
          </div>
        </div>
      </div>

      {/* Profile Data Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8 text-sm">
        <div>
          <span className="block text-text-muted text-xs uppercase tracking-wider font-semibold">Hostel Block</span>
          <span className="font-semibold text-text-primary text-base mt-0.5 block">{user?.hostelBlock || '—'}</span>
        </div>
        <div>
          <span className="block text-text-muted text-xs uppercase tracking-wider font-semibold">Room Number</span>
          <span className="font-semibold text-text-primary text-base mt-0.5 block">{user?.roomNumber || '—'}</span>
        </div>
        <div>
          <span className="block text-text-muted text-xs uppercase tracking-wider font-semibold">Phone Number</span>
          <span className="font-semibold text-text-primary text-base mt-0.5 block">{user?.phoneNumber || '—'}</span>
        </div>
        <div>
          <span className="block text-text-muted text-xs uppercase tracking-wider font-semibold">Average Rating</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-base font-bold text-text-primary">{(user?.averageRating || 0).toFixed(1)}</span>
            {renderStars(user?.averageRating)}
            <span className="text-xs text-text-muted">({user?.totalRatings || 0} reviews)</span>
          </div>
        </div>
        <div>
          <span className="block text-text-muted text-xs uppercase tracking-wider font-semibold">Trust Score</span>
          <span className="font-bold text-text-primary text-base mt-0.5 block">
            {(user?.trustScore || 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* User Reviews */}
      <div className="pt-6 border-t border-card-border/40">
        <UserRatings userId={user?._id} />
      </div>
    </Card>
  );
};

export default ProfileDetails;
