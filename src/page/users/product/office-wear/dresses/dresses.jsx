import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const OfficeDresses = () => {
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
      console.log(productTypes);
      // Tìm loại sản phẩm "Đầm công sở" trong danh mục "Công sở"
      const dressType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('đầm công sở') &&
        type.DanhMucSanPham.TenDanhMuc === "Công sở"
      );
    console.log(dressType);
      if (dressType) {
        console.log("dressType", dressType);
        // Lọc sản phẩm theo loại sản phẩm
        const dressProducts = products.filter(product => 
          product.LoaiSanPham?.id === dressType.id
        );
        setFilteredProducts(dressProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Công sở"
  const officeCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Công sở"
  );

  return (
    <ProductTemplate
      title="Đầm Công Sở"
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

export default OfficeDresses;