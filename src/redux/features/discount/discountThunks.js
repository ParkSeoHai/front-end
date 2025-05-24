import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://back-end-gray-pi.vercel.app/api';

export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${BASE_URL}/discounts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDiscount = createAsyncThunk(
  'discounts/create',
  async (discountData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${BASE_URL}/discounts/create`, discountData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDiscount = createAsyncThunk(
  'discounts/update',
  async ({ id, discountData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${BASE_URL}/discounts/update/${id}`, discountData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  'discounts/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${BASE_URL}/discounts/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);