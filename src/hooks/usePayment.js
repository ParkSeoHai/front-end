import { useDispatch, useSelector } from 'react-redux';
import { createPaypalPayment, capturePaypalPayment, getPaymentById } from '../redux/features/payment/paymentThunks';
import { clearError, clearPaymentData } from '../redux/features/payment/paymentSlice';

export const usePayment = () => {
  const dispatch = useDispatch();
  const { paymentData, approvalUrl, isLoading, error, currentPayment } = useSelector((state) => state.payment);

  const handleCreatePaypalPayment = async (orderId) => {
    try {
      const result = await dispatch(createPaypalPayment({ orderId })).unwrap();
      if (result.approvalUrl) {
        window.location.href = result.approvalUrl;
      }
      return result;
    } catch (error) {
      console.error('Lỗi khi tạo thanh toán PayPal:', error);
      return null;
    }
  };

  const handleCapturePaypalPayment = async (orderID) => {
    try {
      const result = await dispatch(capturePaypalPayment({ orderID })).unwrap();
      return result;
    } catch (error) {
      console.error('Lỗi khi xác nhận thanh toán PayPal:', error);
      return null;
    }
  };

  const handleGetPaymentById = async (paymentId) => {
    try {
      const result = await dispatch(getPaymentById(paymentId)).unwrap();
      return result;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin thanh toán:', error);
      return null;
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleClearPaymentData = () => {
    dispatch(clearPaymentData());
  };

  return {
    paymentData,
    approvalUrl,
    isLoading,
    error,
    currentPayment,
    handleCreatePaypalPayment,
    handleCapturePaypalPayment,
    handleGetPaymentById,
    handleClearError,
    handleClearPaymentData
  };
};