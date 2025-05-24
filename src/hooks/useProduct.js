import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  toggleFavorite
} from '../redux/features/product/productThunks';
import {
  setFilters,
  setPagination,
  clearError
} from '../redux/features/product/productSlice';

export const useProduct = () => {
  const dispatch = useDispatch();
  const {
    products,
    selectedProduct,
    isLoading,
    error,
    filters,
    pagination
  } = useSelector(state => state.products);

  const [productTypes, setProductTypes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [styles, setStyles] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`
    }
  });

  const fetchAllData = async () => {
    try {
      const [typesRes, pricesRes, stylesRes, suppliersRes,categoriesRes,sizesRes] = await Promise.all([
        axios.get('http://localhost:8080/api/product-types', getAuthHeader()),
        axios.get('http://localhost:8080/api/prices', getAuthHeader()),
        axios.get('http://localhost:8080/api/styles', getAuthHeader()),
        axios.get('http://localhost:8080/api/suppliers', getAuthHeader()),
        axios.get('http://localhost:8080/api/categories', getAuthHeader()),
        axios.get('http://localhost:8080/api/sizes', getAuthHeader())
      ]);
      console.log("sizesRes",sizesRes)
      setProductTypes(typesRes.data['product-types']);
      setPrices(pricesRes.data.prices);
      setStyles(stylesRes.data.styles);
      setSuppliers(suppliersRes.data.suppliers);
      setCategories(categoriesRes.data.categories);
      setSizes(sizesRes.data.sizes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFetchProducts = async (page = 1) => {
    try {
      await dispatch(fetchProducts()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleFetchProductById = async (id) => {
    try {
      const result = await dispatch(fetchProductById(id)).unwrap();
      return result;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      console.log(productData);
      await dispatch(createProduct(productData)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      await dispatch(updateProduct({ id, productData })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleDeleteProductImage = async (id, filename) => {
    try {
      await dispatch(deleteProductImage({ id, filename })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await dispatch(toggleFavorite(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSetFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSetPagination = (newPagination) => {
    dispatch(setPagination(newPagination));
  };



  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    // State
    products,
    selectedProduct,
    isLoading,
    error,
    filters,
    pagination,
    productTypes,
    prices,
    styles,
    suppliers,
    categories,
    sizes,


    // Methods
    fetchAllData,
    handleFetchProducts,
    handleFetchProductById,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleDeleteProductImage,
    handleToggleFavorite,
    handleSetFilters,
    handleSetPagination,
    handleClearError
  };
};