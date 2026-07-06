import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../UI/index';
import { componentClasses } from '../../styles/designSystem';

/**
 * Modern ChangePasswordForm for profile settings
 */
const ChangePasswordForm = ({ onChangePassword, loading }) => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    setError('');
    onChangePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword });
  };

  return (
    <Card className="p-6 md:p-8 shadow-md mb-6">
      <h2 className={`${componentClasses.text.h3} mb-4`}>Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Current Password"
          name="oldPassword"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
          required
          placeholder="Enter current password"
        />
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          required
          placeholder="Min. 6 characters"
        />
        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Re-enter new password"
        />
        {error && (
          <Alert type="error" message={error} />
        )}
        <div className="pt-1">
          <Button type="submit" variant="secondary" className="w-full sm:w-auto" disabled={loading}>
            {loading ? 'Updating Password...' : '🔒 Change Password'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ChangePasswordForm;
