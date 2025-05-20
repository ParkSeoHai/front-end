import { useDispatch, useSelector } from 'react-redux';
import { createOrder, fetchOrders, fetchOrderById, updateOrderStatus, cancelOrder, deleteOrder } from '../redux/features/order/orderThunks';

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders,error,isLoading  } = useSelector(
    (state) => state.orders
  );
  const handleCreateOrder = async (orderData) => {
    console.log('handleCreateOrder',orderData)
    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };

  const handleFetchOrders = async () => {
    try {
      const result = await dispatch(fetchOrders()).unwrap();
      return result;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  const handleFetchOrderById = async (orderId) => {
    try {
      const result = await dispatch(fetchOrderById(orderId)).unwrap();
      return result;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  const handleUpdateOrderStatus = async ({ orderId, TrangThaiDonHang }) => {
    try {
      const result = await dispatch(updateOrderStatus({ orderId, TrangThaiDonHang })).unwrap();
      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      return null;
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await dispatch(cancelOrder(orderId)).unwrap();
      return result;
    } catch (error) {
      console.error('Error cancelling order:', error);
      return null;
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await dispatch(deleteOrder(orderId)).unwrap();
      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      return false;
    }
  };

  return {
    orders,
    isLoading,
    error,
    handleCreateOrder,
    handleFetchOrders,
    handleFetchOrderById,
    handleUpdateOrderStatus,
    handleCancelOrder,
    handleDeleteOrder
  };
};