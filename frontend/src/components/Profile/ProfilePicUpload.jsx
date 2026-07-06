import React, { useRef, useState } from 'react';
import { Card, Button } from '../UI/index';
import { componentClasses } from '../../styles/designSystem';

/**
 * Modern ProfilePicUpload with drag-and-drop feel
 */
const ProfilePicUpload = ({ onUpload, loading }) => {
  const fileInput = useRef();
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <Card className="p-6 md:p-8 shadow-md mb-6">
      <h2 className={`${componentClasses.text.h3} mb-4`}>Update Profile Picture</h2>
      <div
        className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl p-6 transition-colors duration-200 cursor-pointer
          ${dragging
            ? 'border-primary bg-primary/10'
            : 'border-card-border hover:border-primary/60 hover:bg-primary/5'
          }`}
        onClick={() => fileInput.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary/30 shadow-lg"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
            📷
          </div>
        )}
        <div className="text-center">
          <p className={`${componentClasses.text.body} font-semibold`}>
            {loading ? 'Uploading...' : 'Click or drag an image here'}
          </p>
          <p className="text-text-muted text-xs mt-1">PNG, JPG or WEBP, max 5MB</p>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={(e) => { e.stopPropagation(); fileInput.current.click(); }}
        >
          {loading ? '⏳ Uploading...' : '📁 Browse Files'}
        </Button>
      </div>
    </Card>
  );
};

export default ProfilePicUpload;
