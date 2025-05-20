import { Box, Button, Typography, Grid, Collapse, Rating, Grid2, Card, CardMedia, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from "@mui/icons-material/Star";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../hooks/useAuth";
import ProductTemplate from "../../../components/templates/ProductTemplate";
import ProductItem from "../../../component/main_component/ProductItem";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { handleFetchProductById, selectedProduct, sizes, fetchAllData, handleToggleFavorite,products,handleFetchProducts } = useProduct();
  const { handleAddToCart, handleFetchCart } = useCart();
  const { getUser, user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [reviews, setReviews] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
  });
    const isOutOfStock = selectedProduct?.SoLuong === 0;
  console.log("products", products);
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    handleFetchProductById(id);
    fetchAllData()
    getUser()
    handleFetchProducts()
  }, [id]);

  useEffect(() => {
    if (selectedProduct?.HinhAnh && selectedProduct.HinhAnh.length > 0) {
      setMainImage(selectedProduct.HinhAnh[0]);
    }
  }, [selectedProduct]);
  useEffect(() => {
    if (products && products.length > 0) {
      const filteredProducts = products.filter(p => p.idSanPham !== id);
      const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 6));
    }
  }, [products, id]);
  const handleMuaNgay = async () => {
    if (!selectedSize) {
      toast.warning("Vui lòng chọn kích thước");
      return;
    }
    if (!selectedColor) {
      toast.warning("Vui lòng chọn màu sắc");
      return;
    }
    const cartItem = {
      user,
      idSanPham: selectedProduct.idSanPham,
      SoLuong: quantity,
      MauSac: selectedColor,
      KichThuoc: selectedSize,
    };
    try {
      const success = await handleAddToCart(cartItem);
      if (success) {
        await handleFetchCart();
        navigate("/user/cart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Có lỗi xảy ra khi mua hàng");
    }
  }
  const handleAddProductToCart = async () => {
    if (!selectedSize) {
      toast.warning("Vui lòng chọn kích thước");
      return;
    }
    if (!selectedColor) {
      toast.warning("Vui lòng chọn màu sắc");
      return;
    }
    const cartItem = {
      user,
      idSanPham: selectedProduct.idSanPham,
      SoLuong: quantity,
      MauSac: selectedColor,
      KichThuoc: selectedSize,
    };
    try {
      const success = await handleAddToCart(cartItem);
      if (success) {
        await handleFetchCart();
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };
  const isFavorited = selectedProduct?.YeuThich?.some(fav => fav.userId === user?.id);

  const handleToggleFavoriteClick = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để thêm vào danh sách yêu thích");
      return;
    }

    if (!selectedProduct) return;
    try {
      const success = await handleToggleFavorite(selectedProduct.idSanPham);
      if (success) {
        toast.success("Đã cập nhật trạng thái yêu thích");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái yêu thích");
    }
  };

  // Trong phần render, sử dụng isFavorited để hiển thị icon phù hợp
  { isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon /> }

  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "20px" }}>
      <Typography sx={{ mb: 2, color: "#666" }}>
        Trang chủ / Quần / Quần Ngắn 3S
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Thumbnails */}
            <Box sx={{ width: 80 }}>
              {selectedProduct?.HinhAnh?.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: 80,
                    border:
                      mainImage === image
                        ? "2px solid #333"
                        : "1px solid #e1e1e1",
                    mb: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={`https://back-end-gray-pi.vercel.app${image}`}
                    alt={`Product thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
            {/* Main Image */}
            <Box sx={{ flex: 1, height: 600 }}>
              {mainImage && (
                <img
                  src={`https://back-end-gray-pi.vercel.app${mainImage}`}
                  alt="Main product image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right side - Product info */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h1"
            sx={{ fontSize: 24, fontWeight: 500, mb: 2 }}
          >
            {selectedProduct?.TenSanPham}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} sx={{ color: "#666", fontSize: 16 }} />
              ))}
            </Box>
          </Box>
          <Typography
            sx={{ color: "#dc0606", fontSize: 24, fontWeight: 500, mb: 3 }}
          >
            {selectedProduct?.GiaSanPham?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Màu sắc:</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {selectedProduct?.MauSac?.map((color, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedColor(color.MaMau)}
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: color.MaMau,
                    border: "1px solid #ddd",
                    borderRadius: "50%",
                    cursor: "pointer",
                    outline:
                      selectedColor === color.MaMau ? "2px solid #000" : "none",
                    outlineOffset: 2,
                    position: "relative",
                    "&:hover": {
                      "&::after": {
                        content: `"${color.TenMau}"`,
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Size:</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {sizes.map((size) => (
                <Button
                  key={size.id}
                  variant={selectedSize === size.id ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size.id)}
                  sx={{
                    minWidth: "40px",
                    height: "40px",
                    bgcolor: selectedSize === size.id ? "#333" : "transparent",
                    color: selectedSize === size.id ? "#fff" : "#333",
                    border: "1px solid #ddd",
                    "&:hover": {
                      bgcolor: selectedSize === size.id ? "#333" : "transparent",
                    },
                  }}
                >
                  {size.TenKichThuoc}
                </Button>
              ))}
            </Box>
          </Box>
          {/* <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Số lượng:</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={handleDecrement}
                sx={{
                  minWidth: "40px",
                  height: "40px",
                  border: "1px solid #ddd",
                  color: "#333",
                }}
              >
                <RemoveIcon />
              </Button>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <Button
                variant="outlined"
                onClick={handleIncrement}
                sx={{
                  minWidth: "40px",
                  height: "40px",
                  border: "1px solid #ddd",
                  color: "#333",
                }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box> */}
        

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleToggleFavoriteClick}
              sx={{
                minWidth: "50px",
                height: "48px",
                border: "1px solid #ddd",
                color: isFavorited ? "#dc0606" : "#333",
                padding: 0,
                "&:hover": {
                  border: "1px solid #333",
                },
              }}
            >
              {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
            <Button
              variant="outlined"
              onClick={handleAddProductToCart}
              disabled={isOutOfStock}
              sx={{
                flex: 1,
                height: 48,
                border: "1px solid #333",
                color: "#333",
                "&:hover": {
                  border: "1px solid #333",
                  bgcolor: "transparent",
                },
                "&.Mui-disabled": {
                  bgcolor: "#f5f5f5",
                  color: "#999",
                  border: "1px solid #ddd"
                }
              }}
            >
              {isOutOfStock ? "HẾT HÀNG" : "THÊM VÀO GIỎ HÀNG"}
            </Button>
            <Button
              variant="contained"
              disabled={isOutOfStock}
              sx={{
                flex: 1,
                height: 48,
                bgcolor: "#333",
                "&:hover": {
                  bgcolor: "#000",
                },
                "&.Mui-disabled": {
                  bgcolor: "#f5f5f5",
                  color: "#999"
                }
              }}
              onClick={handleMuaNgay}
            >
              {isOutOfStock ? "HẾT HÀNG" : "MUA NGAY"}
            </Button>
          </Box>
          <Box>
            <Box
              onClick={() => setShowDetails(!showDetails)}
              sx={{
                p: 2,
                cursor: "pointer",
                borderTop: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <Typography>Bài viết chi tiết</Typography>
              {showDetails ? <RemoveIcon /> : <AddIcon />}
            </Box>
            <Collapse in={showDetails}>
              <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedProduct?.TenSanPham}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Thông tin sản phẩm
                </Typography>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Mô tả:</strong> {selectedProduct?.MoTa || "Chưa có mô tả"}
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Chất liệu:</strong> {selectedProduct?.ChatLieu || "Đang cập nhật"}
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Màu sắc có sẵn:</strong> {selectedProduct?.MauSac?.map(color => color.TenMau).join(', ')}
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ mb: 1 }}>
                      <strong>Kích thước có sẵn:</strong> {sizes?.map(size => size.TenKichThuoc).join(', ')}
                    </Typography>
                  </li>
                  {selectedProduct?.ThongTinBoSung && (
                    <li>
                      <Typography sx={{ mb: 1 }}>
                        <strong>Thông tin thêm:</strong> {selectedProduct.ThongTinBoSung}
                      </Typography>
                    </li>
                  )}
                </ul>
                {selectedProduct?.HuongDanBaoQuan && (
                  <>
                    <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
                      Hướng dẫn bảo quản
                    </Typography>
                    <Typography sx={{ pl: 2.5 }}>
                      {selectedProduct.HuongDanBaoQuan}
                    </Typography>
                  </>
                )}
              </Box>
            </Collapse>

            <Box
              onClick={() => setShowSizeChart(!showSizeChart)}
              sx={{
                p: 2,
                cursor: "pointer",
                borderTop: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <Typography>Bảng size</Typography>
              {showSizeChart ? <RemoveIcon /> : <AddIcon />}
            </Box>
            <Collapse in={showSizeChart}>
              <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
                <Box
                  component="img"
                  src="../../../../public/image/size.jpg"
                  alt="Bảng size chart"
                  sx={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            </Collapse>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Đánh giá sản phẩm
        </Typography>
        <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {reviews.averageRating.toFixed(1)}<Typography component="span" variant="h5">/5</Typography>
                </Typography>
                <Rating value={reviews.averageRating} readOnly precision={0.1} />
                <Typography sx={{ color: '#666', mt: 1 }}>
                  {reviews.totalReviews} đánh giá
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              {[5, 4, 3, 2, 1].map((star) => (
                <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ minWidth: 50 }}>{star} sao</Typography>
                  <Box sx={{ flex: 1, mx: 1, bgcolor: '#ddd', height: 8, borderRadius: 1 }}>
                    <Box
                      sx={{
                        width: `${(reviews.ratingCounts[star] / reviews.totalReviews) * 100 || 0}%`,
                        bgcolor: '#ffd700',
                        height: '100%',
                        borderRadius: 1
                      }}
                    />
                  </Box>
                  <Typography sx={{ minWidth: 50, textAlign: 'right' }}>
                    ({reviews.ratingCounts[star]})
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Phần Có thể bạn sẽ thích */}
        <Box sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          CÓ THỂ BẠN SẼ THÍCH
        </Typography>
        <Grid container spacing={3}>
          {randomProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={product.idSanPham}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={`${product.HinhAnh[0]}`}
                  alt={product.TenSanPham}
                  sx={{ 
                    height: 280,
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/user/product/${product.idSanPham}`)}
                />
                <CardContent>
                  <Typography 
                    gutterBottom 
                    variant="body1"
                    sx={{ 
                      fontSize: '0.9rem',
                      cursor: "pointer",
                      '&:hover': { color: '#dc0606' },
                      height: 40,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
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
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ProductDetail;
