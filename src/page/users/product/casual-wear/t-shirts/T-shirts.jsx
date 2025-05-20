import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const TShirts = () => {
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
      // Tìm loại sản phẩm "Áo thun" trong danh mục "Dạo phố"
      const tshirtType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('áo thun') &&
        type.DanhMucSanPham.TenDanhMuc === "Dạo phố"
      );

      if (tshirtType) {
        // Lọc sản phẩm theo loại sản phẩm
        const tshirtProducts = products.filter(product => 
          product.LoaiSanPham?.id === tshirtType.id
        );
        setFilteredProducts(tshirtProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Dạo phố"
  const casualCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Dạo phố"
  );

  return (
    <ProductTemplate
      title="Áo Thun"
      products={filteredProducts}
      categories={categories}
      initialCategory={casualCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default TShirts;