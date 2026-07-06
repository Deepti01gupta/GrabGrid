import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import ItemCard from '../components/ItemCard';
import { Input, Select, Button, EmptyState, Alert, Skeleton } from '../components/UI/index';
import { componentClasses } from '../styles/designSystem';

/**
 * Modern browse items page for GrabGrid
 * Uses unified design system components and responsive grids
 */
const Items = () => {

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
    }, 400); // Wait 400ms after user stops typing

    return () => clearTimeout(debounceTimer.current);
  }, [searchInput]);

  // Fetch items when filters change
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError('');
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

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Book', label: 'Book' },
    { value: 'Lab Kit', label: 'Lab Kit' },
    { value: 'Appliance', label: 'Appliance' },
    { value: 'Sports Equipment', label: 'Sports Equipment' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 transition-colors duration-200">
      <div className={componentClasses.container}>
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={componentClasses.text.h1}>Browse Shared Items</h1>
          <p className={`${componentClasses.text.muted} mt-2 text-lg`}>
            Borrow educational materials, sports gear, and appliances from your hostel mates
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-card border border-card-border rounded-xl p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <Input
              label="Search Items"
              type="text"
              placeholder="e.g. chemistry kit, lab book..."
              value={searchInput}
              onChange={handleSearchChange}
            />

            <Select
              label="Category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              options={categoryOptions}
            />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            type="error"
            title="Error Fetching Listings"
            message={error}
            onClose={() => setError('')}
            className="mb-8"
          />
        )}

        {/* Loading / Grid */}
        {loading ? (
          <div className={componentClasses.grid.cols3}>
            <Skeleton height="20rem" count={3} />
          </div>
        ) : items.length > 0 ? (
          <div className={componentClasses.grid.cols3}>
            {items.map((item) => (
              <ItemCard key={item._id} item={item} type="browse" />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🔍"
            title="No items found"
            description="We couldn't find any listings matching your search/filters."
            action={
              <Button variant="ghost" onClick={() => { setSearchInput(''); setFilters({ category: '', itemName: '' }); }}>
                Clear Filters
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Items;
