import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Menu, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../hooks/useOrder';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx'; // Thêm thư viện xlsx để xuất file Excel

const OrderManagement = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const { handleFetchOrders, orders, handleUpdateOrderStatus, handleDeleteOrder } = useOrder();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [month, setMonth] = useState('');
  useEffect(() => {
    handleFetchOrders()
  }, []);

  const handleStatusClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleStatusClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleStatusUpdate = async (newStatus) => {
    if (selectedOrder) {
      try {
        await handleUpdateOrderStatus({
          orderId: selectedOrder.idDonHang,
          TrangThaiDonHang: newStatus
        });
        // Refresh orders after update
        await handleFetchOrders();
        handleStatusClose();
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

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

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.TrangThaiDonHang === statusFilter;
    const matchesSearch = searchTerm === '' || 
      order.idDonHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.DiaChiGiaoHang.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (orderToDelete) {
      try {
        const success = await handleDeleteOrder(orderToDelete.idDonHang);
        if (success) {
          await handleFetchOrders();
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  // Hàm xuất danh sách theo khoảng ngày
  const handleExportByDateRange = () => {
    if (!startDate || !endDate) {
      alert('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
      return;
    }

    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.NgayDatHang);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    });

    exportToExcel(filteredOrders, `DonHang_${startDate}_den_${endDate}`);
  };

  // Hàm xuất danh sách theo tháng
  const handleExportByMonth = () => {
    if (!month) {
      alert('Vui lòng chọn tháng');
      return;
    }

    const [year, monthNum] = month.split('-');
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.NgayDatHang);
      return orderDate.getFullYear() === parseInt(year) && 
             orderDate.getMonth() === parseInt(monthNum) - 1;
    });

    exportToExcel(filteredOrders, `DonHang_Thang_${monthNum}_${year}`);
  };

  // Hàm xuất ra file Excel
  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(order => ({
      'Mã đơn hàng': order.idDonHang,
      'Địa chỉ giao hàng': order.DiaChiGiaoHang,
      'Phương thức thanh toán': getPaymentMethodText(order.PhuongThucThanhToan),
      'Ngày đặt': new Date(order.NgayDatHang).toLocaleDateString('vi-VN'),
      'Tổng tiền': order.GioHang.TongTien.toLocaleString('vi-VN') + 'đ',
      'Trạng thái': getStatusText(order.TrangThaiDonHang)
    })));

    // Set column widths
    const columnWidths = [
      { wch: 15 },  
      { wch: 40 },  
      { wch: 25 },  
      { wch: 15 },  
      { wch: 15 },  
      { wch: 15 },  
    ];

    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <>
      <Box sx={{ 
        p: 2, 
        bgcolor: '#fff', 
        borderRadius: '4px 4px 0 0',
        borderBottom: '1px solid #e0e0e0',
        mb: 2
      }}>
        <Typography variant="h5">Danh sách đơn hàng</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm đơn hàng"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
              sx={{ width: 250 }}
            />
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: 150 }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="pending">Chờ xác nhận</MenuItem>
              <MenuItem value="confirmed">Đã xác nhận</MenuItem>
              <MenuItem value="shipping">Đang giao</MenuItem>
              <MenuItem value="delivered">Hoàn thành</MenuItem>
              <MenuItem value="cancelled">Đã hủy</MenuItem>
            </Select>
          </Box>
          
          {/* Thêm phần xuất Excel */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
                size="small"
                type="date"
                label="Từ ngày"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  lang: 'vi-VN',
                }}
                sx={{
                  '& input::-webkit-calendar-picker-indicator': {
                    cursor: 'pointer'
                  }
                }}
              />
              <TextField
                size="small"
                type="date"
                label="Đến ngày"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  lang: 'vi-VN',
                }}
                sx={{
                  '& input::-webkit-calendar-picker-indicator': {
                    cursor: 'pointer'
                  }
                }}
              />
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleExportByDateRange}
                size="small"
              >
                Xuất theo ngày
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
                size="small"
                type="month"
                label="Chọn tháng"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  lang: 'vi-VN',
                }}
                sx={{
                  '& input::-webkit-calendar-picker-indicator': {
                    cursor: 'pointer'
                  }
                }}
              />
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleExportByMonth}
                size="small"
              >
                Xuất theo tháng
              </Button>
            </Box>
          </Box>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Địa chỉ giao hàng</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.idDonHang}</TableCell>
                  <TableCell>{order?.DiaChiGiaoHang}</TableCell>
                  <TableCell>{getPaymentMethodText(order.PhuongThucThanhToan)}</TableCell>
                  <TableCell>
                    {new Date(order.NgayDatHang).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    {order.GioHang.TongTien.toLocaleString('vi-VN')}đ
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => handleStatusClick(e, order)}
                      sx={{
                        bgcolor: `${getStatusColor(order.TrangThaiDonHang)}20`,
                        color: getStatusColor(order.TrangThaiDonHang),
                        py: 0.5,
                        px: 1.5,
                        borderRadius: 1,
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: `${getStatusColor(order.TrangThaiDonHang)}30`,
                        }
                      }}
                    >
                      {getStatusText(order.TrangThaiDonHang)}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      size="small"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      sx={{ mr: 1 }}
                    >
                      <VisibilityIcon fontSize="small" sx={{ color: '#1976d2' }} />
                    </IconButton>
                    <IconButton 
                      size="small"
                      onClick={() => handleDeleteClick(order)}
                    >
                      <DeleteIcon fontSize="small" sx={{ color: '#f44336' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Status Update Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleStatusClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem 
            onClick={() => handleStatusUpdate('pending')}
            sx={{ 
              color: getStatusColor('pending'),
              '&:hover': { bgcolor: `${getStatusColor('pending')}10` }
            }}
          >
            {getStatusText('pending')}
          </MenuItem>
          <MenuItem 
            onClick={() => handleStatusUpdate('confirmed')}
            sx={{ 
              color: getStatusColor('confirmed'),
              '&:hover': { bgcolor: `${getStatusColor('confirmed')}10` }
            }}
          >
            {getStatusText('confirmed')}
          </MenuItem>
          <MenuItem 
            onClick={() => handleStatusUpdate('shipping')}
            sx={{ 
              color: getStatusColor('shipping'),
              '&:hover': { bgcolor: `${getStatusColor('shipping')}10` }
            }}
          >
            {getStatusText('shipping')}
          </MenuItem>
          <MenuItem 
            onClick={() => handleStatusUpdate('delivered')}
            sx={{ 
              color: getStatusColor('delivered'),
              '&:hover': { bgcolor: `${getStatusColor('delivered')}10` }
            }}
          >
            {getStatusText('delivered')}
          </MenuItem>
          <MenuItem 
            onClick={() => handleStatusUpdate('cancelled')}
            sx={{ 
              color: getStatusColor('cancelled'),
              '&:hover': { bgcolor: `${getStatusColor('cancelled')}10` }
            }}
          >
            {getStatusText('cancelled')}
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
        >
          <DialogTitle>
            Xác nhận xóa đơn hàng
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa đơn hàng #{orderToDelete?.idDonHang}? Hành động này không thể hoàn tác.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Hủy
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default OrderManagement;