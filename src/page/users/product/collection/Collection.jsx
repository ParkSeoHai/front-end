import { useEffect, useState } from "react";
import { useProduct } from "../../../../hooks/useProduct";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Rating,
  Breadcrumbs,
  Link,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useParams, useNavigate } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Collection = () => {
  const { products, handleFetchProducts, fetchAllData } = useProduct();
  const [collectionProducts, setCollectionProducts] = useState([]);
  const { collectionName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchProducts();
    fetchAllData();
    console.log("Collection Name:", collectionName);
  }, []);

  useEffect(() => {
    if (products && collectionName) {
      console.log("All Products:", products);
      
      const filtered = products.filter(product => {
        console.log("Product Style:", product.Style);
        return product.Style?.TenStyle?.toLowerCase() === collectionName.toLowerCase();
      });
      
      console.log("Filtered Products:", filtered);
      setCollectionProducts(filtered);
    }
  }, [products, collectionName]);

  const handleProductClick = (productId) => {
    navigate(`/user/product/${productId}`);
  };

  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "20px" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ marginBottom: "20px" }}
      >
        <Link 
          color="inherit" 
          href="/user"
          sx={{ 
            textDecoration: "none",
            "&:hover": { color: "#000" }
          }}
        >
          Trang chủ
        </Link>
        <Typography color="text.primary">{collectionName || "Bộ sưu tập"}</Typography>
      </Breadcrumbs>

      {/* Collection Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "500",
          textTransform: "uppercase"
        }}
      >
        {collectionName || "Bộ sưu tập mới"}
      </Typography>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {collectionProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.idSanPham}>
            <Box
              onClick={() => handleProductClick(product.idSanPham)}
              sx={{
                position: "relative",
                cursor: "pointer",
                "&:hover": {
                  "& img": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease"
                  }
                }
              }}
            >
              {/* Product Image */}
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "133%", // Tỷ lệ 3:4
                  overflow: "hidden",
                  marginBottom: "10px"
                }}
              >
                <img
                  src={product.HinhAnh?.[0]}
                  alt={product.TenSanPham}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </Box>

              {/* Product Info */}
              <Box sx={{ padding: "10px 0" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#303030",
                    marginBottom: "5px",
                    fontWeight: "600",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {product.TenSanPham}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#303030",
                      fontWeight: "600"
                    }}
                  >
                    {product.GiaSanPham?.toLocaleString("vi-VN")}đ
                  </Typography>
                  <IconButton
                    sx={{
                      color: product.YeuThich ? "#ff4d4f" : "#808284",
                      padding: "4px"
                    }}
                  >
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "5px"
                  }}
                >
                  <Rating
                    value={product.DanhGia || 0}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#656565"
                    }}
                  >
                    ({product.DaBan || 0} đã bán)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Collection; 