import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiscount } from '../../../hooks/useDiscount';

const PromotionManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { discounts, isLoading, error, handleFetchDiscounts, handleDeleteDiscount } = useDiscount();
  const rowsPerPage = 10;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    handleFetchDiscounts();
  }, []);

  // Filter discounts based on search term
  const filteredDiscounts = discounts?.filter(discount => 
    discount.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.TenChuongTrinh?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalDiscounts = filteredDiscounts?.length || 0;
  const totalPages = Math.ceil(totalDiscounts / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedDiscounts = filteredDiscounts?.slice(startIndex, startIndex + rowsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
      const success = await handleDeleteDiscount(id);
      if (success) {
        handleFetchDiscounts();
      }
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const success = await handleDeleteDiscount(selectedId);
      if (success) {
        handleFetchDiscounts();
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0', mb: 2 }}>
        <Typography variant="h5">Danh sách mã giảm giá</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <TextField 
            size="small"
            placeholder="Tìm kiếm mã giảm giá"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
            sx={{ width: 300 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/promotions/add')}
          >
            Thêm mã giảm giá
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Mã giảm giá</TableCell>
                <TableCell>Tên chương trình</TableCell>
                <TableCell>Phần trăm giảm</TableCell> {/* Thêm cột mới */}
                <TableCell>Ngày bắt đầu</TableCell>
                <TableCell>Ngày kết thúc</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Đang tải dữ liệu...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: 'error.main' }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : paginatedDiscounts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Không có dữ liệu</TableCell>
                </TableRow>
              ) : (
                paginatedDiscounts?.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>{discount.id}</TableCell>
                    <TableCell>{discount.TenChuongTrinh}</TableCell>
                    <TableCell>{discount?.PhanTramGiam ?`${discount?.PhanTramGiam}%`: "Chưa đặt giảm giá"}</TableCell> {/* Thêm cell mới */}
                    <TableCell>{new Date(discount.NgayBatDau).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>{new Date(discount.NgayKetThuc).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small"
                        onClick={() => navigate(`/admin/promotions/edit/${discount.id}`)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" sx={{ color: '#66bb6a' }} />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteClick(discount.id)}
                      >
                        <DeleteIcon fontSize="small" sx={{ color: '#f44336' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isLoading && paginatedDiscounts?.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa mã giảm giá này không?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PromotionManagement;