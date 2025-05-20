import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Blazers = () => {
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
      // Tìm loại sản phẩm "Áo blazer" trong danh mục "Công sở"
      const blazerType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('áo blazer') &&
        type.DanhMucSanPham.TenDanhMuc === "Công sở"
      );

      if (blazerType) {
        // Lọc sản phẩm theo loại sản phẩm
        const blazerProducts = products.filter(product => 
          product.LoaiSanPham?.id === blazerType.id
        );
        setFilteredProducts(blazerProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Công sở"
  const officeCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Công sở"
  );

  return (
    <ProductTemplate
      title="Áo Blazer"
      products={filteredProducts}
      categories={categories}
      initialCategory={officeCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default Blazers;