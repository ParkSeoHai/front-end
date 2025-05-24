import { Box, Grid2, Pagination, Typography } from "@mui/material";
import SearchForm from "../../../component/header/SearchForm";
import { useProduct } from '../../../hooks/useProduct';
import { useState, useEffect } from 'react';

const Sales = () => {
  const { products, handleFetchProducts } = useProduct();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    handleFetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    }
  }, [products]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedProducts = products?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Replace the product grid section
  return (
    <>
      <Box sx={{maxWidth: "1240px", margin: "0 auto"}}>
        <SearchForm/>
        {/* Start Breadcrumbs */}
        <Box>
        </Box>
        {/* End Breadcrumbs */}
        {/* Start Product Sale */}
        <Grid2
          container
          sx={{padding: {xs: "0 14px", md: "0"}, marginTop: "65px"}}
          spacing={{ xs: 1, md: 1 }}
          justifyContent="center"
        >
          {displayedProducts?.map((product) => (
            <Grid2
              size={{ xs: 6, md: 3 }}
              key={product.id}
            >
              <Box sx={{ "&:hover ": {
                transform: "translateY(-10px) scale(1.02)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
              }}}>
                <Box sx={{position: "relative"}}>
                  <img
                    src={`${product.HinhAnh[0]}`}
                    alt={product.TenSanPham}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Box sx={{
                    fontSize: "12px",
                    lineHeight: "12px",
                    color: "#fff",
                    background: "#D40404",
                    display: "inline-block",
                    borderRadius: "8px 0px 8px 0",
                    padding: "4px 9px",
                    position: "absolute",
                    top: "8px",
                    left: "12px",
                  }}>
                    -30%
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#303030",
                    lineHeight: "20px",
                    margin: "13px 0 7px",
                    overflow: "hidden",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {product.TenSanPham}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "13px 0",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      lineHeight: "18px",
                      color: "#D40404",
                      marginRight: "8px",
                      textAlign: "center",
                    }}
                  >
                    {(product.GiaSanPham * (1 - 30/100)).toLocaleString('vi-VN')}đ
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      lineHeight: "15px",
                      color: "#656565",
                      marginRight: "8px",
                      textAlign: "center",
                      textDecoration: "line-through",
                    }}
                  >
                    {product.GiaSanPham.toLocaleString('vi-VN')}đ
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    lineHeight: "13px",
                    color: "#656565",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  <span style={{color:"#D40404"}}>{product.SoLuong}</span> Sản phẩm đã bán
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
        
        <Box sx={{display: "flex", justifyContent: "center", margin: "40px 0"}}>
          <Pagination 
            size="large" 
            count={totalPages} 
            page={page}
            onChange={handlePageChange}
            color="secondary" 
          />
        </Box>
        {/* End Breadcrumbs */}
        {/* Start Product Sale */}
        <Grid2
          sx={{ display: { xs: "none", md: "flex" } }}
          container
          rowSpacing={2}
          spacing={2}
          justifyContent="center"
        >
          {[
            "poster_1.jpg",
            "poster_2.jpg",
            "poster_3.jpg",
            "poster_4.jpg",
            "poster_5.jpg",
            "poster_6.jpg",
          ].map((image, index) => (
            <Grid2 item size={{ xs: 12, md: 6 }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  ":hover img": {
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                  },
                }}
              >
                <img
                  src={`/public/image/${image}`}
                  alt={`Image ${index + 1}`}
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>
        {/* End product style   */}
        </Box>
        </>
  )
};
export default Sales;