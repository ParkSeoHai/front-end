import { createSlice } from '@reduxjs/toolkit';
import { createPaypalPayment, capturePaypalPayment, getPaymentById } from './paymentThunks';

const initialState = {
  paymentData: null,
  approvalUrl: null,
  isLoading: false,
  error: null,
  currentPayment: null
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPaymentData: (state) => {
      state.paymentData = null;
      state.approvalUrl = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // CreatePaypalPayment cases
      .addCase(createPaypalPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPaypalPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentData = action.payload;
        state.approvalUrl = action.payload.approvalUrl;
      })
      .addCase(createPaypalPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // CapturePaypalPayment cases
      .addCase(capturePaypalPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(capturePaypalPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentData = action.payload;
      })
      .addCase(capturePaypalPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // GetPaymentById cases
      .addCase(getPaymentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPayment = action.payload;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;