import { useEffect, useState } from "react";
import { useProduct } from "../../../../hooks/useProduct";
import ProductTemplate from "../../../../components/templates/ProductTemplate";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
    };
    initializePage();
  }, []);

  useEffect(() => {
    if (products) {
      // Lấy từ khóa tìm kiếm từ URL
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("q")?.toLowerCase() || "";
      setSearchQuery(query);

      if (query) {
        // Lọc sản phẩm dựa trên từ khóa tìm kiếm
        const searchResults = products.filter(product => {
          const productName = product.TenSanPham?.toLowerCase() || "";
          const productDescription = product.MoTa?.toLowerCase() || "";
          const productType = product.LoaiSanPham?.TenLoaiSanPham?.toLowerCase() || "";
          const productCategory = product.LoaiSanPham?.DanhMucSanPham?.TenDanhMuc?.toLowerCase() || "";
          
          return (
            productName.includes(query) ||
            productDescription.includes(query) ||
            productType.includes(query) ||
            productCategory.includes(query)
          );
        });
        setFilteredProducts(searchResults);
      } else {
        setFilteredProducts([]);
      }
    }
  }, [products, location.search]);

  const handleCategoryChange = (categoryIds) => {
    if (!products) return;

    const filtered = products.filter(product => {
      if (!categoryIds || categoryIds.length === 0) return true;
      return categoryIds.includes(product.LoaiSanPham?.DanhMucSanPham?.id);
    }).filter(product => {
      if (!searchQuery) return true;
      const productName = product.TenSanPham?.toLowerCase() || "";
      const productDescription = product.MoTa?.toLowerCase() || "";
      const productType = product.LoaiSanPham?.TenLoaiSanPham?.toLowerCase() || "";
      const productCategory = product.LoaiSanPham?.DanhMucSanPham?.TenDanhMuc?.toLowerCase() || "";
      
      return (
        productName.includes(searchQuery) ||
        productDescription.includes(searchQuery) ||
        productType.includes(searchQuery) ||
        productCategory.includes(searchQuery)
      );
    });

    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (priceRanges) => {
    if (!products) return;

    const filtered = products.filter(product => {
      if (!priceRanges || priceRanges.length === 0) return true;
      const price = product.GiaSanPham || 0;
      return priceRanges.some(range => {
        const [min, max] = range.split('-').map(Number);
        return price >= min && (max === 0 || price <= max);
      });
    }).filter(product => {
      if (!searchQuery) return true;
      const productName = product.TenSanPham?.toLowerCase() || "";
      const productDescription = product.MoTa?.toLowerCase() || "";
      const productType = product.LoaiSanPham?.TenLoaiSanPham?.toLowerCase() || "";
      const productCategory = product.LoaiSanPham?.DanhMucSanPham?.TenDanhMuc?.toLowerCase() || "";
      
      return (
        productName.includes(searchQuery) ||
        productDescription.includes(searchQuery) ||
        productType.includes(searchQuery) ||
        productCategory.includes(searchQuery)
      );
    });

    setFilteredProducts(filtered);
  };

  return (
    <ProductTemplate
      title={`Kết quả tìm kiếm "${searchQuery}" (${filteredProducts.length} sản phẩm)`}
      products={filteredProducts}
      categories={categories}
      initialCategory={null}
      onCategoryChange={handleCategoryChange}
      onPriceRangeChange={handlePriceRangeChange}
    />
  );
};

export default SearchResults; 