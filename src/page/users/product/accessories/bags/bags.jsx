import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import ProductTemplate from "../../../../../components/templates/ProductTemplate";

const Bags = () => {
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
      // Tìm loại sản phẩm "Túi"
      const bagProductType = productTypes.find(type => 
        type.TenLoaiSanPham.toLowerCase().includes('túi')
      );

      if (bagProductType) {
        // Lọc sản phẩm theo loại sản phẩm
        const bagsProducts = products.filter(product => 
          product.LoaiSanPham?.id === bagProductType.id
        );
        setFilteredProducts(bagsProducts);
      }
    }
  }, [products, productTypes]);

  // Tìm danh mục "Phụ kiện"
  const accessoryCategory = categories?.find(cat => 
    cat.TenDanhMuc === "Phụ kiện"
  );

  return (
    <ProductTemplate
      title="Túi Xách"
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

export default Bags;