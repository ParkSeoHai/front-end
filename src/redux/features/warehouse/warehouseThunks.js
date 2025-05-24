import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://https://back-end-gray-pi.vercel.app:8080/api/warehouse';

// Helper function to get auth header
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
  }
});

export const fetchWarehouses = createAsyncThunk(
  'warehouse/fetchAll',
  async ({ page = 1, limit = 10, search = '' } = {}) => {
    const response = await axios.get(
      `${BASE_URL}?page=${page}&limit=${limit}&search=${search}`,
      getAuthHeader()
    );
    return response.data;
  }
);

export const fetchWarehouseById = createAsyncThunk(
  'warehouse/fetchById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  }
);

export const createWarehouse = createAsyncThunk(
  'warehouse/create',
  async (warehouseData) => {
    const response = await axios.post(`${BASE_URL}/create`, warehouseData, getAuthHeader());
    return response.data;
  }
);

export const updateWarehouse = createAsyncThunk(
  'warehouse/update',
  async ({ id, warehouseData }) => {
    const response = await axios.put(
      `${BASE_URL}/update/${id}`,
      warehouseData,
      getAuthHeader()
    );
    return response.data;
  }
);

export const deleteWarehouse = createAsyncThunk(
  'warehouse/delete',
  async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`, getAuthHeader());
    return id;
  }
);

// Replace createWarehouse with these specific functions:

export const importStock = createAsyncThunk(
  'warehouse/import',
  async (importData) => {
    const response = await axios.post(
      `${BASE_URL}/import`,
      importData,
      getAuthHeader()
    );
    return response.data;
  }
);

export const exportStock = createAsyncThunk(
  'warehouse/export',
  async (exportData) => {
    const response = await axios.post(
      `${BASE_URL}/export`,
      exportData,
      getAuthHeader()
    );
    return response.data;
  }
);

export const createImportReceipt = createAsyncThunk(
  'warehouse/createImportReceipt',
  async (receiptData) => {
    const response = await axios.post(
      `${BASE_URL}/import-receipt`,
      receiptData,
      getAuthHeader()
    );
    return response.data;
  }
);