import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Select,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  TrendingUp,
  People,
  ShoppingCart,
  LocalOffer,
  AttachMoney,
} from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useProduct } from '../../../hooks/useProduct';
import { useOrder } from '../../../hooks/useOrder';
import { useUser } from '../../../hooks/useUser';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';

// Đăng ký các components cần thiết cho ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { handleFetchProducts, products } = useProduct();
  const { handleFetchOrders, orders } = useOrder();
  const { handleFetchUsers, users } = useUser();
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [topProducts, setTopProducts] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('all'); // 'all' hoặc 1-12

  useEffect(() => {
    handleFetchProducts();
    handleFetchOrders();
    handleFetchUsers();
  }, []);

  // Tính tổng doanh thu từ các đơn hàng đã giao
  const totalRevenue = orders?.reduce((sum, order) => {
    if (order.TrangThaiDonHang === "delivered") {
      return sum + order.GioHang.TongTien;
    }
    return sum;
  }, 0);

  // Đếm số khách hàng (users có vai trò là khách hàng)
  const customerCount = users?.filter(user => user.VaiTro === "khachhang").length || 0;

  // Đếm số đơn hàng
  const orderCount = orders?.length || 0;

  // Đếm số sản phẩm
  const productCount = products?.length || 0;

  // Lấy danh sách các năm có trong dữ liệu
  const getAvailableYears = () => {
    if (!orders) return [new Date().getFullYear()];
    const years = [...new Set(orders.map(order => 
      new Date(order.NgayDatHang).getFullYear()
    ))];
    return years.sort((a, b) => b - a); // Sắp xếp giảm dần
  };

  // Tính toán doanh thu theo năm và tháng
  const calculateRevenue = () => {
    if (!orders) return { total: 0, orderCount: 0, productCount: 0 };

    return orders.reduce((acc, order) => {
      const orderDate = new Date(order.NgayDatHang);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth() + 1;

      // Kiểm tra năm
      if (orderYear !== selectedYear) return acc;
      
      // Kiểm tra tháng nếu đã chọn tháng cụ thể
      if (selectedMonth !== 'all' && orderMonth !== parseInt(selectedMonth)) return acc;

      // Chỉ tính các đơn hàng đã giao
      if (order.TrangThaiDonHang === "delivered") {
        acc.total += order.GioHang.TongTien;
        acc.orderCount += 1;
        acc.productCount += order.GioHang.DanhSachSanPham.reduce((sum, item) => sum + item.SoLuong, 0);
      }
      return acc;
    }, { total: 0, orderCount: 0, productCount: 0 });
  };

  // Tính toán doanh thu theo tháng cho biểu đồ
  const calculateMonthlyRevenue = () => {
    if (!orders) return null;

    // Khởi tạo mảng doanh thu các tháng
    const monthlyRevenue = Array(12).fill(0);

    orders.forEach(order => {
      const orderDate = new Date(order.NgayDatHang);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth();

      // Chỉ tính các đơn hàng trong năm đã chọn và đã giao
      if (orderYear === selectedYear && order.TrangThaiDonHang === "delivered") {
        monthlyRevenue[orderMonth] += order.GioHang.TongTien;
      }
    });

    return {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 
               'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
               'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [{
        label: 'Doanh thu',
        data: monthlyRevenue,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true
      }]
    };
  };

  // Tính toán top sản phẩm bán chạy
  const calculateTopProducts = () => {
    if (!orders || !products) return [];

    // Tạo map để lưu số lượng bán của từng sản phẩm
    const productSales = {};

    // Tính tổng số lượng bán từ các đơn hàng đã giao
    orders.forEach(order => {
      if (order.TrangThaiDonHang === "delivered") {
        order.GioHang.DanhSachSanPham.forEach(item => {
          const productId = item.idSanPham;
          productSales[productId] = (productSales[productId] || 0) + item.SoLuong;
        });
      }
    });

    // Kết hợp thông tin sản phẩm với số lượng bán
    const productsWithSales = products.map(product => ({
      id: product.idSanPham,
      name: product.TenSanPham,
      sales: (productSales[product.idSanPham] || 0) + (product.DaBan || 0), // Kết hợp số lượng từ đơn hàng và DaBan
      image: product.HinhAnh && product.HinhAnh.length > 0 ? product.HinhAnh[0] : null,
      price: product.GiaSanPham,
      category: product.DanhMucSanPham?.TenDanhMuc || 'Chưa phân loại'
    }));

    // Sắp xếp theo số lượng bán giảm dần và lấy top 5
    const topProducts = productsWithSales
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5)
      .map(product => ({
        ...product,
        progress: productsWithSales[0].sales > 0 
          ? (product.sales / productsWithSales[0].sales) * 100 
          : 0
      }));

    return topProducts;
  };

  // Xử lý đơn hàng gần đây
  const getRecentOrders = () => {
    if (!orders || !Array.isArray(orders)) return [];
    
    // Tạo bản sao của mảng orders trước khi sắp xếp
    return [...orders]
      .sort((a, b) => new Date(b.NgayDatHang) - new Date(a.NgayDatHang))
      .slice(0, 5)
      .map(order => ({
        id: order.idDonHang,
        date: new Date(order.NgayDatHang).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        amount: {
          subtotal: order.GioHang.TongTienHang,
          discount: order.GioHang.GiamGia,
          total: order.GioHang.TongTien
        },
        status: order.TrangThaiDonHang,
        paymentMethod: order.PhuongThucThanhToan,
        address: order.DiaChiGiaoHang,
        products: order.GioHang.DanhSachSanPham.map(item => ({
          name: item.TenSanPham,
          quantity: item.SoLuong,
          price: item.GiaTien,
          total: item.ThanhTien,
          image: item.HinhAnh
        }))
      }));
  };

  useEffect(() => {
    setTimeout(() => {
      const revenueData = calculateMonthlyRevenue();
      setSalesData(revenueData || {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
          label: 'Doanh thu',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          tension: 0.4,
          fill: true
        }]
      });

      const recentOrdersData = getRecentOrders();
      console.log("recentOrders", recentOrdersData);
      setRecentOrders(recentOrdersData);
      setTopProducts(calculateTopProducts());
      setLoading(false);
    }, 1000);
  }, [orders, products, selectedYear, selectedMonth]);

  // Hàm chuyển đổi trạng thái đơn hàng sang tiếng Việt
  const getOrderStatusInfo = (status) => {
    const statusMap = {
      'pending': { label: 'Chờ xử lý', color: '#ff9800', bgcolor: '#fff3e0' },
      'processing': { label: 'Đang xử lý', color: '#2196f3', bgcolor: '#e3f2fd' },
      'shipping': { label: 'Đang giao', color: '#00bcd4', bgcolor: '#e0f7fa' },
      'delivered': { label: 'Đã giao', color: '#4caf50', bgcolor: '#e8f5e9' },
      'cancelled': { label: 'Đã hủy', color: '#f44336', bgcolor: '#ffebee' }
    };
    return statusMap[status] || { label: 'Không xác định', color: '#757575', bgcolor: '#f5f5f5' };
  };

  // Hàm chuyển đổi phương thức thanh toán sang tiếng Việt
  const getPaymentMethodLabel = (method) => {
    const methodMap = {
      'cash': 'Tiền mặt',
      'bank_transfer': 'Chuyển khoản',
      'momo': 'Ví MoMo',
      'vnpay': 'VNPay'
    };
    return methodMap[method] || method;
  };

  // Tính toán phân bố danh mục
  const calculateCategoryDistribution = () => {
    if (!products) return null;

    const categoryCount = products.reduce((acc, product) => {
      const categoryName = product.DanhMucSanPham?.TenDanhMuc;
      if (categoryName) {
        acc[categoryName] = (acc[categoryName] || 0) + 1;
      }
      return acc;
    }, {});

    // Chuyển đổi dữ liệu cho biểu đồ
    const labels = Object.keys(categoryCount);
    const data = Object.values(categoryCount);

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          '#2196f3',  // Xanh dương
          '#4caf50',  // Xanh lá
          '#ff9800',  // Cam
          '#f44336',  // Đỏ
          '#9c27b0',  // Tím
          '#795548',  // Nâu
          '#607d8b',  // Xám xanh
        ],
      }]
    };
  };

  const categoryDistribution = calculateCategoryDistribution();

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <IconButton sx={{ bgcolor: `${color}15`, color }}>
            {icon}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Tiêu đề và bộ lọc */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Tổng quan
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Select
                size="small"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                sx={{ minWidth: 120 }}
              >
                {getAvailableYears().map(year => (
                  <MenuItem key={year} value={year}>Năm {year}</MenuItem>
                ))}
              </Select>
              <Select
                size="small"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">Tất cả tháng</MenuItem>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <MenuItem key={month} value={month}>Tháng {month}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Grid>

        {/* Thẻ thống kê */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaidIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Typography variant="h6" component="div">
                  Doanh thu
                </Typography>
              </Box>
              {(() => {
                const stats = calculateRevenue();
                return (
                  <>
                    <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 600 }}>
                      {stats.total.toLocaleString('vi-VN')}đ
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      {selectedMonth !== 'all' ? `Tháng ${selectedMonth}/${selectedYear}` : `Năm ${selectedYear}`}
                    </Typography>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCartIcon sx={{ fontSize: 40, color: '#f57c00', mr: 2 }} />
                <Typography variant="h6" component="div">
                  Đơn hàng
                </Typography>
              </Box>
              {(() => {
                const stats = calculateRevenue();
                return (
                  <>
                    <Typography variant="h4" sx={{ color: '#f57c00', fontWeight: 600 }}>
                      {stats.orderCount}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      Đơn hàng đã giao
                    </Typography>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InventoryIcon sx={{ fontSize: 40, color: '#43a047', mr: 2 }} />
                <Typography variant="h6" component="div">
                  Sản phẩm
                </Typography>
              </Box>
              {(() => {
                const stats = calculateRevenue();
                return (
                  <>
                    <Typography variant="h4" sx={{ color: '#43a047', fontWeight: 600 }}>
                      {stats.productCount}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      Sản phẩm đã bán
                    </Typography>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fce4ec', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon sx={{ fontSize: 40, color: '#d81b60', mr: 2 }} />
                <Typography variant="h6" component="div">
                  Khách hàng
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#d81b60', fontWeight: 600 }}>
                {customerCount}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Tổng số khách hàng
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ doanh thu */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Biểu đồ doanh thu {selectedMonth !== 'all' ? `tháng ${selectedMonth}` : ''} năm {selectedYear}
            </Typography>
            <Box sx={{ position: 'relative', height: 400, mt: 2 }}>
              <Line 
                data={salesData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw;
                          return `Doanh thu: ${value.toLocaleString('vi-VN')}đ`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => {
                          return value.toLocaleString('vi-VN') + 'đ';
                        }
                      }
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Biểu đồ phân bố danh mục */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Phân bố danh mục
            </Typography>
            {categoryDistribution ? (
              <>
                <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Doughnut 
                    data={categoryDistribution} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            generateLabels: (chart) => {
                              const data = chart.data;
                              if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => ({
                                  text: `${label}: ${data.datasets[0].data[i]} sản phẩm`,
                                  fillStyle: data.datasets[0].backgroundColor[i],
                                  hidden: false,
                                  index: i
                                }));
                              }
                              return [];
                            }
                          }
                        }
                      }
                    }}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center" 
                  sx={{ mt: 2 }}
                >
                  Số lượng sản phẩm theo danh mục
                </Typography>
              </>
            ) : (
              <Typography color="text.secondary" align="center">
                Không có dữ liệu
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Top sản phẩm bán chạy */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Top sản phẩm bán chạy
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Danh mục</TableCell>
                    <TableCell align="right">Đã bán</TableCell>
                    <TableCell>Tiến độ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.length > 0 ? (
                    topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {product.image && (
                              <Box
                                component="img"
                                src={product.image}
                                alt={product.name}
                                sx={{
                                  width: 40,
                                  height: 40,
                                  objectFit: 'cover',
                                  borderRadius: 1,
                                  mr: 2
                                }}
                              />
                            )}
                            <Box>
                              <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                {product.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {product.price?.toLocaleString('vi-VN')}đ
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell align="right">{product.sales}</TableCell>
                        <TableCell sx={{ width: '30%' }}>
                          <LinearProgress
                            variant="determinate"
                            value={product.progress}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              backgroundColor: 'rgba(0, 0, 0, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#2196f3'
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Chưa có dữ liệu bán hàng
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Đơn hàng gần đây */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Đơn hàng gần đây
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã đơn</TableCell>
                    <TableCell>Chi tiết đơn hàng</TableCell>
                    <TableCell align="right">Tổng tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => {
                      const statusInfo = getOrderStatusInfo(order.status);
                      return (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {order.id}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.date}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                {getPaymentMethodLabel(order.paymentMethod)}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{
                                  display: 'block',
                                  maxWidth: 200,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {order.address}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              {order.products.map((product, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box
                                    component="img"
                                    src={`http://localhost:8080${product.image}`}
                                    alt={product.name}
                                    sx={{
                                      width: 30,
                                      height: 30,
                                      objectFit: 'cover',
                                      borderRadius: 0.5,
                                      mr: 1
                                    }}
                                  />
                                  <Box>
                                    <Typography 
                                      variant="caption" 
                                      sx={{ 
                                        display: 'block',
                                        maxWidth: 150,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {product.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {product.quantity} x {product.price.toLocaleString('vi-VN')}đ
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {order.amount.total.toLocaleString('vi-VN')}đ
                            </Typography>
                            {order.amount.discount > 0 && (
                              <Typography variant="caption" color="success.main" sx={{ display: 'block' }}>
                                -{order.amount.discount.toLocaleString('vi-VN')}đ
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                display: 'inline-block',
                                bgcolor: statusInfo.bgcolor,
                                color: statusInfo.color
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                                {statusInfo.label}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Chưa có đơn hàng nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
  