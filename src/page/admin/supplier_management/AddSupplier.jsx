import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import BusinessIcon from '@mui/icons-material/Business';
import { useSupplier } from '../../../hooks/useSupplier';

const AddSupplier = () => {
  const navigate = useNavigate();
  const { handleCreateSupplier, isLoading, error } = useSupplier();
  const [formData, setFormData] = useState({
    TenNhaCungCap: '',
    Email: '',
    SoDienThoai: '',
    DiaChi: '',
    MoTa: '',
    SanPhamCungCap: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleCreateSupplier(formData);
    if (success) {
      navigate('/admin/suppliers');
    }
  };

  return (
    <>
      <Box sx={{ 
        p: 2, 
        bgcolor: '#fff',
        borderRadius: '4px 4px 0 0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon />
          <Typography variant="h5">Thêm nhà cung cấp mới</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              fullWidth
              required
              label="Tên nhà cung cấp"
              value={formData.TenNhaCungCap}
              onChange={(e) => setFormData({ ...formData, TenNhaCungCap: e.target.value })}
            />
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
            <TextField
              fullWidth
              required
              label="Số điện thoại"
              value={formData.SoDienThoai}
              onChange={(e) => setFormData({ ...formData, SoDienThoai: e.target.value })}
            />
            <TextField
              fullWidth
              required
              label="Địa chỉ"
              value={formData.DiaChi}
              onChange={(e) => setFormData({ ...formData, DiaChi: e.target.value })}
            />
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={3}
              value={formData.MoTa}
              onChange={(e) => setFormData({ ...formData, MoTa: e.target.value })}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/suppliers')}
            >
              Quay lại
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Lưu
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default AddSupplier;