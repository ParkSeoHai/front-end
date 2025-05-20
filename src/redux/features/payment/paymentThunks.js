import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://back-end-gray-pi.vercel.app//api';

export const createPaypalPayment = createAsyncThunk(
  'payment/createPaypalPayment',
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/create-paypal-payment`, {
        orderId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const capturePaypalPayment = createAsyncThunk(
  'payment/capturePaypalPayment',
  async ({ orderID }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/orders/${orderID}/capture`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPaymentById = createAsyncThunk(
  'payment/getPaymentById',
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/payment/${paymentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async ({ amount, orderInfo, returnUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/create_payment_url`, {
        amount,
        orderInfo,
        returnUrl,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);