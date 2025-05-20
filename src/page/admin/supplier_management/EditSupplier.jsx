import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useSupplier } from '../../../hooks/useSupplier';

const EditSupplier = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { suppliers, handleUpdateSupplier, handleFetchSuppliers, isLoading } = useSupplier();
  const [formData, setFormData] = useState({
    idNhaCungCap: '',
    TenNhaCungCap: '',
    Email: '',
    SoDienThoai: '',
    DiaChi: '',
    MoTa: '',
    SanPhamCungCap: ''
  });

  useEffect(() => {
    handleFetchSuppliers();
  }, []);

  useEffect(() => {
    if (suppliers.length > 0) {
      const supplier = suppliers.find(s => s.idNhaCungCap === id);
      if (supplier) {
        setFormData({
          idNhaCungCap: supplier.idNhaCungCap,
          TenNhaCungCap: supplier.TenNhaCungCap,
          Email: supplier.Email,
          SoDienThoai: supplier.SoDienThoai,
          DiaChi: supplier.DiaChi,
          MoTa: supplier.MoTa || '',
          SanPhamCungCap: supplier.SanPhamCungCap || ''
        });
      }
    }
  }, [suppliers, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleUpdateSupplier(id, formData);
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
          <EditIcon />
          <Typography variant="h5">Chỉnh sửa nhà cung cấp {formData.idNhaCungCap}</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              fullWidth
              required
              label="Mã nhà cung cấp"
              value={formData.idNhaCungCap}
              disabled
            />
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
              sx={{ gridColumn: 'span 2' }}
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

export default EditSupplier;