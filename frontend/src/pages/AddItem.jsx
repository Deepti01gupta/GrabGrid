import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Button, Card, Input, Select, TextArea, Alert } from '../components/UI/index';
import { componentClasses } from '../styles/designSystem';

/**
 * Modern form page to list new items to share
 */
const AddItem = () => {

  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Book',
    condition: 'Good',
    description: '',
    securityDeposit: 0,
    borrowDuration: 7,
    availableFrom: '',
    availableUntil: '',
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          imageUrl: reader.result,
        });
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({
      ...formData,
      imageUrl: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(false);

    // Basic date validations
    if (new Date(formData.availableFrom) > new Date(formData.availableUntil)) {
      setError('Available From date cannot be after Available Until date');
      return;
    }

    setLoading(true);
    try {
      await api.post('/items', formData);
      navigate('/items');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 md:p-10 shadow-lg">
          
          <div className="text-center mb-8">
            <h2 className={componentClasses.text.h2}>Add Item to Share</h2>
            <p className={`${componentClasses.text.muted} mt-2`}>
              List your item so classmates can borrow it
            </p>
          </div>

          {error && (
            <Alert
              type="error"
              title="Failed to Save"
              message={error}
              onClose={() => setError('')}
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Item Name"
              type="text"
              name="itemName"
              placeholder="e.g. Data Structures & Algorithms Textbook"
              value={formData.itemName}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                options={[
                  { value: 'Book', label: 'Book' },
                  { value: 'Lab Kit', label: 'Lab Kit' },
                  { value: 'Appliance', label: 'Appliance' },
                  { value: 'Sports Equipment', label: 'Sports Equipment' },
                  { value: 'Other', label: 'Other' },
                ]}
              />

              <Select
                label="Condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                options={[
                  { value: 'New', label: 'New' },
                  { value: 'Good', label: 'Good' },
                  { value: 'Used', label: 'Used' },
                ]}
              />
            </div>

            <TextArea
              label="Description"
              name="description"
              placeholder="Provide a description of the item, condition details, and any guidelines..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />

            {/* Premium File Upload Dropzone */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Item Image
              </label>
              <div className="border-2 border-dashed border-border hover:border-primary rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 bg-surface/30">
                <input
                  type="file"
                  id="itemImage"
                  name="itemImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="itemImage" className="cursor-pointer block w-full h-full">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img src={imagePreview} alt="Preview" className="h-36 w-36 object-cover rounded-lg mx-auto shadow-sm" />
                      <p className="text-sm text-text-secondary">Click here to change the image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-4xl opacity-55">📷</div>
                      <p className="font-semibold text-text-primary">Upload Item Photograph</p>
                      <p className="text-xs text-text-muted">Supports JPEG, PNG, GIF, WEBP up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
              {imagePreview && (
                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={removeImage}>
                    ✕ Remove Image
                  </Button>
                </div>
              )}
            </div>

            {/* Note box */}
            <Alert
              type="info"
              message="Your Hostel Block and Room Number will be automatically attached from your profile so classmates can locate you easily."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Borrow Duration (days max)"
                type="number"
                name="borrowDuration"
                min="1"
                max="90"
                value={formData.borrowDuration}
                onChange={handleChange}
                required
              />

              <Input
                label="Security Deposit (optional, ₹)"
                type="number"
                name="securityDeposit"
                min="0"
                value={formData.securityDeposit}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Available From"
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                required
              />

              <Input
                label="Available Until"
                type="date"
                name="availableUntil"
                value={formData.availableUntil}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Publishing Listing...' : '🚀 Publish Item Listing'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddItem;
