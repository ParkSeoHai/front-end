import { useState, useEffect } from 'react';
import CategoryTemplate from '../../../components/templates/CategoryTemplate';
import { useProduct } from '../../../hooks/useProduct';

const OfficeWear = () => {
  const [filters, setFilters] = useState({ category: 'office-wear' });
  const { products, handleFetchProducts } = useProduct();

  useEffect(() => {
    handleFetchProducts(filters);
  }, [filters]);

  return (
    <CategoryTemplate
      title="Thời Trang Công Sở"
      description="Bộ sưu tập thời trang công sở thanh lịch và chuyên nghiệp"
      products={products}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};

export default OfficeWear;