import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Jewelry = () => {
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
      // Tìm loại sản phẩm "Trang sức"
      const jewelryProductType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('trang sức')
      );

      if (jewelryProductType) {
        // Lọc sản phẩm theo loại sản phẩm
        const jewelryProducts = products.filter(product => 
          product.LoaiSanPham?.id === jewelryProductType.id
        );
        setFilteredProducts(jewelryProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Phụ kiện"
  const accessoryCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Phụ kiện"
  );

  return (
    <ProductTemplate
      title="Trang Sức"
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

export default Jewelry;