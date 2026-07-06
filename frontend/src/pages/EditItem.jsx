import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Button, Card, Input, Select, TextArea, Alert } from '../components/UI/index';
import { componentClasses } from '../styles/designSystem';

/**
 * Modern edit item details form page
 */
const EditItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();


  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    condition: '',
    description: '',
    securityDeposit: '',
    borrowDuration: '',
    availableFrom: '',
    availableUntil: '',
    pricePerDay: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/items/${itemId}`);
        const item = response.data.item;

        // Check if user is owner
        if (item.ownerId._id !== user._id) {
          setError('You do not have permission to edit this item');
          setTimeout(() => navigate('/dashboard'), 2000);
          return;
        }

        // Pre-fill form with item data
        setFormData({
          itemName: item.itemName || '',
          category: item.category || '',
          condition: item.condition || '',
          description: item.description || '',
          securityDeposit: item.securityDeposit || 0,
          borrowDuration: item.borrowDuration || 7,
          availableFrom: item.availableFrom ? new Date(item.availableFrom).toISOString().split('T')[0] : '',
          availableUntil: item.availableUntil ? new Date(item.availableUntil).toISOString().split('T')[0] : '',
          pricePerDay: item.pricePerDay || 0,
        });
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      await api.put(`/items/${itemId}`, formData);
      setSuccess('Item details updated successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    } finally {
      setSubmitting(false);
    }
  };

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Books', label: 'Books' },
    { value: 'Sports', label: 'Sports Equipment' },
    { value: 'Kitchen', label: 'Kitchen Items' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Other', label: 'Other' },
  ];

  const conditionOptions = [
    { value: '', label: 'Select Condition' },
    { value: 'Like New', label: 'Like New' },
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
  ];

  return (
    <div className="min-h-screen bg-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 md:p-10 shadow-lg">
          
          <div className="mb-6 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} icon="←">
              Back
            </Button>
            <h1 className={componentClasses.text.h2}>Edit Item Details</h1>
            <div className="w-16" /> {/* spacer to balance back button */}
          </div>

          {error && (
            <Alert
              type="error"
              title="Error Occurred"
              message={error}
              onClose={() => setError('')}
              className="mb-6"
            />
          )}

          {success && (
            <Alert
              type="success"
              title="Success"
              message={success}
              className="mb-6"
            />
          )}

          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Item Name"
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                placeholder="e.g. Laptop, Book, Guitar"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  options={categoryOptions}
                />

                <Select
                  label="Condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  options={conditionOptions}
                />
              </div>

              <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the item, its features, and condition..."
                rows={4}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Security Deposit (₹)"
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />

                <Input
                  label="Price Per Day (₹)"
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
              </div>

              <Input
                label="Borrow Duration (days max)"
                type="number"
                name="borrowDuration"
                value={formData.borrowDuration}
                onChange={handleInputChange}
                placeholder="30"
                min="1"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Available From"
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleInputChange}
                />

                <Input
                  label="Available Until"
                  type="date"
                  name="availableUntil"
                  value={formData.availableUntil}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : '✅ Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EditItem;
