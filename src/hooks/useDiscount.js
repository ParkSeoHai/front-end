import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscounts, createDiscount, updateDiscount, deleteDiscount } from '../redux/features/discount/discountThunks';
import { setSelectedDiscount, clearError } from '../redux/features/discount/discountSlice';

export const useDiscount = () => {
  const dispatch = useDispatch();
  const { discounts, isLoading, error, totalDiscounts, selectedDiscount } = useSelector(
    (state) => state.discounts
  );

  const handleFetchDiscounts = async () => {
    await dispatch(fetchDiscounts());
  };

  const handleCreateDiscount = async (discountData) => {
    try {
      await dispatch(createDiscount(discountData)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleUpdateDiscount = async (id, discountData) => {
    try {
      await dispatch(updateDiscount({ id, discountData })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleDeleteDiscount = async (id) => {
    try {
      await dispatch(deleteDiscount(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSelectDiscount = (discount) => {
    dispatch(setSelectedDiscount(discount));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    discounts,
    isLoading,
    error,
    totalDiscounts,
    selectedDiscount,
    handleFetchDiscounts,
    handleCreateDiscount,
    handleUpdateDiscount,
    handleDeleteDiscount,
    handleSelectDiscount,
    handleClearError
  };
};