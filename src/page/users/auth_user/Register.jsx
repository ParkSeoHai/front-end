import { Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    SoDienThoai: '',
    ThuDienTu: '',
    HoVaTen: '',
    MatKhau: '',
    VaiTro: 'khachhang',
  });
  const { handleRegister,error,isLoading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData);
      if(error){
        return;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Grid container sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5',
      backgroundImage: 'url("../../../../public/image/login_background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Grid item xs={6} />

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          p: 4,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          mx: 'auto'
        }}>
          <Typography sx={{fontSize: "20px", fontWeight: 600, mb: 3, color: '#333'}}>
            Đăng ký
          </Typography>

          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Số điện thoại:
            </Typography>
            <TextField
              fullWidth
              placeholder="Điện thoại"
              name="SoDienThoai"
              value={formData.SoDienThoai}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
            />

            <Typography variant="body1" sx={{ color: '#555' }}>
              Địa Chỉ Email:
            </Typography>
            <TextField
              fullWidth
              placeholder="Email hoặc tên đăng nhập"
              name="ThuDienTu"
              value={formData.ThuDienTu}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
            />

            <Typography variant="body1" sx={{ color: '#555' }}>
              Họ và tên:
            </Typography>
            <TextField
              fullWidth
              placeholder="Họ và tên của bạn"
              name="HoVaTen"
              value={formData.HoVaTen}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
            />

            <Typography variant="body1" sx={{ color: '#555' }}>
              Mật Khẩu:
            </Typography>
            <TextField
              fullWidth
              placeholder="Password"
              name="MatKhau"
              type="password"
              value={formData.MatKhau}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#333',
                color: 'white',
                py: 1.5,
                mb: 2,
                '&:hover': {
                  bgcolor: '#555'
                }
              }}
              onClick={handleSubmit}
            >
              TẠO TÀI KHOẢN
            </Button>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mb: 2 
            }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Đã có tài khoản? 
              </Typography>
              <Link
                to="/auth/user/login"
                style={{ 
                  color: '#0066cc',
                  textDecoration: 'none',
                  marginLeft: '8px',
                  fontWeight: 500
                }}
              >
                Đăng nhập
              </Link>
            </Box>

            <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
              Đăng ký Nhận phiếu <span style={{ color: 'red' }}>giảm giá 10%</span> off và Hơn thế nữa
            </Typography>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
