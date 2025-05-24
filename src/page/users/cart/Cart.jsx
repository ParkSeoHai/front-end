import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Radio,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SearchForm from "../../../component/header/SearchForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"; // Add these imports
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { useCart } from "../../../hooks/useCart";
import { useProduct } from "../../../hooks/useProduct";
import { useDiscount } from "../../../hooks/useDiscount";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { useAuth } from "../../../hooks/useAuth";
import { toast,ToastContainer } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const {
    handleFetchCart,
    cartItems,
    handleUpdateCartItem,
    handleRemoveFromCart,
    handleRemoveAllFromCart
  } = useCart();
  const { handleFetchDiscounts, discounts } = useDiscount();
  const { handleFetchProducts, products } = useProduct();
  const { handleCreateOrder } = useOrder();
  const { user } = useAuth();
  console.log("cartItems", cartItems);
  const consolidatedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => 
      i.idSanPham === item.idSanPham && 
      i.KichThuoc?.TenKichThuoc === item.KichThuoc?.TenKichThuoc
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const handleQuantityChange = async (idSanPham, kichThuoc, change) => {
    const item = consolidatedCartItems.find(
      (item) => item.idSanPham === idSanPham && 
                item.KichThuoc?.TenKichThuoc === kichThuoc
    );
    if (!item) return;

    if (change < 0) {
      try {
        await handleRemoveFromCart(idSanPham);
        await handleFetchCart();
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      const newQuantity = item.quantity + change;
      try {
        await handleUpdateCartItem(idSanPham, newQuantity, kichThuoc);
        await handleFetchCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleDeleteCartItem = async (idSanPham) => {
    try {
      await handleRemoveFromCart(idSanPham);  // Thay vì handleRemoveAllFromCart
      await handleFetchCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    handleFetchCart();
    handleFetchProducts();
    handleFetchDiscounts();
    // Example usage within the component
  }, []);

  const totalAmount = consolidatedCartItems.reduce((sum, item) => {
    return sum + item.GiaTien * item.quantity;
  }, 0);
  // Consolidate cart items by idSanPham
 
  return (
    <>
      <SearchForm />
      <Box sx={{ maxWidth: "1240px", margin: "30px auto", padding: "20px", marginTop:{xs: "80px"} }}>
        <Typography
          variant="h4"
          sx={{ 
            textAlign: "center", 
            fontWeight: 600, 
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          GIỎ HÀNG CỦA BẠN
        </Typography>
        <Typography sx={{ textAlign: "center", color: "#666", mb: 4 }}>
          Có {consolidatedCartItems.length} sản phẩm trong giỏ hàng
        </Typography>

        <Box sx={{ 
          display: "flex", 
          gap: { xs: 2, sm: 3, md: 4 },
          flexDirection: { xs: "column", md: "row" }
        }}>
          {/* Cart Items */}
          <Box sx={{ 
            flex: { xs: '1', md: 2 },
            overflow: 'auto'
          }}>
            {/* Desktop View */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <TableContainer component={Paper} sx={{ mb: 2, boxShadow: "none" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                      <TableCell sx={{ 
                        width: { xs: "80px", sm: "100px", md: "150px" },
                        padding: { xs: 1, sm: 2 }
                      }}>Hình ảnh</TableCell>
                      <TableCell>Thông tin</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                      <TableCell align="right">Giá tiền</TableCell>
                      <TableCell align="right" sx={{ width: "50px" }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {consolidatedCartItems.map((cartItem) => (
                      <TableRow key={`${cartItem.idSanPham}-${cartItem.KichThuoc?.TenKichThuoc}`}>
                        <TableCell sx={{ padding: { xs: 1, sm: 2 } }}>
                          <img
                            src={`http://https://back-end-gray-pi.vercel.app:8080${cartItem?.HinhAnh}`}
                            alt={cartItem?.TenSanPham}
                            width={80}
                            height={80}
                            style={{ 
                              objectFit: "cover",
                              width: '100%',
                              maxWidth: '80px'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 500,
                              fontSize: { xs: '0.875rem', sm: '1rem' }
                            }}
                          >
                            {cartItem?.TenSanPham}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Kích thước: {cartItem.KichThuoc?.TenKichThuoc}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(
                                  cartItem.idSanPham,
                                  cartItem.KichThuoc?.TenKichThuoc,
                                  -1
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ mx: 2 }}>
                              {cartItem.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(
                                  cartItem.idSanPham,
                                  cartItem.KichThuoc?.TenKichThuoc,
                                  1
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {(cartItem?.GiaTien * cartItem.quantity).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() =>
                              handleDeleteCartItem(cartItem.idSanPham)
                            }
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Mobile View */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              {consolidatedCartItems.map((cartItem) => (
                <Box
                  key={`${cartItem.idSanPham}-${cartItem.KichThuoc?.TenKichThuoc}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                    mb: 2,
                    bgcolor: 'white',
                    borderRadius: 1,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <img
                      src={`http://https://back-end-gray-pi.vercel.app:8080${cartItem?.HinhAnh}`}
                      alt={cartItem?.TenSanPham}
                      style={{ 
                        width: '100px',
                        height: '100px',
                        objectFit: "cover",
                        borderRadius: '4px'
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 500,
                          fontSize: '1rem',
                          mb: 0.5
                        }}
                      >
                        {cartItem?.TenSanPham}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Kích thước: {cartItem.KichThuoc?.TenKichThuoc}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: '#dc0606',
                          fontWeight: 600,
                          fontSize: '1rem'
                        }}
                      >
                        {(cartItem?.GiaTien * cartItem.quantity).toLocaleString("vi-VN")}đ
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteCartItem(cartItem.idSanPham)}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    borderTop: '1px solid #eee',
                    pt: 2
                  }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(
                        cartItem.idSanPham,
                        cartItem.KichThuoc?.TenKichThuoc,
                        -1
                      )}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                      {cartItem.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(
                        cartItem.idSanPham,
                        cartItem.KichThuoc?.TenKichThuoc,
                        1
                      )}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>

            {cartItems.length === 0 && (
              <Typography sx={{ textAlign: "center", py: 4 }}>
                Bạn chưa có sản phẩm yêu thích nào !
              </Typography>
            )}
          </Box>

          {/* Order Summary */}
          <Box sx={{ 
            flex: { xs: '1', md: 1 }, 
            bgcolor: "#f8f9fa", 
            p: { xs: 2, sm: 3 }, 
            borderRadius: 1,
            position: { xs: 'static', md: 'sticky' },
            top: '20px',
            height: 'fit-content'
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Tóm tắt đơn hàng
            </Typography>
            {/* Enhanced Price Summary */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tổng tiền hàng:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {totalAmount.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Giảm giá:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                -{discountAmount.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tạm tính:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {(totalAmount - discountAmount).toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography sx={{ fontWeight: 600 }}>Tổng tiền:</Typography>
              <Typography sx={{ color: "#dc0606", fontWeight: 600 }}>
                {(totalAmount - discountAmount).toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/user/checkout")}
              sx={{
                bgcolor: "#dc0606",
                mb: 2,
                "&:hover": { bgcolor: "#b00404" },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              TIẾN HÀNH ĐẶT HÀNG
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "#303030",
                borderColor: "#303030",
                "&:hover": {
                  borderColor: "#303030",
                  bgcolor: "rgba(48, 48, 48, 0.04)",
                },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
              onClick={() => navigate("/")}
            >
              MUA THÊM SẢN PHẨM
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Cart;
