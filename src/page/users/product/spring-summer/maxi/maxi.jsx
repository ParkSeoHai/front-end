import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const MaxiDresses = () => {
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
      // Tìm loại sản phẩm "Đầm maxi" trong danh mục "Xuân hè"
      console.log("productTypes", productTypes)
      const maxiType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('đầm maxi') &&
        type.DanhMucSanPham.TenDanhMuc === "Xuân hạ"
      );
      console.log("maxiType", maxiType)
      if (maxiType) {
        // Lọc sản phẩm theo loại sản phẩm
        const maxiProducts = products.filter(product => 
          product.LoaiSanPham?.id === maxiType.id
        );
        setFilteredProducts(maxiProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Xuân hè"
  const springSummerCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Xuân hè"
  );

  return (
    <ProductTemplate
      title="Đầm Maxi"
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

export default MaxiDresses;