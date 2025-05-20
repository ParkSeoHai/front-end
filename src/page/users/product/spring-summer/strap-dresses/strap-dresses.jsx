import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const StrapDresses = () => {
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
      // Tìm loại sản phẩm "Đầm hai dây" trong danh mục "Xuân hè"
      const strapType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('váy 2 dây') &&
        type.DanhMucSanPham.TenDanhMuc === "Xuân hạ"
      );

      if (strapType) {
        // Lọc sản phẩm theo loại sản phẩm
        const strapProducts = products.filter(product => 
          product.LoaiSanPham?.id === strapType.id
        );
        setFilteredProducts(strapProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Xuân hè"
  const springSummerCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Xuân hè"
  );

  return (
    <ProductTemplate
      title="Đầm Hai Dây"
      products={filteredProducts}
      categories={categories}
      initialCategory={springSummerCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default StrapDresses;