import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useDiscount } from '../../../hooks/useDiscount';

const AddPromotion = () => {
  const navigate = useNavigate();
  const { handleCreateDiscount, isLoading } = useDiscount();
  const [formData, setFormData] = useState({
    TenChuongTrinh: '',
    NgayBatDau: '',
    NgayKetThuc: '',
    PhanTramGiam: '' // Thêm trường mới
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleCreateDiscount(formData);
    if (success) {
      navigate('/admin/promotions');
    }
  };

  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalOfferIcon />
          <Typography variant="h5">Thêm mã giảm giá mới</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              required
              fullWidth
              label="Tên chương trình"
              value={formData.TenChuongTrinh}
              onChange={(e) => setFormData({ ...formData, TenChuongTrinh: e.target.value })}
            />
            {/* Thêm field mới */}
            <TextField
              required
              fullWidth
              label="Phần trăm giảm"
              type="number"
              InputProps={{ 
                inputProps: { min: 0, max: 100 },
                endAdornment: <Typography>%</Typography>
              }}
              value={formData.PhanTramGiam}
              onChange={(e) => setFormData({ ...formData, PhanTramGiam: e.target.value })}
            />
            <TextField
              required
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              value={formData.NgayBatDau}
              onChange={(e) => setFormData({ ...formData, NgayBatDau: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              fullWidth
              label="Ngày kết thúc"
              type="date"
              value={formData.NgayKetThuc}
              onChange={(e) => setFormData({ ...formData, NgayKetThuc: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ gridColumn: '2' }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/promotions')}
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

export default AddPromotion;