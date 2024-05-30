import React, { useState } from 'react';
import '../css/ImageUploader.css';

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded" />}
    </div>
  );
}

export default ImageUploader;
