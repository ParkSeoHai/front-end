import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const PartyDresses = () => {
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
      // Tìm loại sản phẩm "Đầm dự tiệc" trong danh mục "Dự tiệc"
      const dressType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('đầm dự tiệc') &&
        type.DanhMucSanPham.TenDanhMuc === "Dự tiệc"
      );

      if (dressType) {
        // Lọc sản phẩm theo loại sản phẩm
        const dressProducts = products.filter(product => 
          product.LoaiSanPham?.id === dressType.id
        );
        setFilteredProducts(dressProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Dự tiệc"
  const partyCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Dự tiệc"
  );

  return (
    <ProductTemplate
      title="Đầm Dự Tiệc"
      products={filteredProducts}
      categories={categories}
      initialCategory={partyCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default PartyDresses;