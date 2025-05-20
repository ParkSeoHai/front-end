import { Box, Grid2, Pagination, Typography } from "@mui/material";
import SearchForm from "../../component/header/SearchForm";
import ProductItem from "../../component/main_component/ProductItem";
import { useState } from "react";
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate

const ProductTemplate = ({
  title,
  products,
  categories,
  initialCategory,
  onCategoryChange,
  onPriceRangeChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([initialCategory].filter(Boolean));
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const itemsPerPage = 24;

  const priceRanges = [
    { value: 'under500', label: 'Dưới 500.000 VND' },
    { value: '500to1000000', label: 'Từ 500.000 VND- 1.000.000 VND' },
    { value: 'above1000000', label: 'Trên 1.000.000 VND' }
  ];

  const handlePriceRangeToggle = (range) => {
    const newPriceRanges = selectedPriceRanges.includes(range)
      ? selectedPriceRanges.filter(r => r !== range)
      : [...selectedPriceRanges, range];
    setSelectedPriceRanges(newPriceRanges);
    onPriceRangeChange?.(newPriceRanges);
  };

  const handleCategoryToggle = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newCategories);
    onCategoryChange?.(newCategories);
  };

  const filteredProducts = products?.filter(product => {
    const isInCategory = selectedCategories.length > 0
      ? selectedCategories.includes(product.DanhMucSanPham.id)
      : true;

    if (selectedPriceRanges.length > 0) {
      const price = product.GiaSanPham;
      return isInCategory && selectedPriceRanges.some(range => {
        switch (range) {
          case 'under500': return price < 500000;
          case '500to1000000': return price >= 500000 && price <= 1000000;
          case 'above1000000': return price > 1000000;
          default: return true;
        }
      });
    }

    return isInCategory;
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

  return (
    <Box sx={{ maxWidth: "1240px", margin: "30px auto" }}>
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
        <span>{sortedProducts?.length || 0}</span> sản phẩm <span>{title}</span>
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
            <Box sx={{ borderBottom: "1px solid #E1E1E1" }}>
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
                  py: 1.5,
                }}
              >
                Dòng sản phẩm
                <span
                  style={{
                    transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: "22px",
                  }}
                >
                  +
                </span>
              </Typography>
              <Box
                sx={{
                  maxHeight: isExpanded ? "500px" : "0px",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? "translateY(0)" : "translateY(-10px)",
                  visibility: isExpanded ? "visible" : "hidden",
                  pb: isExpanded ? 2 : 0,
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

            <Box sx={{ borderBottom: "1px solid #E1E1E1" }}>
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
                  py: 1.5,
                }}
              >
                Giá
                <span
                  style={{
                    transform: isShowPrice ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: "22px",
                  }}
                >
                  +
                </span>
              </Typography>
              <Box
                sx={{
                  maxHeight: isShowPrice ? "500px" : "0px",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: isShowPrice ? 1 : 0,
                  transform: isShowPrice ? "translateY(0)" : "translateY(-10px)",
                  visibility: isShowPrice ? "visible" : "hidden",
                  pb: isShowPrice ? 2 : 0,
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
                }}>
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
              <Grid2 size={{ xs: 6, md: 2 }} key={product.idSanPham}> 
                {/* Updated Link destination */}
                <Link 
                  to={`/user/product/${product?.idSanPham}`} // Changed to match the new route in App.jsx
                  style={{ textDecoration: 'none', color: 'inherit' }} 
                >
                  <ProductItem 
                    product={product} 
                    image={product.HinhAnh && product.HinhAnh.length > 0 ? product.HinhAnh[0] : '/path-to-placeholder.jpg'} // Handle potential missing image
                    name={product.TenSanPham}
                    price={product.GiaSanPham} 
                    discount={product.GiamGia} 
                    rating={product.DanhGia} 
                    soldCount={product.DaBan} 
                  />
                </Link>
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
  );
};

export default ProductTemplate;
