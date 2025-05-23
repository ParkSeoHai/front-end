import {
  Box,
  Grid2,
  Pagination,
  Typography,
} from "@mui/material";
import SearchForm from "../../../component/header/SearchForm";
import ProductItem from "../../../component/main_component/productItem";
import { useEffect, useState } from "react";
import { useProduct } from "../../../hooks/useProduct";

const Pants = () => {
  const { products, categories, handleFetchProducts, fetchAllData } = useProduct();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const itemsPerPage = 24;

  const priceRanges = [
    { value: 'under350', label: 'Dưới 350.000đ' },
    { value: '350to750', label: 'Từ 350.000đ - 750.000đ' },
    { value: 'above750', label: 'Trên 750.000đ' }
  ];

  const handlePriceRangeToggle = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([handleFetchProducts(), fetchAllData()]);
      const pantsCategory = categories?.find(cat => 
        cat.TenDanhMuc.toLowerCase().includes('quần')
      );
      if (pantsCategory) {
        setSelectedCategories([pantsCategory.id]);
      }
    };

    initializePage();
  }, []);

  const filteredProducts = products?.filter(product => {
    const isPantsProduct = selectedCategories.length > 0 
      ? selectedCategories.includes(product.DanhMucSanPham.id)
      : product.DanhMucSanPham.TenDanhMuc.toLowerCase().includes('quần');

    if (selectedPriceRanges.length > 0) {
      const price = product.GiaSanPham;
      return isPantsProduct && selectedPriceRanges.some(range => {
        switch (range) {
          case 'under350': return price < 350000;
          case '350to750': return price >= 350000 && price <= 750000;
          case 'above750': return price > 750000;
          default: return true;
        }
      });
    }

    return isPantsProduct;
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc': return a.GiaSanPham - b.GiaSanPham;
      case 'priceDesc': return b.GiaSanPham - a.GiaSanPham;
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      default: return 0;
    }
  });

  const totalPages = Math.ceil((sortedProducts?.length || 0) / itemsPerPage);
  const displayedProducts = sortedProducts?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };
 
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <>
      <Box sx={{ maxWidth: "1240px", margin: "0 auto" }}>
        <SearchForm />
        <Box></Box>
        <Typography
          variant="h4"
          sx={{
            marginTop: "50px",
            fontSize: "18px",
            color: "#303030",
            fontWeight: "600",
          }}
        >
          <span>{sortedProducts?.length || 0}</span> sản phẩm <span>Quần</span>
        </Typography>
        <Box sx={{ borderBottom: "1px solid #E1E1E1", paddingBottom: "38px" }} />
        <Grid2
          container
          sx={{ padding: { xs: "0 14px", md: "0" }, marginTop: "65px" }}
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
        >
          <Grid2 size={{ xs: 6, md: 3 }}>
            <Box sx={{ padding: "20px", bgcolor: "#fff", width: "300px" }}>
              <Box>
                <Typography
                  onClick={() => setIsExpanded(!isExpanded)}
                  sx={{
                    fontSize: "16px",
                    color: "#303030",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  Dòng sản phẩm
                  <span
                    style={{
                      transform: isExpanded ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s",
                      fontSize: "22px",
                    }}
                  >
                    +
                  </span>
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    height: "110px",
                    maxHeight: isExpanded ? "110px" : "0",
                    overflow: isExpanded ? "auto" : "hidden",
                    transition: "all 0.3s ease-in-out",
                    opacity: isExpanded ? 1 : 0,
                    position: "relative",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#D40404",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Box>
                    {categories?.map((category) => (
                      <Box
                        key={category.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          "&:last-child": { mb: 0 },
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          style={{ cursor: 'pointer' }}
                        />
                        <Typography sx={{ ml: 1, fontSize: "14px" }}>
                          {category.TenDanhMuc}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ marginTop: "20px" }}>
                <Typography
                  onClick={() => setIsShowPrice(!isShowPrice)}
                  sx={{
                    fontSize: "16px",
                    color: "#303030",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  Theo giá
                  <span
                    style={{
                      transform: isShowPrice ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s",
                      fontSize: "22px",
                    }}
                  >
                    +
                  </span>
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    maxHeight: isShowPrice ? "250px" : "0",
                    overflow: isShowPrice ? "visible" : "hidden",
                    transition: "all 0.3s ease-in-out",
                    opacity: isShowPrice ? 1 : 0,
                  }}
                >
                  <Box>
                    {priceRanges.map((range) => (
                      <Box
                        key={range.value}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          "&:last-child": { mb: 0 },
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(range.value)}
                          onChange={() => handlePriceRangeToggle(range.value)}
                          style={{ cursor: 'pointer' }}
                        />
                        <Typography sx={{ ml: 1, fontSize: "14px" }}>
                          {range.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 9 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', color: '#303030', mr: 1, fontWeight: 500 }}>
                  Xem theo
                </Typography>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ 
                    padding: '8px 12px',
                    border: '1px solid #E1E1E1',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#303030',
                    outline: 'none'
                  }}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="priceAsc">Từ thấp đến cao</option>
                  <option value="priceDesc">Từ cao đến thấp</option>
                </select>
              </Box>
              <Typography sx={{fontWeight: 600, fontSize: '14px', color: '#303030' }}>
                Hiển thị <span style={{ color: '#D40404', fontSize: "18px" }}>
                  {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, sortedProducts?.length || 0)} / {sortedProducts?.length || 0}
                </span> sản phẩm
              </Typography>
            </Box>

            <Grid2
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 8 }}
              justifyContent="center"
            >
              {displayedProducts?.map((product) => (
                <Grid2 size={{ xs: 6, md: 2 }} key={product.id}>
                  <ProductItem 
                    product={product}
                    image={`${product.HinhAnh[0]}`}
                    name={product.TenSanPham}
                    price={product.GiaSanPham}
                    discount={product.GiamGia}
                    rating={product.DanhGia}
                    soldCount={product.SoLuong}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>

        <Box sx={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
          <Pagination 
            size="large" 
            count={totalPages} 
            page={page}
            onChange={handlePageChange}
            color="secondary" 
          />
        </Box>
      </Box>
    </>
  );
};

export default Pants;
