import React from 'react';
import UserRatings from '../UserRatings';

const ProfileDetails = ({ user }) => {
  // Trust badge logic
  let trustBadge = 'Low Rating';
  let badgeColor = 'bg-red-200 text-red-800';
  if (user?.trustScore >= 4.5) {
    trustBadge = 'Trusted User';
    badgeColor = 'bg-green-200 text-green-800';
  } else if (user?.trustScore >= 3) {
    trustBadge = 'Active User';
    badgeColor = 'bg-yellow-200 text-yellow-800';
  }

  return (
    <div className="bg-white rounded shadow p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Profile Details</h2>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user?.profilePic?.url || '/default-avatar.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <div className="font-semibold text-lg">{user?.name}</div>
          <div className="text-gray-500">{user?.email}</div>
          <div className="text-sm text-gray-400 capitalize">Role: {user?.role}</div>
          <div className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-2 ${badgeColor}`}>{trustBadge}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div><span className="font-medium">Hostel Block:</span> {user?.hostelBlock}</div>
        <div><span className="font-medium">Room Number:</span> {user?.roomNumber}</div>
        <div><span className="font-medium">Phone:</span> {user?.phoneNumber}</div>
        <div>
          <span className="font-medium">Avg. Rating:</span> 
          <span style={{ color: '#f5b50a', marginLeft: 4 }}>
            {'★'.repeat(Math.round(user?.averageRating || 0))}
            {'☆'.repeat(5 - Math.round(user?.averageRating || 0))}
          </span>
          <span className="ml-2 text-xs text-gray-500">({user?.totalRatings || 0} ratings)</span>
        </div>
        <div><span className="font-medium">Trust Score:</span> {user?.trustScore?.toFixed(2) || 0}</div>
      </div>
      <UserRatings userId={user?._id} />
    </div>
  );
};

export default ProfileDetails;
