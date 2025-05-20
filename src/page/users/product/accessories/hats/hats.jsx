import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Hats = () => {
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
      // Tìm loại sản phẩm "Mũ"
      const hatProductType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('mũ')
      );

      if (hatProductType) {
        // Lọc sản phẩm theo loại sản phẩm
        const hatsProducts = products.filter(product => 
          product.LoaiSanPham?.id === hatProductType.id
        );
        setFilteredProducts(hatsProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Phụ kiện"
  const accessoryCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Phụ kiện"
  );

  return (
    <ProductTemplate
      title="Mũ & Nón"
      products={filteredProducts}
      categories={categories}
      initialCategory={accessoryCategory?.id}
      onCategoryChange={(categoryIds) => {
        // Optional: Handle category changes
      }}
      onPriceRangeChange={(priceRanges) => {
        // Optional: Handle price range changes
      }}
    />
  );
};

export default Hats;