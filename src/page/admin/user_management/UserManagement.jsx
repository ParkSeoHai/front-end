import { Box, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';

const UserManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { users, isLoading, error, handleFetchUsers, handleDeleteUser } = useUser();
  const rowsPerPage = 10;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users?.filter(user => 
    user.HoVaTen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.ThuDienTu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.SoDienThoai?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalUsers = filteredUsers?.length || 0;
  const totalPages = Math.ceil(totalUsers / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers?.slice(startIndex, startIndex + rowsPerPage);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const success = await handleDeleteUser(selectedId);
      if (success) {
        handleFetchUsers();
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
        <Typography variant="h5">Danh sách người dùng</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <TextField 
            size="small"
            placeholder="Tìm kiếm người dùng"
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
            onClick={() => navigate('/admin/users/add')}
          >
            Thêm người dùng
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>Mã người dùng</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Đang tải dữ liệu...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ color: 'error.main' }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : paginatedUsers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Không có dữ liệu</TableCell>
                </TableRow>
              ) : (
                paginatedUsers?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.HoVaTen}</TableCell>
                    <TableCell>{user.ThuDienTu}</TableCell>
                    <TableCell>{user.SoDienThoai}</TableCell>
                    <TableCell>{user.VaiTro}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          bgcolor: user.TrangThai === 'active' ? '#66bb6a20' : '#ef535020',
                          color: user.TrangThai === 'active' ? '#66bb6a' : '#ef5350',
                          py: 0.5,
                          px: 1,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}
                      >
                        {user.TrangThai === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small"
                        onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" sx={{ color: '#66bb6a' }} />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteClick(user.id)}
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

        {!isLoading && paginatedUsers?.length > 0 && (
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
          Bạn có chắc chắn muốn xóa người dùng này không?
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

export default UserManagement;