import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWarehouses,
  fetchWarehouseById,
  importStock, // Changed from createWarehouse
  exportStock,  // Added
  updateWarehouse,
  deleteWarehouse,
  createImportReceipt
} from '../redux/features/warehouse/warehouseThunks';
import { clearError, setSelectedWarehouse } from '../redux/features/warehouse/warehouseSlice';

export const useWarehouse = () => {
  const dispatch = useDispatch();
  const {
    warehouses,
    selectedWarehouse,
    isLoading,
    error,
    totalPages,
    currentPage
  } = useSelector(state => state.warehouses);

  const handleFetchWarehouses = async (params) => {
    try {
      await dispatch(fetchWarehouses(params)).unwrap();
      return true;
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      return false;
    }
  };

  const handleFetchWarehouseById = async (id) => {
    try {
      const result = await dispatch(fetchWarehouseById(id)).unwrap();
      return result;
    } catch (error) {
      console.error('Error fetching warehouse:', error);
      return null;
    }
  };

  const handleCreateWarehouse = async (warehouseData) => {
    try {
      await dispatch(createWarehouse(warehouseData)).unwrap();
      return true;
    } catch (error) {
      console.error('Error creating warehouse:', error);
      return false;
    }
  };

  const handleUpdateWarehouse = async (id, warehouseData) => {
    try {
      await dispatch(updateWarehouse({ id, warehouseData })).unwrap();
      return true;
    } catch (error) {
      console.error('Error updating warehouse:', error);
      return false;
    }
  };

  const handleDeleteWarehouse = async (id) => {
    try {
      await dispatch(deleteWarehouse(id)).unwrap();
      return true;
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      return false;
    }
  };

  const handleSelectWarehouse = (warehouse) => {
    dispatch(setSelectedWarehouse(warehouse));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  // Add this function in useWarehouse hook
  const handleCreateImportReceipt = async (receiptData) => {
    try {
      const result = await dispatch(createImportReceipt(receiptData)).unwrap();
      return true;
    } catch (error) {
      console.error('Error creating import receipt:', error);
      return false;
    }
  };
  const handleImportStock = async (importData) => {
    try {
      await dispatch(importStock(importData)).unwrap();
      return true;
    } catch (error) {
      console.error('Error importing stock:', error);
      return false;
    }
  };
  
  const handleExportStock = async (exportData) => {
    try {
      await dispatch(exportStock(exportData)).unwrap();
      return true;
    } catch (error) {
      console.error('Error exporting stock:', error);
      return false;
    }
  };
  
  // Add to return object
  return {
    warehouses,
    selectedWarehouse,
    isLoading,
    error,
    totalPages,
    currentPage,
    handleFetchWarehouses,
    handleFetchWarehouseById,
    handleCreateWarehouse,
    handleUpdateWarehouse,
    handleDeleteWarehouse,
    handleSelectWarehouse,
    handleClearError,
    handleCreateImportReceipt,
    handleExportStock,
    handleImportStock
   
  } 
};