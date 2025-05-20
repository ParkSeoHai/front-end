import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Shorts = () => {
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
      // Tìm loại sản phẩm "Quần sooc" trong danh mục "Dạo phố"
      const shortsType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('quần sooc') &&
        type.DanhMucSanPham.TenDanhMuc === "Dạo phố"
      );

      if (shortsType) {
        // Lọc sản phẩm theo loại sản phẩm
        const shortsProducts = products.filter(product => 
          product.LoaiSanPham?.id === shortsType.id
        );
        setFilteredProducts(shortsProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Dạo phố"
  const casualCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Dạo phố"
  );

  return (
    <ProductTemplate
      title="Quần Sooc"
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

export default Shorts;