import { Box, Typography, TextField, Button, FormControl, Select, MenuItem, Paper, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useUser } from '../../../hooks/useUser';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users, handleUpdateUser, handleFetchUsers, isLoading } = useUser();
  const [formData, setFormData] = useState({
    HoVaTen: '',
    NgaySinh: '',
    ThuDienTu: '',
    SoDienThoai: '',
    VaiTro: '',
    TrangThai: '',
    DiaChi: ''
  });

  useEffect(() => {
    handleFetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const user = users.find(u => u.id === id);
      if (user) {
        setFormData({
          HoVaTen: user.HoVaTen,
          NgaySinh: user.NgaySinh ? new Date(user.NgaySinh).toISOString().split('T')[0] : '',
          ThuDienTu: user.ThuDienTu,
          SoDienThoai: user.SoDienThoai,
          VaiTro: user.VaiTro,
          TrangThai: user.TrangThai,
          DiaChi: user.DiaChi || ''
        });
      }
    }
  }, [users, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleUpdateUser(id, formData);
    if (success) {
      navigate('/admin/users');
    }
  };

  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EditIcon />
          <Typography variant="h5">Chỉnh sửa thông tin người dùng</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              required
              fullWidth
              label="Họ và tên"
              value={formData.HoVaTen}
              onChange={(e) => setFormData({ ...formData, HoVaTen: e.target.value })}
            />
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              value={formData.ThuDienTu}
              onChange={(e) => setFormData({ ...formData, ThuDienTu: e.target.value })}
            />
            <TextField
              required
              fullWidth
              label="Ngày sinh"
              type="date"
              value={formData.NgaySinh}
              onChange={(e) => setFormData({ ...formData, NgaySinh: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              fullWidth
              label="Số điện thoại"
              value={formData.SoDienThoai}
              onChange={(e) => setFormData({ ...formData, SoDienThoai: e.target.value })}
            />
            <FormControl fullWidth>
              <Select
                value={formData.VaiTro}
                onChange={(e) => setFormData({ ...formData, VaiTro: e.target.value })}
              >
                <MenuItem value="khachhang">Khách hàng</MenuItem>
                <MenuItem value="nhanvien">Nhân viên</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Select
                value={formData.TrangThai}
                onChange={(e) => setFormData({ ...formData, TrangThai: e.target.value })}
              >
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Không hoạt động</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Địa chỉ"
              multiline
              rows={3}
              value={formData.DiaChi}
              onChange={(e) => setFormData({ ...formData, DiaChi: e.target.value })}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/users')}
            >
              Quay lại
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={isLoading}
            >
              {isLoading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default EditUser;