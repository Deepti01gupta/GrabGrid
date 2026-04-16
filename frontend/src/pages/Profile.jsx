import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import ProfileDetails from '../components/Profile/ProfileDetails';
import ProfileEditForm from '../components/Profile/ProfileEditForm';
import ProfilePicUpload from '../components/Profile/ProfilePicUpload';
import ChangePasswordForm from '../components/Profile/ChangePasswordForm';

const Profile = () => {
  const { user, accessToken, refreshAccessToken } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleSave = async (form) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.put('/auth/profile', form);
      setProfile(res.data.user);
      setSuccess('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      formData.append('profilePic', file);
      await api.post('/auth/profile-pic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Profile picture updated!');
      // Optionally, refetch profile
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload picture');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (form) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/auth/change-password', form);
      setSuccess('Password changed successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <ProfileDetails user={profile} />
      <ProfilePicUpload onUpload={handleUpload} loading={loading} />
      {editMode ? (
        <ProfileEditForm user={profile} onSave={handleSave} loading={loading} />
      ) : (
        <button className="btn btn-outline mb-4" onClick={() => setEditMode(true)}>
          Edit Profile
        </button>
      )}
      <ChangePasswordForm onChangePassword={handleChangePassword} loading={loading} />
    </div>
  );
};

export default Profile;
