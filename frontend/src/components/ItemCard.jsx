import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col h-full overflow-hidden w-72 mx-auto text-[1.1rem]">
      {/* Image Container - always visible, smaller card */}
      <div className="relative h-36 bg-gray-100 overflow-hidden flex items-center justify-center">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.itemName}
            className="w-full h-full object-cover"
            style={{ maxHeight: '144px', minHeight: '144px' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content Container - compact and clear */}
      <div className="p-3 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-gray-900 truncate" title={item.itemName}>{item.itemName}</h3>
          <span className={`px-2 py-0.5 rounded-full text-sm font-semibold whitespace-nowrap ${
            item.category === 'Book' ? 'bg-blue-100 text-blue-800' :
            item.category === 'Lab Kit' ? 'bg-red-100 text-red-800' :
            item.category === 'Appliance' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {item.category}
          </span>
        </div>
        <div className="text-gray-700 text-base mb-2 line-clamp-2">{item.description}</div>
        <div className="grid grid-cols-2 gap-1 text-base mb-2">
          <div><span className="font-semibold">Condition:</span> {item.condition || '-'}</div>
          <div><span className="font-semibold">Duration:</span> {item.borrowDuration} days</div>
          <div><span className="font-semibold">Deposit:</span> {item.securityDeposit > 0 ? `₹${item.securityDeposit}` : '-'}</div>
        </div>
        <div className="flex justify-between items-center mb-2 mt-1">
          <span className="font-semibold text-blue-700">Room: {item.ownerId?.roomNumber || '-'}</span>
          <span className="font-semibold text-green-700">Block: {item.ownerId?.hostelBlock || '-'}</span>
        </div>
        <div className="border-t pt-2 mt-auto flex flex-col items-start">
          <span className="font-semibold text-gray-900 text-base">{item.ownerId?.name}</span>
          <span className="text-base text-gray-600">{getRatingStars(item.ownerId?.rating)} ({item.ownerId?.rating || '-'} / 5)</span>
        </div>
        <Link to={`/item/${item._id}`} className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold text-base">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
