import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './MovingItems.css';

/**
 * MovingItems Component
 * Displays a horizontally scrolling ticker of shareable items
 * Features: Auto-scroll, pause on hover, infinite loop, responsive
 * 
 * Props:
 *  - items: Array of item objects with 'name' and 'icon' properties
 *  - speed: Animation speed in seconds (default: 30)
 *  - onItemClick: Callback when an item is clicked
 */
const MovingItems = ({ 
  items = [], 
  speed = 30,
  onItemClick = null,
  title = "What Can You Share?"
}) => {
  const { isDark } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [displayItems, setDisplayItems] = useState([]);

  // Default items if none provided
  const defaultItems = [
    { name: 'Books & Notes', icon: '📚', color: 'blue' },
    { name: 'Lab Kits', icon: '🔬', color: 'purple' },
    { name: 'Appliances', icon: '⚡', color: 'yellow' },
    { name: 'Sports Gear', icon: '🏸', color: 'green' },
    { name: 'Gaming & Video', icon: '🎮', color: 'red' },
    { name: 'Electronics', icon: '🎧', color: 'indigo' },
    { name: 'Furniture', icon: '🪑', color: 'pink' },
    { name: 'Clothing', icon: '👕', color: 'cyan' },
    { name: 'Kitchen Items', icon: '🍳', color: 'orange' },
    { name: 'Study Materials', icon: '✏️', color: 'amber' },
  ];

  // Initialize items with duplicates for infinite scroll
  useEffect(() => {
    const itemsToDisplay = items.length > 0 ? items : defaultItems;
    // Duplicate items to create seamless infinite scroll
    // We need enough duplicates so the animation feels infinite
    const duplicated = [...itemsToDisplay, ...itemsToDisplay, ...itemsToDisplay];
    setDisplayItems(duplicated);
  }, [items]);

  const getItemColor = (item) => {
    const colorMap = {
      blue: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300',
      purple: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300',
      yellow: 'from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300',
      green: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300',
      red: 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300',
      indigo: 'from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300',
      pink: 'from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300',
      cyan: 'from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800 border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300',
      orange: 'from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300',
      amber: 'from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300',
    };

    return colorMap[item.color] || colorMap.blue;
  };

  return (
    <div className={`w-full py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-teal-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>

        {/* Scrolling Container */}
        <div 
          className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Gradient Overlays for fade effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r ${isDark ? 'from-gray-700 to-transparent' : 'from-white to-transparent'} z-10 pointer-events-none`} />
          <div className={`absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l ${isDark ? 'from-gray-700 to-transparent' : 'from-white to-transparent'} z-10 pointer-events-none`} />

          {/* Scrolling Items Container */}
          <div 
            className={`moving-items-container flex gap-3 sm:gap-4 px-4 sm:px-6 py-6 overflow-hidden ${isHovering ? 'paused' : ''}`}
            style={{
              '--scroll-speed': `${speed}s`,
              '--items-count': displayItems.length,
            }}
          >
            {displayItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                onClick={() => onItemClick && onItemClick(item)}
                className={`moving-item flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap flex-shrink-0 cursor-pointer transition-all duration-300 transform bg-gradient-to-r border-2 hover:scale-110 hover:shadow-lg ${getItemColor(item)}`}
              >
                <span className="text-lg sm:text-2xl">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Info Text */}
          <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            💡 Hover to pause
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingItems;
