import { useState, useEffect } from 'react';
import CategoryTemplate from '../../../components/templates/CategoryTemplate';
import { useProduct } from '../../../hooks/useProduct';

const PartyWear = () => {
  const [filters, setFilters] = useState({ category: 'office-wear' });
  const { products, handleFetchProducts } = useProduct();

  useEffect(() => {
    handleFetchProducts(filters);
  }, [filters]);

  return (
    <CategoryTemplate
      title="Thời Trang Dự Tiệc"
      description="Bộ sưu tập thời trang dự tiệc"
      products={products}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};

export default PartyWear;