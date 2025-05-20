import { Box, Typography, Button, Paper, Chip, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import { useOrder } from "../../../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return { bg: "#fff3cd", color: "#856404" };
    case "confirmed":
      return { bg: "#cce5ff", color: "#004085" };
    case "shipping":
      return { bg: "#d4edda", color: "#155724" };
    case "delivered":
      return { bg: "#d1e7dd", color: "#0f5132" };
    case "cancelled":
      return { bg: "#f8d7da", color: "#842029" };
    default:
      return { bg: "#e2e3e5", color: "#383d41" };
  }
};

const getStatusText = (status) => {
  const statusMap = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao hàng",
    delivered: "Đã giao hàng",
    cancelled: "Đã hủy",
  };
  return statusMap[status] || status;
};

const getPaymentMethodText = (method) => {
  const paymentMethodMap = {
    cash: "Tiền mặt khi nhận hàng",
    credit_card: "Thẻ tín dụng",
    bank_transfer: "Chuyển khoản ngân hàng",
    e_wallet: "Ví điện tử"
  };
  return paymentMethodMap[method] || method;
};

const Order = () => {
  const { handleFetchOrders, handleCancelOrder } = useOrder();
  const { getUser, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrders = async () => {
      const result = await handleFetchOrders();
      const userOrders = Array.isArray(result) 
        ? result.filter(order => order.NguoiDung?.id === user?.id)
        : result.orders?.filter(order => order.NguoiDung?.id === user?.id) || [];
      setOrders(userOrders);
    };
    fetchOrders();
    getUser();
  }, [user]);

  const consolidateProducts = (products) => {
    console.log(products);
    return products.reduce((acc, product) => {
      const existingProduct = acc.find(p => p.idSanPham === product.idSanPham && p.KichThuoc.TenKichThuoc === product.KichThuoc.TenKichThuoc);
      if (existingProduct) {
        existingProduct.SoLuong += product.SoLuong;
        existingProduct.ThanhTien += product.ThanhTien;
      } else {
        acc.push({ ...product });
      }
      return acc;
    }, []);
  };

  const handleCancel = async (orderId) => {
    try {
      const result = await handleCancelOrder(orderId);
      if (result) {
        // Refresh orders list after cancellation
        const updatedOrders = await handleFetchOrders();
        setOrders(Array.isArray(updatedOrders) ? updatedOrders : updatedOrders.orders || []);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "1240px", margin: "0 auto", padding: "40px 20px" }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left side - Orders */}
        <Box sx={{ flex: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontSize: 28, fontWeight: 600, mb: 3 }}
          >
            ĐƠN HÀNG
          </Typography>

          {orders.length === 0 ? (
            <Typography sx={{ color: "#666", mb: 4 }}>
              Chưa có đơn hàng nào
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {orders?.map((order) => (
                <Paper key={order.idDonHang} sx={{ p: 3, borderRadius: 2}} >
                  {/* Order Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Đơn hàng #{order.idDonHang}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {order.TrangThaiDonHang === "pending" && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleCancel(order.idDonHang)}
                          sx={{
                            borderColor: '#dc0606',
                            color: '#dc0606',
                            '&:hover': {
                              borderColor: '#b00404',
                              backgroundColor: 'rgba(220, 6, 6, 0.04)'
                            }
                          }}
                        >
                          Hủy đơn hàng
                        </Button>
                      )}
                      <Chip
                        label={getStatusText(order.TrangThaiDonHang)}
                        sx={{
                          bgcolor: getStatusColor(order.TrangThaiDonHang).bg,
                          color: getStatusColor(order.TrangThaiDonHang).color,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Order Info */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography sx={{ color: "#666" }}>
                        Ngày đặt:{" "}
                        {new Date(order.NgayDatHang).toLocaleDateString(
                          "vi-VN"
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: "#666" }}>
                        Thanh toán:{" "}
                        {getPaymentMethodText(order.PhuongThucThanhToan)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <LocationOnIcon sx={{ color: "#666", mt: 0.3 }} />
                        <Typography sx={{ color: "#666" }}>
                          Địa chỉ giao hàng: {order.DiaChiGiaoHang}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  {/* Products */}
                  <Box sx={{ mb: 3 }}>
                    {consolidateProducts(order.GioHang.DanhSachSanPham).map((product) => (
                      <Box
                        key={product.idSanPham}
                        onClick={() => navigate(`/user/product/${product.idSanPham}`)}
                        sx={{
                          display: "flex",
                          gap: 2,
                          p: 2,
                          borderBottom: "1px solid #eee",
                          "&:last-child": { borderBottom: "none" },
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={`https://back-end-gray-pi.vercel.app${product.HinhAnh}`}
                          alt={product.TenSanPham}
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 500, mb: 1 }}>
                            {product.TenSanPham}
                          </Typography>
                          <Typography
                            sx={{ color: "#666", fontSize: "0.875rem" }}
                          >
                            Số lượng: {product.SoLuong}
                          </Typography>
                          <Typography
                            sx={{ color: "#666", fontSize: "0.875rem" }}
                          >
                            Kích thước: {product?.KichThuoc?.TenKichThuoc}
                          </Typography>
                          <Typography
                            sx={{ color: "#dc0606", fontWeight: 500 }}
                          >
                            {(product?.ThanhTien || 0).toLocaleString("vi-VN")}đ
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  {/* Order Summary */}
                  <Box sx={{ borderTop: "1px solid #eee", pt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>Tổng tiền hàng:</Typography>
                      <Typography>
                        {order.GioHang.TongTienHang?.toLocaleString("vi-VN")}đ
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>Giảm giá:</Typography>
                      <Typography>
                        -{order.GioHang.GiamGia?.toLocaleString("vi-VN")}đ
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>
                        Tổng thanh toán:
                      </Typography>
                      <Typography
                        sx={{
                          color: "#dc0606",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                        }}
                      >
                        {order.GioHang.TongTien?.toLocaleString("vi-VN")}đ
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>

        {/* Right side - Account Info */}
        <Box sx={{ flex: 1, bgcolor: "#fff", p: 3, borderRadius: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tài khoản của tôi
            </Typography>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>
              Họ và tên: {user?.HoVaTen}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HomeIcon sx={{ color: "#666" }} />
              <Typography>Địa chỉ: {user?.DiaChi}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "#666" }} />
              <Typography>Điện thoại: {user?.SoDienThoai}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: "#666" }} />
              <Typography>Email: {user?.ThuDienTu}</Typography>
            </Box>

            <Button 
              variant="contained"
              sx={{ 
                width: "fit-content",
                mt: 2,
                bgcolor: "#303030",
                "&:hover": {
                  bgcolor: "#1a1a1a"
                }
              }}
              onClick={() => {navigate('/user/account')}}
            >
              Chỉnh sửa thông tin
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
