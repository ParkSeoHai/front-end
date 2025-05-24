import { Box, Typography, Paper, Grid, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useOrder } from '../../../hooks/useOrder';

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useOrder();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const currentOrder = orders.find(o => o._id === id);
    setOrder(currentOrder);
  }, [id, orders]);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa726',
      confirmed: '#42a5f5',
      shipping: '#ab47bc',
      delivered: '#66bb6a',
      cancelled: '#ef5350'
    };
    return colors[status] || '#757575';
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

  if (!order) return <Typography>Đang tải...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Chi tiết đơn hàng #{order.idDonHang}
      </Typography>

      <Grid container spacing={3}>
        {/* Order Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Thông tin đơn hàng</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Trạng thái
                </Typography>
                <Chip
                  label={getStatusText(order.TrangThaiDonHang)}
                  sx={{
                    bgcolor: `${getStatusColor(order.TrangThaiDonHang)}20`,
                    color: getStatusColor(order.TrangThaiDonHang),
                  }}
                />
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Ngày đặt hàng
                </Typography>
                <Typography>
                  {new Date(order.NgayDatHang).toLocaleDateString('vi-VN')}
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Phương thức thanh toán
                </Typography>
                <Typography>
                  {getPaymentMethodText(order.PhuongThucThanhToan)}
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Địa chỉ giao hàng
                </Typography>
                <Typography>
                  {order.DiaChiGiaoHang}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Chi tiết sản phẩm</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.GioHang.DanhSachSanPham.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img
                            src={`http://localhost:8080${item.HinhAnh}`}
                            alt={item.TenSanPham}
                            style={{ width: 50, height: 50, objectFit: 'cover' }}
                          />
                          <Typography>{item.TenSanPham}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{item.SoLuong}</TableCell>
                      <TableCell align="right">
                        {item.GiaTien.toLocaleString('vi-VN')}đ
                      </TableCell>
                      <TableCell align="right">
                        {item.ThanhTien.toLocaleString('vi-VN')}đ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Order Summary */}
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Tổng tiền hàng:</Typography>
                    <Typography>
                      {order.GioHang.TongTienHang.toLocaleString('vi-VN')}đ
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Giảm giá:</Typography>
                    <Typography>
                      -{order.GioHang.GiamGia.toLocaleString('vi-VN')}đ
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Tổng thanh toán:</Typography>
                    <Typography variant="h6" color="error">
                      {order.GioHang.TongTien.toLocaleString('vi-VN')}đ
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail; 