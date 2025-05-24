import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import { useEffect } from "react";
import { useProduct } from "../../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import { useAuth } from "../../../hooks/useAuth";

const Favorites = () => {
  const navigate = useNavigate();
  const { products, handleFetchProducts, handleToggleFavorite } = useProduct();
  const { user } = useAuth();

  useEffect(() => {
    handleFetchProducts();
  }, []);

  // Lọc ra các sản phẩm được yêu thích bởi người dùng hiện tại
  const favoriteProducts = products.filter(product => 
    product.YeuThich.some(fav => fav.userId === user?.id)
  );

  const handleRemoveFromFavorites = async (productId) => {
    try {
      const success = await handleToggleFavorite(productId);
      if (success) {
        toast.success("Đã xóa khỏi danh sách yêu thích");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái yêu thích");
    }
  };

  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "40px 20px", marginTop:{xs: "80px"} }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Sản phẩm yêu thích
      </Typography>

      {favoriteProducts.length === 0 ? (
        <Typography sx={{ color: "#666" }}>
          Bạn chưa có sản phẩm yêu thích nào
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.idSanPham}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <CardMedia
                  component="img"
                  image={`${product?.HinhAnh[0]}`}
                  alt={product.TenSanPham}
                  sx={{ 
                    height: 200,
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/user/product/${product.idSanPham}`)}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'white',
                    '&:hover': { bgcolor: 'white' }
                  }}
                  onClick={() => handleRemoveFromFavorites(product.idSanPham)}
                >
                  <FavoriteIcon sx={{ color: '#dc0606' }} />
                </IconButton>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      fontSize: '1rem',
                      cursor: "pointer",
                      '&:hover': { color: '#dc0606' }
                    }}
                    onClick={() => navigate(`/product/${product.idSanPham}`)}
                  >
                    {product.TenSanPham}
                  </Typography>
                  <Typography variant="body1" color="#dc0606" fontWeight={500}>
                    {product.GiaSanPham.toLocaleString('vi-VN')}đ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;