export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bawal_unsigned');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dn6z0y60z/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Upload failed');

    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export const saveProductImage = async (productId, imageUrl, imageType = 'FRONT') => {
  try {
    const response = await fetch('https://sanskriti-backend-lhnj.onrender.com/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, imageUrl, imageType }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.message || 'Failed to save image record');

    return data.data;
  } catch (error) {
    console.error('Failed to save product image:', error);
    throw error;
  }
};
