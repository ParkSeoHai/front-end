import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from './supplierThunks';

const initialState = {
  suppliers: [],
  selectedSupplier: null,
  isLoading: false,
  error: null,
  totalSuppliers: 0
};

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedSupplier: (state, action) => {
      state.selectedSupplier = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Suppliers
      .addCase(fetchSuppliers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = action.payload.suppliers;
        state.totalSuppliers = action.payload.total;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Supplier
      .addCase(createSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers.push(action.payload.supplier);
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Supplier
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.suppliers.findIndex(s => s.id === action.payload.supplier.id);
        if (index !== -1) {
          state.suppliers[index] = action.payload.supplier;
        }
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Supplier
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = state.suppliers.filter(s => s.id !== action.payload);
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, setSelectedSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;