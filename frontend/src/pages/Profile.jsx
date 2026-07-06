import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import ProfileDetails from '../components/Profile/ProfileDetails';
import ProfileEditForm from '../components/Profile/ProfileEditForm';
import ProfilePicUpload from '../components/Profile/ProfilePicUpload';
import ChangePasswordForm from '../components/Profile/ChangePasswordForm';
import { Alert, Button } from '../components/UI/index';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const clearMessages = () => { setError(''); setSuccess(''); };

  const handleSave = async (form) => {
    setLoading(true);
    clearMessages();
    try {
      const res = await api.put('/auth/profile', form);
      setProfile(res.data.user);
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    setLoading(true);
    clearMessages();
    try {
      const formData = new FormData();
      formData.append('profilePic', file);
      const res = await api.post('/auth/profile-pic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.user) setProfile(res.data.user);
      setSuccess('Profile picture updated!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload picture.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (form) => {
    setLoading(true);
    clearMessages();
    try {
      await api.post('/auth/change-password', form);
      setSuccess('Password changed successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary font-display">My Profile</h1>
          <p className="text-text-muted mt-1 text-sm">Manage your account information and settings</p>
        </div>

        {/* Global Alerts */}
        {error && (
          <Alert
            type="error"
            title="Something went wrong"
            message={error}
            onClose={clearMessages}
            className="mb-4"
          />
        )}
        {success && (
          <Alert
            type="success"
            title="Done!"
            message={success}
            onClose={clearMessages}
            className="mb-4"
          />
        )}

        {/* Profile Overview */}
        <ProfileDetails user={profile} />

        {/* Profile Picture Upload */}
        <ProfilePicUpload onUpload={handleUpload} loading={loading} />

        {/* Edit Profile Toggle */}
        {editMode ? (
          <div>
            <ProfileEditForm user={profile} onSave={handleSave} loading={loading} />
            <div className="mb-6 -mt-2">
              <Button variant="ghost" onClick={() => setEditMode(false)}>
                ← Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setEditMode(true)}
              className="w-full sm:w-auto"
            >
              ✏️ Edit Profile Details
            </Button>
          </div>
        )}

        {/* Change Password */}
        <ChangePasswordForm onChangePassword={handleChangePassword} loading={loading} />
      </div>
    </div>
  );
};

export default Profile;
