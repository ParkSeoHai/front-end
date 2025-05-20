import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from './cartThunks';
import { removeAllFromCart } from './cartThunks';

const initialState = {
  cartItems: [], // Will store DanhSachSanPham
  totalAmount: 0,
  discount: 0, // GiamGia
  subTotal: 0, // TamTinh
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    calculateTotalAmount: (state) => {
      state.subTotal = state.cartItems.reduce((total, item) => 
        total + (item.GiaTien * item.SoLuong), 0
      );
      state.totalAmount = state.subTotal - state.discount;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.DanhSachSanPham;
        state.discount = action.payload.GiamGia;
        state.subTotal = action.payload.TamTinh;
        state.totalAmount = action.payload.TongTien;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems.push(action.payload);
        state.totalAmount += action.payload.GiaSanPham * action.payload.quantity;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cartItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
        state.totalAmount = state.cartItems.reduce((total, item) => 
          total + (item.GiaSanPham * item.quantity), 0
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        state.totalAmount = state.cartItems.reduce((total, item) => 
          total + (item.GiaSanPham * item.quantity), 0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
        state.totalAmount = 0;
        state.discount = 0;
        state.subTotal = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Remove All From Cart
      .addCase(removeAllFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeAllFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.DanhSachSanPham;
        state.totalAmount = state.cartItems.reduce((total, item) => 
          total + (item.GiaSanPham * item.SoLuong), 0
        );
      })
      .addCase(removeAllFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, calculateTotalAmount } = cartSlice.actions;
export default cartSlice.reducer;