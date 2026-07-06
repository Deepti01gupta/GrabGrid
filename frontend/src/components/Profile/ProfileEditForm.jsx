import React, { useState } from 'react';
import { Card, Input, Button } from '../UI/index';
import { componentClasses } from '../../styles/designSystem';

/**
 * Modern ProfileEditForm for profile settings
 */
const ProfileEditForm = ({ user, onSave, loading }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    hostelBlock: user?.hostelBlock || '',
    roomNumber: user?.roomNumber || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Card className="p-6 md:p-8 shadow-md mb-6">
      <h2 className={`${componentClasses.text.h3} mb-4`}>Edit Profile Details</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
          <Input
            label="Hostel Block"
            name="hostelBlock"
            value={form.hostelBlock}
            onChange={handleChange}
            required
            placeholder="e.g. Block A"
          />
          <Input
            label="Room Number"
            name="roomNumber"
            value={form.roomNumber}
            onChange={handleChange}
            required
            placeholder="e.g. 101"
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            placeholder="e.g. 9876543210"
          />
        </div>
        <div className="pt-2">
          <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={loading}>
            {loading ? 'Saving Changes...' : '💾 Save Profile'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileEditForm;
