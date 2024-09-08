import React, { useState } from 'react';
import { uploadVideo } from '../services/api';

const UploadForm = ({ addVideo }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const videoUrl = await uploadVideo(file);
      addVideo({ url: videoUrl });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
