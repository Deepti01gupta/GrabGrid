import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import ItemCard from '../components/ItemCard';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

const Items = () => {
  const { isDark } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    itemName: '',
  });
  const debounceTimer = useRef(null);

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    debounceTimer.current = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        itemName: searchInput,
      }));
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(debounceTimer.current);
  }, [searchInput]);

  // Fetch items when filters change (NOT on every keystroke)
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.itemName) params.append('itemName', filters.itemName);

        const response = await api.get(`/items/search?${params}`);
        setItems(response.data.items || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filters.category, filters.itemName]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} text-center mb-12`}>
          Browse Shared Items
        </h1>

        {/* Filters Section */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-12`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by item name..."
              value={searchInput}
              onChange={handleSearchChange}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
            />

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="">All Categories</option>
              <option value="Book">Book</option>
              <option value="Lab Kit">Lab Kit</option>
              <option value="Appliance">Appliance</option>
              <option value="Sports Equipment">Sports Equipment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {error && (
          <div className={`border px-4 py-3 rounded-lg mb-6 ${isDark ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'}`}>
            {error}
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((item) => <ItemCard key={item._id} item={item} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No items found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
