import React, { useState } from "react";
import { Image } from "cloudinary-react";

const ImageUploaders = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsplash");

    fetch("https://api.cloudinary.com/v1_1/sudevkumar/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.secure_url);
      })
      .catch((error) => console.error("Error:", error));
  };

  console.log(imageUrl);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <Image cloudName="sudevkumar" publicId={imageUrl} />
        </div>
      )}
    </div>
  );
};

export default ImageUploaders;
