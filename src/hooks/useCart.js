import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart,
  clearCart 
} from '../redux/features/cart/cartThunks';
import { removeAllFromCart } from '../redux/features/cart/cartThunks';

export const useCart = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading, error, totalAmount } = useSelector(state => state.cart);

  const handleFetchCart = async () => {
    try {
      await dispatch(fetchCart()).unwrap();
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleAddToCart = async (productData) => {
    try {
      await dispatch(addToCart(productData)).unwrap();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const handleUpdateCartItem = async (itemId, quantity) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await dispatch(updateCartItem({ 
        itemId, 
        quantity,
        userId: user?.id 
      })).unwrap();
      return true;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return false;
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await dispatch(removeFromCart({ 
        itemId,
        userId: user?.id
      })).unwrap();
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  const handleClearCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        throw new Error('User not found');
      }
      await dispatch(clearCart(user.id)).unwrap();
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  const handleRemoveAllFromCart = async (itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await dispatch(removeAllFromCart({ 
        itemId,
        userId: user?.id
      })).unwrap();
      return true;
    } catch (error) {
      console.error('Error removing all items from cart:', error);
      return false;
    }
  };

  return {
    cartItems,
    isLoading,
    error,
    totalAmount,
    handleFetchCart,
    handleAddToCart,
    handleUpdateCartItem,
    handleRemoveFromCart,
    handleRemoveAllFromCart,
    handleClearCart
  };
};