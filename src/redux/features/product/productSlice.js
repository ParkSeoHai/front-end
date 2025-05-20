import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  toggleFavorite
} from './productThunks';

const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
    productType: '',
    minPrice: '',
    maxPrice: '',
    status: 'all',
    sortBy: 'createdAt',
    order: 'desc'
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    limit: 10
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchTerm: (state, action) => {
      state.filters.search = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalItems = action.payload.total;
        state.pagination.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      })

      // Fetch Product By Id
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.selectedProduct = null; 
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload; 
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = null; 
        state.error = action.payload?.message || 'Failed to fetch product details';
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload.product);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to create product';
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(p => p.idSanPham === action.payload.product.idSanPham);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to update product';
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(p => p.idSanPham !== action.payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to delete product';
      })

      // Delete Product Image
      .addCase(deleteProductImage.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.idSanPham === action.payload.product.idSanPham);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        if (state.selectedProduct?.idSanPham === action.payload.product.idSanPham) {
          state.selectedProduct = action.payload.product;
        }
      })

      // Toggle Favorite
      // Trong extraReducers
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.idSanPham === action.payload.product.idSanPham);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        if (state.selectedProduct?.idSanPham === action.payload.product.idSanPham) {
          state.selectedProduct = action.payload.product;
        }
      });
  }
});

export const {
  setFilters,
  setPagination,
  clearError
} = productSlice.actions;

export default productSlice.reducer;