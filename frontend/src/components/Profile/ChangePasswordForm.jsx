import React, { useState } from 'react';

const ChangePasswordForm = ({ onChangePassword, loading }) => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    setError('');
    onChangePassword(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Change Password</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium">Old Password</label>
        <input name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} className="input input-bordered w-full" required />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">New Password</label>
        <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} className="input input-bordered w-full" required />
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
        {loading ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
