import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSuppliers, 
  createSupplier, 
  updateSupplier, 
  deleteSupplier 
} from '../redux/features/supplier/supplierThunks';

export const useSupplier = () => {
  const dispatch = useDispatch();
  const { suppliers, isLoading, error, selectedSupplier } = useSelector(state => state.suppliers);

  const handleFetchSuppliers = async () => {
    try {
      await dispatch(fetchSuppliers()).unwrap();
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleCreateSupplier = async (supplierData) => {
    try {
      await dispatch(createSupplier(supplierData)).unwrap();
      return true;
    } catch (error) {
      console.error('Error creating supplier:', error);
      return false;
    }
  };

  const handleUpdateSupplier = async (supplierId, supplierData) => {
    try {
      await dispatch(updateSupplier({ supplierId, supplierData })).unwrap();
      return true;
    } catch (error) {
      console.error('Error updating supplier:', error);
      return false;
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await dispatch(deleteSupplier(supplierId)).unwrap();
      return true;
    } catch (error) {
      console.error('Error deleting supplier:', error);
      return false;
    }
  };

  return {
    suppliers,
    isLoading,
    error,
    selectedSupplier,
    handleFetchSuppliers,
    handleCreateSupplier,
    handleUpdateSupplier,
    handleDeleteSupplier
  };
};