import { 
  Box, Typography, TextField, IconButton, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, Pagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupplier } from '../../../hooks/useSupplier';

const SupplierManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const { suppliers, isLoading, error, handleFetchSuppliers, handleDeleteSupplier } = useSupplier();
  const [searchTerm, setSearchTerm] = useState('');
  // Thêm state cho Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch suppliers when component mounts
  useEffect(() => {
    handleFetchSuppliers();
  }, []);

  // Handle delete supplier
  // Thay thế hàm onDeleteSupplier cũ
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const success = await handleDeleteSupplier(selectedId);
      if (success) {
        handleFetchSuppliers();
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

  // Filter suppliers based on search term and status
  const filteredSuppliers = suppliers?.filter(supplier => {
    const matchesSearch = searchTerm.trim() === '' || 
      supplier.TenNhaCungCap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.SoDienThoai.includes(searchTerm);

    return matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil((filteredSuppliers?.length || 0) / rowsPerPage);
  const paginatedSuppliers = filteredSuppliers?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0', mb: 2 }}>
        <Typography variant="h5">Danh sách nhà cung cấp</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Tìm kiếm nhà cung cấp"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
              sx={{ width: 250 }}
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/suppliers/add')}
          >
            Thêm nhà cung cấp
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Mã NCC</TableCell>
                <TableCell>Tên nhà cung cấp</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Đang tải dữ liệu...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: 'error.main' }}>
                    Có lỗi xảy ra khi tải dữ liệu
                  </TableCell>
                </TableRow>
              ) : filteredSuppliers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Không có dữ liệu</TableCell>
                </TableRow>
              ) : (
                paginatedSuppliers?.map((supplier) => (
                  <TableRow key={supplier.idNhaCungCap}>
                    <TableCell>{supplier.idNhaCungCap}</TableCell>
                    <TableCell>{supplier.TenNhaCungCap}</TableCell>
                    <TableCell>{supplier.Email}</TableCell>
                    <TableCell>{supplier.SoDienThoai}</TableCell>
                    <TableCell>{supplier.DiaChi}</TableCell>
                    <TableCell>
                      <IconButton 
                        size="small"
                        onClick={() => navigate(`/admin/suppliers/edit/${supplier.idNhaCungCap}`)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" sx={{ color: '#66bb6a' }} />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteClick(supplier.idNhaCungCap)}
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

        {/* Add pagination */}
        {!isLoading && filteredSuppliers?.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
      {/* Di chuyển Dialog vào trong component */}
<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Xác nhận xóa</DialogTitle>
  <DialogContent>
    Bạn có chắc chắn muốn xóa nhà cung cấp này không?
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

export default SupplierManagement;

