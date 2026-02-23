import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="font-bold text-lg text-gray-900 flex-1">{item.itemName}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
          item.category === 'Book' ? 'bg-blue-100 text-blue-800' :
          item.category === 'Lab Kit' ? 'bg-red-100 text-red-800' :
          item.category === 'Appliance' ? 'bg-orange-100 text-orange-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

      <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm space-y-1">
        <p><strong>Condition:</strong> {item.condition}</p>
        <p><strong>Duration:</strong> {item.borrowDuration} days</p>
        {item.securityDeposit > 0 && (
          <p><strong>Security Deposit:</strong> ₹{item.securityDeposit}</p>
        )}
      </div>

      <div className="border-t pt-3 mt-auto">
        <h4 className="font-semibold text-gray-900">{item.ownerId?.name}</h4>
        <p className="text-sm text-gray-600">Block {item.ownerId?.hostelBlock}, Room {item.ownerId?.roomNumber}</p>
        <p className="text-sm text-yellow-500 font-semibold">
          {getRatingStars(item.ownerId?.rating)} ({item.ownerId?.rating}/5)
        </p>
      </div>

      <Link to={`/item/${item._id}`} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold">
        View Details
      </Link>
    </div>
  );
};

export default ItemCard;
