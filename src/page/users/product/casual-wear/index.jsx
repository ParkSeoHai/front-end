import { useState, useEffect } from 'react';
import CategoryTemplate from '../../../components/templates/CategoryTemplate';
import { useProduct } from '../../../hooks/useProduct';

const CasualWear = () => {
  const [filters, setFilters] = useState({ category: 'office-wear' });
  const { products, handleFetchProducts } = useProduct();

  useEffect(() => {
    handleFetchProducts(filters);
  }, [filters]);

  return (
    <CategoryTemplate
      title="Thời Trang Dạo Phố"
      description="Bộ sưu tập thời trang dạo phố"
      products={products}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};

export default CasualWear;