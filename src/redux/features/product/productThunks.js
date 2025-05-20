import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://back-end-gray-pi.vercel.app/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${BASE_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: filters // Add filters to query params
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Convert and optimize files to base64
      let imageBase64Array = [];
      if (productData.HinhAnh && productData.HinhAnh.length > 0) {
        imageBase64Array = await Promise.all(
          productData.HinhAnh.map(file => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              const img = new Image();
              
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set maximum dimensions
                const maxWidth = 1024;
                const maxHeight = 1024;
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                  if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                  }
                } else {
                  if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                  }
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress image
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress with 70% quality
              };

              img.onerror = reject;
              
              reader.onload = (e) => {
                img.src = e.target.result;
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        );
      }

      // Prepare the data object
      const requestData = {
        ...productData,
        HinhAnh: imageBase64Array
      };

      const response = await axios.post(`${BASE_URL}/products/create`, requestData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Convert existing image URLs to base64
      const existingImagesBase64 = await Promise.all(
        (productData.HinhAnh || []).map(async (imagePath) => {
          try {
            // Skip if already base64
            if (imagePath.startsWith('data:image')) {
              return imagePath;
            }
            // Convert URL to base64
            const response = await fetch(`https://back-end-gray-pi.vercel.app${imagePath}`);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
          }
        })
      );

      // Convert new images to base64
      let newImagesBase64 = [];
      if (productData.newImages && productData.newImages.length > 0) {
        newImagesBase64 = await Promise.all(
          productData.newImages.map(file => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              const img = new Image();
              
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set maximum dimensions
                const maxWidth = 1024;
                const maxHeight = 1024;
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                  if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                  }
                } else {
                  if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                  }
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress image
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
              };

              img.onerror = reject;
              
              reader.onload = (e) => {
                img.src = e.target.result;
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        );
      }

      // Filter out any null values from failed conversions
      const allImagesBase64 = [...existingImagesBase64, ...newImagesBase64].filter(img => img !== null);

      // Prepare request data
      const requestData = {
        ...productData,
        HinhAnh: allImagesBase64
      };

      const response = await axios.put(`${BASE_URL}/products/${id}`, requestData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');

      await axios.delete(`${BASE_URL}/products/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  'products/deleteProductImage',
  async ({ id, filename }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/products/${id}/images/${filename}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'products/toggleFavorite',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`${BASE_URL}/products/${id}/favorite`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);