import { useState, useEffect } from 'react';
import CategoryTemplate from '../../../components/templates/CategoryTemplate';
import { useProduct } from '../../../hooks/useProduct';

const Accessories = () => {
  const [filters, setFilters] = useState({ category: 'office-wear' });
  const { products, handleFetchProducts } = useProduct();

  useEffect(() => {
    handleFetchProducts(filters);
  }, [filters]);

  return (
    <CategoryTemplate
      title="Phụ kiện thời trang"
      description="Bộ sưu tập phụ kiện thời trang"
      products={products}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};

export default Accessories;