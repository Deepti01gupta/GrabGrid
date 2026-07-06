import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from '../UI/index';
import { componentClasses } from '../../styles/designSystem';

/**
 * Professional Item Card Component
 * Displays item information with image, details, and actions
 * Supports multiple view modes (grid, list, dashboard)
 */
const ItemCard = ({ 
  item, 
  type = 'browse', // 'browse', 'owned', 'borrowed', 'request'
  onAction,
  showActions = true,
  compact = false 
}) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine badge info based on item status
  const getStatusBadge = () => {
    const statusMap = {
      'Available': { variant: 'success', label: '✓ Available' },
      'Borrowed': { variant: 'warning', label: '📦 Borrowed' },
      'Pending': { variant: 'warning', label: '⏳ Pending' },
      'Approved': { variant: 'success', label: '✓ Approved' },
      'Rejected': { variant: 'danger', label: '✕ Rejected' },
      'Active': { variant: 'success', label: '✓ Active' },
      'Returned': { variant: 'success', label: '✓ Returned' },
    };

    const status = item?.status || item?.borrowStatus;
    return statusMap[status] || { variant: 'primary', label: status };
  };

  // Render image with skeleton loader
  const renderImage = () => {
    return (
      <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-800 overflow-hidden rounded-lg">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 animate-pulse" />
        )}
        
        {item?.imageUrl && !imageError && (
          <img
            src={item.imageUrl}
            alt={item.name || item.itemName}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
          />
        )}
        
        {!item?.imageUrl || imageError && (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
            📦
          </div>
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-3 right-3">
          <Badge variant={getStatusBadge().variant}>
            {getStatusBadge().label}
          </Badge>
        </div>
      </div>
    );
  };

  // Compact view (Dashboard/List)
  if (compact) {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
        <div className="flex gap-4 p-4">
          {item?.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name || item.itemName}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className={`${componentClasses.text.h4} truncate`}>
              {item?.name || item?.itemName || 'Unknown Item'}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {item?.category && (
                <Badge variant="primary" className="text-xs">
                  {item.category}
                </Badge>
              )}
              {item?.condition && (
                <Badge variant="secondary" className="text-xs">
                  {item.condition}
                </Badge>
              )}
            </div>

            {item?.description && (
              <p className={`${componentClasses.text.muted} mt-2 line-clamp-2`}>
                {item.description}
              </p>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Full grid view
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative overflow-hidden flex-shrink-0">
        {renderImage()}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Title */}
        <h3 className={`${componentClasses.text.h4} line-clamp-2 mb-3`}>
          {item?.name || item?.itemName || 'Unknown Item'}
        </h3>

        {/* Details Grid */}
        <div className="space-y-2 mb-4 text-sm">
          {item?.category && (
            <div className="flex justify-between">
              <span className={componentClasses.text.muted}>Category</span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.category}</span>
            </div>
          )}
          
          {item?.condition && (
            <div className="flex justify-between">
              <span className={componentClasses.text.muted}>Condition</span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.condition}</span>
            </div>
          )}

          {type === 'borrowed' && item?.ownerId && (
            <div className="flex justify-between">
              <span className={componentClasses.text.muted}>Owner</span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                {item.ownerId?.name || 'Unknown'}
              </span>
            </div>
          )}

          {type === 'request' && item?.borrowerId && (
            <div className="flex justify-between">
              <span className={componentClasses.text.muted}>Requester</span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                {item.borrowerId?.name || 'Unknown'}
              </span>
            </div>
          )}

          {item?.pricePerDay && (
            <div className="flex justify-between">
              <span className={componentClasses.text.muted}>Price/Day</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">₹{item.pricePerDay}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {item?.description && (
          <p className={`${componentClasses.text.muted} mb-4 line-clamp-2`}>
            {item.description}
          </p>
        )}

        {/* Actions */}
        {showActions && (
          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
            {type === 'request' ? (
              <div className="flex gap-2">
                <Button
                  variant="success"
                  size="sm"
                  className="flex-1"
                  onClick={() => onAction?.(item._id, 'approve')}
                >
                  ✓ Accept
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="flex-1"
                  onClick={() => onAction?.(item._id, 'reject')}
                >
                  ✕ Reject
                </Button>
              </div>
            ) : type === 'owned' ? (
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/item/${item._id}`)}
                >
                  📋 View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/items/edit/${item._id}`)}
                >
                  ✏️ Edit
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => navigate(`/item/${item._id}`)}
              >
                View Details →
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ItemCard;
