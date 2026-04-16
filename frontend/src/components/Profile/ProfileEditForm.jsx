import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Edit Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Hostel Block</label>
          <input name="hostelBlock" value={form.hostelBlock} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Room Number</label>
          <input name="roomNumber" value={form.roomNumber} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default ProfileEditForm;
