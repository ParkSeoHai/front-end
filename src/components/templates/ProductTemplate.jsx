import { Box, Grid2, Pagination, Typography, IconButton, Drawer } from "@mui/material";
import SearchForm from "../../component/header/SearchForm";
import ProductItem from "../../component/main_component/productItem";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const itemsPerPage = 24;
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedPriceRanges, sortBy]);

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
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ maxWidth: "1240px", margin: "30px auto", px: { xs: 2, md: 3 } }}>
      <SearchForm />
      
      {/* Title section */}
      <Typography
        variant="h4"
        sx={{
          marginTop: { xs: "30px", md: "30px" },
          fontSize: { xs: "16px", md: "18px" },
          color: "#303030",
          fontWeight: "600",
          borderBottom: "1px solid #E1E1E1",
          paddingBottom: { xs: "20px", md: "20px" },
          marginBottom: "30px"
        }}
      >
        <span>{sortedProducts?.length || 0}</span> sản phẩm <span>{title}</span>
      </Typography>
      
      {/* Mobile filter button - visible only on mobile */}
      <Box sx={{ 
        display: { xs: 'flex', sm: 'none' }, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 2, 
        mb: 2,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: '#fff',
        py: 1,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Box 
          onClick={() => setDrawerOpen(true)}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '1px solid #E1E1E1',
            borderRadius: '4px',
            px: 2,
            py: 0.5,
            cursor: 'pointer'
          }}
        >
          <FilterAltIcon sx={{ fontSize: 20, mr: 0.5 }} />
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Bộ lọc</Typography>
        </Box>
        
        <Box sx={{ width: '60%' }}>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ 
              padding: '8px 12px',
              border: '1px solid #E1E1E1',
              borderRadius: '4px',
              fontWeight: 500,
              fontSize: '14px',
              color: '#303030',
              outline: 'none',
              width: '100%'
            }}
          >
            <option value="newest">Mới nhất</option>
            <option value="priceAsc">Giá: Thấp đến cao</option>
            <option value="priceDesc">Giá: Cao đến thấp</option>
          </select>
        </Box>
      </Box>

      {/* Mobile filter drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '85%',
            maxWidth: '320px',
            boxSizing: 'border-box',
          },
          display: { xs: 'block', sm: 'none' }
        }}
      >
        <Box sx={{ 
          padding: "20px", 
          bgcolor: "#fff", 
          height: "100%"
        }}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            mb: 2 
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Bộ lọc
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ borderBottom: "1px solid #E1E1E1" }}>
            <Typography
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                fontSize: "15px",
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
                      style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <Typography sx={{ ml: 1, fontSize: "13px" }}>
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
                fontSize: "15px",
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
                      style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <Typography sx={{ ml: 1, fontSize: "13px" }}>
                      {range.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Box 
              sx={{ 
                bgcolor: '#D40404', 
                color: '#fff', 
                py: 1, 
                px: 3, 
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                textAlign: 'center'
              }}
              onClick={() => setDrawerOpen(false)}
            >
              Áp dụng
            </Box>
          </Box>
        </Box>
      </Drawer>
      
      {/* Main content area with horizontal layout */}
      <Box 
        sx={{ 
          display: { xs: 'flex', md: 'flex', sm: 'flex' }, 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 3 }
        }}
      >
        {/* Desktop sidebar - hidden on mobile */}
        <Box 
          sx={{ 
            width: '260px', 
            display: { xs: 'none', md: 'block' },
            flexShrink: 0
          }}
        >
          {/* Category filter */}
          <Box sx={{ 
            bgcolor: "#fff",
            mb: 2
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: "1px solid #E1E1E1",
              py: 1.5,
              px: 2
            }}>
              <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#303030" }}>
                Dòng sản phẩm
              </Typography>
              <Box 
                sx={{
                  cursor: 'pointer',
                  fontSize: "16px",
                  fontWeight: 'bold',
                  transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                +
              </Box>
            </Box>

            <Box
              sx={{
                maxHeight: isExpanded ? "500px" : "0px",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: isExpanded ? 1 : 0,
                visibility: isExpanded ? "visible" : "hidden",
                p: isExpanded ? 2 : 0,
              }}
            >
              {categories?.map((category) => (
                <Box
                  key={category.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    "&:last-child": { mb: 0 },
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                  <Typography sx={{ ml: 1.5, fontSize: "14px", color: "#303030" }}>
                    {category.TenDanhMuc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Price filter */}
          <Box sx={{ 
            bgcolor: "#fff"
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: "1px solid #E1E1E1",
              py: 1.5,
              px: 2
            }}>
              <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#303030" }}>
                Giá
              </Typography>
              <Box 
                sx={{
                  cursor: 'pointer',
                  fontSize: "16px",
                  fontWeight: 'bold',
                  transform: isShowPrice ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={() => setIsShowPrice(!isShowPrice)}
              >
                +
              </Box>
            </Box>

            <Box
              sx={{
                maxHeight: isShowPrice ? "500px" : "0px",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: isShowPrice ? 1 : 0,
                visibility: isShowPrice ? "visible" : "hidden",
                p: isShowPrice ? 2 : 0,
              }}
            >
              {priceRanges.map((range) => (
                <Box
                  key={range.value}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    "&:last-child": { mb: 0 },
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.value)}
                    onChange={() => handlePriceRangeToggle(range.value)}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                  <Typography sx={{ ml: 1.5, fontSize: "14px", color: "#303030" }}>
                    {range.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Products section */}
        <Box sx={{ flex: 1 }}>
          {/* Sorting and results count */}
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: { xs: 2, md: 0 }
            }}>
              <Typography sx={{ fontSize: '14px', color: '#303030', mr: 1, fontWeight: 500 }}>
                Xem theo
              </Typography>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ 
                  padding: '6px 30px 6px 10px',
                  border: '1px solid #E1E1E1',
                  borderRadius: '4px',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#303030',
                  outline: 'none',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                  backgroundSize: '16px'
                }}
              >
                <option value="newest">Mới nhất</option>
                <option value="priceAsc">Từ thấp đến cao</option>
                <option value="priceDesc">Từ cao đến thấp</option>
              </select>
            </Box>

            <Typography sx={{
              fontWeight: 600, 
              fontSize: '14px', 
              color: '#303030'
            }}>
              Hiển thị <span style={{ color: '#D40404' }}>
                {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, sortedProducts?.length || 0)} / {sortedProducts?.length || 0}
              </span> sản phẩm
            </Typography>
          </Box>

          {/* Products grid */}
          <Grid2 size={{ xs: 6, md: 9 }}>
          <Grid2
             container
             sx={{padding: {xs: "0 14px", md: "0"}, marginTop: "65px"}}
             spacing={{ xs: 1, md: 1 }}
            justifyContent="center"
          >
            {displayedProducts?.map((product) => (
              <Grid2 size={{ xs: 6, md: 3 }} columns={{xs: 3}} key={product.idSanPham}> 
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

          {/* Show count on mobile */}
          <Typography sx={{
            textAlign: 'center', 
            mt: 2, 
            fontSize: '13px', 
            color: '#707070',
            display: { xs: 'block', sm: 'none' }
          }}>
            Hiển thị {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, sortedProducts?.length || 0)} / {sortedProducts?.length || 0} sản phẩm
          </Typography>
          
          {/* Empty state */}
          {displayedProducts?.length === 0 && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              py: 8,
              px: 2
            }}>
              <Typography sx={{ fontSize: '16px', mb: 1, color: '#505050', textAlign: 'center' }}>
                Không có sản phẩm nào phù hợp với tiêu chí lọc
              </Typography>
              <Typography 
                onClick={() => {
                  setSelectedCategories(initialCategory ? [initialCategory] : []);
                  setSelectedPriceRanges([]);
                }}
                sx={{ 
                  color: '#D40404', 
                  cursor: 'pointer', 
                  fontWeight: 500,
                  fontSize: '14px',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Xóa bộ lọc
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center", 
              margin: { xs: "30px 0", md: "40px 0" }
            }}>
              <Pagination 
                size={{ xs: "medium", md: "large" }}
                count={totalPages} 
                page={page}
                onChange={handlePageChange}
                color="secondary"
                siblingCount={{ xs: 0, md: 1 }}
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Add PropTypes validation
ProductTemplate.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
  categories: PropTypes.array,
  initialCategory: PropTypes.string,
  onCategoryChange: PropTypes.func,
  onPriceRangeChange: PropTypes.func
};

export default ProductTemplate;
