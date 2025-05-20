import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const OfficeSkirts = () => {
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
      // Tìm loại sản phẩm "Chân váy" trong danh mục "Công sở"
      const skirtType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('chân váy') &&
        type.DanhMucSanPham.TenDanhMuc === "Công sở"
      );

      if (skirtType) {
        // Lọc sản phẩm theo loại sản phẩm
        const skirtProducts = products.filter(product => 
          product.LoaiSanPham?.id === skirtType.id
        );
        setFilteredProducts(skirtProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Công sở"
  const officeCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Công sở"
  );

  return (
    <ProductTemplate
      title="Chân Váy Công Sở"
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

export default OfficeSkirts;