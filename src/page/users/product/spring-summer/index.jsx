import { useState, useEffect } from 'react';
import CategoryTemplate from '../../../components/templates/CategoryTemplate';
import { useProduct } from '../../../hooks/useProduct';

const SpringSummer = () => {
  const [filters, setFilters] = useState({ category: 'office-wear' });
  const { products, handleFetchProducts } = useProduct();

  useEffect(() => {
    handleFetchProducts(filters);
  }, [filters]);

  return (
    <CategoryTemplate
      title="Thời Trang Xuân Hạ"
      description="Bộ sưu tập thời trang Xuân Hạ"
      products={products}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};

export default SpringSummer;