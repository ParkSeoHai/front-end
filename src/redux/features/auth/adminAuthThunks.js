import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://back-end-gray-pi.vercel.app//api';

export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, credentials);
      // Lưu token và thông tin admin vào localStorage
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminInfo', JSON.stringify(response.data.user));
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
        console.error(error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  'adminAuth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/logout`);
      // Xóa thông tin admin khỏi localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      // Remove authorization header
      delete axios.defaults.headers.common['Authorization'];
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCurrentAdmin = createAsyncThunk(
  'adminAuth/getCurrentAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return null;
      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to get user data');
    }
  }
);

export const updateAdminPassword = createAsyncThunk(
  'adminAuth/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${BASE_URL}/users/update-password`, passwordData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Cập nhật mật khẩu thất bại');
    }
  }
);

export const updateAdminProfile = createAsyncThunk(
  'adminAuth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${BASE_URL}/users/update-profile`, profileData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Cập nhật thông tin trong localStorage
      const currentAdmin = JSON.parse(localStorage.getItem('adminInfo'));
      const updatedAdmin = { ...currentAdmin, ...profileData };
      localStorage.setItem('adminInfo', JSON.stringify(updatedAdmin));
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Cập nhật thông tin thất bại');
    }
  }
);