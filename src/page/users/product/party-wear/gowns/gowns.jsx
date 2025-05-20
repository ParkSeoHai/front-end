import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const EveningGowns = () => {
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
      // Tìm loại sản phẩm "Đầm dạ hội" trong danh mục "Dự tiệc"
      const gownType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('đầm dạ hội') &&
        type.DanhMucSanPham.TenDanhMuc === "Dự tiệc"
      );

      if (gownType) {
        // Lọc sản phẩm theo loại sản phẩm
        const gownProducts = products.filter(product => 
          product.LoaiSanPham?.id === gownType.id
        );
        setFilteredProducts(gownProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Dự tiệc"
  const partyCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Dự tiệc"
  );

  return (
    <ProductTemplate
      title="Đầm Dạ Hội"
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

export default EveningGowns;