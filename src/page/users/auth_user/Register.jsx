import { Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    SoDienThoai: '',
    ThuDienTu: '',
    HoVaTen: '',
    MatKhau: '',
    VaiTro: 'khachhang',
  });
  const { handleRegister, error, isLoading } = useAuth();

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
      if (!error) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/auth/user/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Grid container sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f5f5f5',
      backgroundImage: {
        xs: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("../../../../public/image/login_background.jpg")',
        md: 'url("../../../../public/image/login_background.jpg")'
      },
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Grid item xs={12} md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' } }} />

      <Grid item xs={12} md={6} lg={6} sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        p: { xs: 2, sm: 4 }
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: { xs: '95%', sm: 500 },
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          mx: 'auto'
        }}>
          {showSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Typography sx={{fontSize: { xs: "18px", sm: "20px" }, fontWeight: 600, mb: 3, color: '#333'}}>
            Đăng ký
          </Typography>

          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ color: '#555', fontSize: { xs: '14px', sm: '16px' } }}>
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
              size="small"
            />

            <Typography variant="body1" sx={{ color: '#555', fontSize: { xs: '14px', sm: '16px' } }}>
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
              size="small"
            />

            <Typography variant="body1" sx={{ color: '#555', fontSize: { xs: '14px', sm: '16px' } }}>
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
              size="small"
            />

            <Typography variant="body1" sx={{ color: '#555', fontSize: { xs: '14px', sm: '16px' } }}>
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
              size="small"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#333',
                color: 'white',
                py: { xs: 1, sm: 1.5 },
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
              mb: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
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
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
