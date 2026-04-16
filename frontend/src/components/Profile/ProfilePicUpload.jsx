import React, { useRef, useState } from 'react';

const ProfilePicUpload = ({ onUpload, loading }) => {
  const fileInput = useRef();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 mb-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Profile Picture</h2>
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        className="btn btn-secondary mb-2"
        onClick={() => fileInput.current.click()}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload New Picture'}
      </button>
      {preview && <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover border mt-2" />}
    </div>
  );
};

export default ProfilePicUpload;
