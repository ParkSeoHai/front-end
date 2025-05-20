import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchWarehouses, 
  fetchWarehouseById, 
  createWarehouse, 
  updateWarehouse, 
  deleteWarehouse, 
  createImportReceipt
} from './warehouseThunks';

const initialState = {
  warehouses: [],
  selectedWarehouse: null,
  isLoading: false,
  error: null,
  totalPages: 0,
  currentPage: 1
};

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedWarehouse: (state, action) => {
      state.selectedWarehouse = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all warehouses
      .addCase(fetchWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warehouses = action.payload.warehouses;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch warehouse by ID
      .addCase(fetchWarehouseById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWarehouseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedWarehouse = action.payload;
      })
      .addCase(fetchWarehouseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Create warehouse
      .addCase(createWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warehouses.unshift(action.payload.warehouse);
      })
      .addCase(createWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Update warehouse
      .addCase(updateWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.warehouses.findIndex(w => w.id === action.payload.warehouse.id);
        if (index !== -1) {
          state.warehouses[index] = action.payload.warehouse;
        }
      })
      .addCase(updateWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete warehouse
      .addCase(deleteWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warehouses = state.warehouses.filter(w => w.id !== action.payload);
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })  // Removed semicolon here

      // Import receipt cases
      .addCase(createImportReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createImportReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warehouses.unshift(action.payload.warehouse);
      })
      .addCase(createImportReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearError, setSelectedWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;