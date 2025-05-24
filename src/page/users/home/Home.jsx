import  { useEffect } from "react";
import Slider from "react-slick";
import {
  Box,
  Grid2,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
// Add useProduct import and get categories data
import { useProduct } from "../../../hooks/useProduct";
import SearchForm from "../../../component/header/SearchForm";

const Home = () => {
  const navigate = useNavigate();
  // Update the destructuring to include products and handleFetchProducts
  const { categories, products,styles, fetchAllData, handleFetchProducts } = useProduct();
  console.log(categories);
  // Add this effect to fetch products
  useEffect(() => {
    fetchAllData();
    handleFetchProducts();
  }, []);

  // Replace the product grid section

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const handleCategoryClick = (category) => {
    const categoryRouteMap = {
      'Công sở': '/user/office-wear/shirts',
      'Dạo phố': '/user/casual-wear/t-shirts',
      'Xuân hạ': '/user/spring-summer/babydoll',
      'Phụ kiện': '/user/accessories/bags',
      'Dự tiệc': '/user/party-wear/dresses'
    };
  
    const route = categoryRouteMap[category.TenDanhMuc];
    if (route) {
      navigate(route);
    }
  };
  return (
    <Box>
      {/* Add SearchForm at the top of the page */}
     
      
      {/* Start Banner */}
      <Box className="relative" sx={{ 
        margin: "0 auto",
        display: { xs: 'none', md: 'block' },
        '& .slick-slider': {
          '& img': {
            width: '100%',
            height: { xs: '200px', sm: '300px', md: 'auto' }, // Responsive height
            objectFit: 'cover'
          }
        },
        '& .slick-dots': {
          bottom: { xs: '10px', md: '25px' }
        }
      }}>
        <Slider {...settings}>
          <div>
            <img 
              src="/image/poster_1.jpg" 
              alt="Slide 1"
            />
          </div>
          <div>
            <img 
              src="/image/poster_2.jpg" 
              alt="Slide 2"
            />
          </div>
          <div>
            <img 
              src="/image/poster_3.jpg" 
              alt="Slide 3"
            />
          </div>
        </Slider>
        <Box sx={{ 
          position: 'absolute',
          width: '100%',
          top: { xs: '50%', md: '90%' },
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}>
          <SearchForm />
        </Box>
      </Box>
      {/*End Banner */}
      {/* Start container */}
      <Box sx={{ maxWidth: "1240px", margin: "0 auto" }}>
        {/*Start Category */}
        {/* Desktop Category */}
        <Box
          sx={{
            padding: "60px 0 70px",
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          {categories?.map((category, index) => (
            <Box
              key={category.id}
              sx={{
                display: "inline-block",
                border: "1px dashed #969696",
                padding: "9px",
                borderRadius: "50%",
                marginRight: index < categories.length - 1 ? "30px" : "0",
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#EEEEEE",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  padding: "15px 0",
                  "&:hover ": {
                    cursor: "pointer",
                    background: "#303030",
                  },
                  "&:hover img": {
                    filter: "invert(1)",
                    transform: "rotateY(360deg)",
                    transition: "transform .4s ease-out",
                  },
                  "&:hover .MuiTypography-root": {
                    color: "#fff",
                  },
                }}
              >
                <img
                  width={40}
                  height={40}
                  src={`${category.HinhAnh}`}
                  alt={category.TenDanhMuc}
                />
                <Typography
                  sx={{
                    color: "#303030",
                    fontWeight: "600",
                    marginTop: "15px",
                    textTransform: "uppercase",
                    lineHeight: "14px",
                    fontSize: "14px",
                  }}
                >
                  {category.TenDanhMuc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Mobile Category */}
        <Box sx={{ 
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          top: 56,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          zIndex: 1000,
          borderBottom: '1px solid #eee'
        }}>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              px: 2,
              py: 1.5,
              gap: 2,
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none'
            }}
          >
            {categories.map((item) => (
              <Box
                key={item.id} // Sửa thành item.id
                sx={{
                  whiteSpace: 'nowrap',
                  color: item.TenDanhMuc === 'GIẢM GIÁ' ? '#cc0f0f' : '#303030',
                  fontSize: '13px',
                  fontWeight: item.TenDanhMuc === 'GIẢM GIÁ' ? 600 : 400,
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#cc0f0f'
                  }
                }}
                onClick={() => handleCategoryClick(item)}
              >
                {item?.TenDanhMuc}
              </Box>
            ))}
          </Box>
        </Box>
        {/*End Category */}
        {/* Start product style  */}
        <Grid2
          sx={{ display: { xs: "none", md: "flex" } }}
          container
          spacing={2}
          justifyContent="center"
        >
          {styles?.slice(0, 6).map((style) => (
            <Grid2 item size={{ xs: 12, md: 6 }} key={style.id}>
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
                onClick={() => navigate(`/user/collection/${style.TenStyle?.toLowerCase()}`)}
              >
                <img
                  src={style.HinhAnh}
                  alt={style.TenStyle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>
        {/* End product style   */}
        {/* Start Best saler */}
        <Box>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: "25px",
                lineHeight: "24px",
                color: "#303030",
                padding: "40px 0 20px",
                display: { xs: "none", md: "block" },
              }}
            >
              SẢN PHẨM BÁN CHẠY
            </Typography>
            <Grid2
              container
              sx={{ padding: { xs: "0 14px", md: "0 100px" },marginTop:{xs:"112px",md:"0"} }}
              spacing={{ xs: 1, md: 3 }}
              justifyContent="center"
            >
              {products?.slice(0,5)?.map((product, index) => (
                <Grid2 size={{ xs: 6, md: 2 }} key={product.id}>
                  <Box
                    sx={{
                      "&:hover ": {
                        transform: "translateY(-10px) scale(1.02)",
                        transition: "transform 0.3s ease-in-out",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => navigate(`/user/product/${product.idSanPham}`)} // Navigate to product detail
                  >
                    <img
                      src={product.HinhAnh[0]} // Assuming HinhAnh is an array of image URLs
                      alt={product.TenSanPham}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#303030",
                        lineHeight: "20px",
                        margin: "13px 0 7px",
                        overflow: "hidden",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                        fontWeight: "600",
                      }}
                    >
                      {product.TenSanPham}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#303030",
                            fontWeight: "600",
                          }}
                        >
                          {product.GiaSanPham?.toLocaleString("vi-VN")} đ
                        </Typography>
                      </Box>
                      <Box sx={{ display: "inline-block", marginLeft: "10px" }}>
                        <IconButton
                          sx={{
                            color: product.YeuThich ? "#ff4d4f" : "#808284",
                            p: 0,
                          }}
                        >
                          <FavoriteBorderOutlinedIcon
                            sx={{ fontSize: "20px" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        sx={{ "&.MuiRating-sizeMedium": { fontSize: "16px" } }}
                        name="half-rating"
                        value={product.DanhGia || 0}
                        precision={0.5}
                        readOnly
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#656565",
                          lineHeight: "20px",
                          fontWeight: "600",
                        }}
                      >
                        ({product?.DaBan} đã bán)
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Box>
        {/* End Best saler */}
      </Box>
      {/* End container */}
    </Box>
  );
};

export default Home;
