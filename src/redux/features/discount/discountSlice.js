import { createSlice } from '@reduxjs/toolkit';
import { fetchDiscounts, createDiscount, updateDiscount, deleteDiscount } from './discountThunks';

const initialState = {
  discounts: [],
  isLoading: false,
  error: null,
  totalDiscounts: 0,
  selectedDiscount: null
};

const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedDiscount: (state, action) => {
      state.selectedDiscount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Discounts
      .addCase(fetchDiscounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discounts = action.payload.discounts;
        state.totalDiscounts = action.payload.total;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Discount
      .addCase(createDiscount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discounts.push(action.payload);
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Discount
      .addCase(updateDiscount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.discounts.findIndex(discount => discount.id === action.payload.id);
        if (index !== -1) {
          state.discounts[index] = action.payload;
        }
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Discount
      .addCase(deleteDiscount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discounts = state.discounts.filter(discount => discount.id !== action.payload);
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, setSelectedDiscount } = discountSlice.actions;
export default discountSlice.reducer;