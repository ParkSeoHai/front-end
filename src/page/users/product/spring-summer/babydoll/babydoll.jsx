import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const BabydollDresses = () => {
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
      // Tìm loại sản phẩm "Đầm babydoll" trong danh mục "Xuân hè"
      const babydollType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('váy babydoll') &&
        type.DanhMucSanPham.TenDanhMuc === "Xuân hạ"
      );

      if (babydollType) {
        // Lọc sản phẩm theo loại sản phẩm
        const babydollProducts = products.filter(product => 
          product.LoaiSanPham?.id === babydollType.id
        );
        setFilteredProducts(babydollProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Xuân hè"
  const springSummerCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Xuân hè"
  );

  return (
    <ProductTemplate
      title="Đầm Babydoll"
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

export default BabydollDresses;