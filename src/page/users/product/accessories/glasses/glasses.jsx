import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Glasses = () => {
  const { products, categories, productTypes, handleFetchProducts, fetchAllData } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  useEffect(() => {
    if (products && productTypes) {
      // Tìm loại sản phẩm "Kính"
      const glassesProductType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('kính')
      );

      if (glassesProductType) {
        // Lọc sản phẩm theo loại sản phẩm
        const glassesProducts = products.filter(product => 
          product.LoaiSanPham?.id === glassesProductType.id
        );
        setFilteredProducts(glassesProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Phụ kiện"
  const accessoryCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Phụ kiện"
  );

  return (
    <ProductTemplate
      title="Kính Mắt"
      products={filteredProducts}
      categories={categories}
      initialCategory={accessoryCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default Glasses;