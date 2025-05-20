import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const FloralDresses = () => {
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
      // Tìm loại sản phẩm "Đầm hoa" trong danh mục "Xuân hè"
      const floralType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('váy hoa nhí') &&
        type.DanhMucSanPham.TenDanhMuc === "Xuân hạ"
      );

      if (floralType) {
        // Lọc sản phẩm theo loại sản phẩm
        const floralProducts = products.filter(product => 
          product.LoaiSanPham?.id === floralType.id
        );
        setFilteredProducts(floralProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Xuân hè"
  const springSummerCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Xuân hè"
  );

  return (
    <ProductTemplate
      title="Đầm Hoa"
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

export default FloralDresses;