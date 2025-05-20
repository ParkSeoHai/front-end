import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const OfficeShirts = () => {
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
      // Tìm loại sản phẩm "Áo sơ mi" trong danh mục "Công sở"
      const shirtType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('áo sơ mi') &&
        type.DanhMucSanPham.TenDanhMuc === "Công sở"
      );

      if (shirtType) {
        // Lọc sản phẩm theo loại sản phẩm
        const shirtProducts = products.filter(product => 
          product.LoaiSanPham?.id === shirtType.id
        );
        setFilteredProducts(shirtProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Công sở"
  const officeCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Công sở"
  );

  return (
    <ProductTemplate
      title="Áo Sơ Mi"
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

export default OfficeShirts;