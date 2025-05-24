import { Box, TextField, Button, Typography, Grid, Backdrop, Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAuthAdmin } from '../../../hooks/useAuthAdmin';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ThuDienTu: '',
    MatKhau: ''
  });
  const {handleAdminLogin, admin, error, isAuthenticated, isLoading} = useAuthAdmin();
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Kiểm tra nếu đã có thông tin admin trong localStorage
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      const parsedAdmin = JSON.parse(adminInfo);
      if (parsedAdmin.VaiTro === 'khachhang') {
        setAuthError('Tài khoản không có quyền truy cập vào trang quản trị');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        return;
      }
      if (parsedAdmin.VaiTro === 'admin' || parsedAdmin.VaiTro === 'nhanvien') {
        navigate('/admin/dashboard');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await handleAdminLogin(formData);
      if (success) {
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
          const parsedAdmin = JSON.parse(adminInfo);
          if (parsedAdmin.VaiTro === 'admin' || parsedAdmin.VaiTro === 'nhanvien') {
            navigate('/admin/dashboard');
          }
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  useEffect(() => {
    if (admin?.user?.VaiTro === 'khachhang') {
      setAuthError('Tài khoản không có quyền truy cập vào trang quản trị');
      localStorage.removeItem('adminToken');
      return;
    }
    setAuthError(null);
    if (isAuthenticated && (admin?.user?.VaiTro === 'admin' || admin?.user?.VaiTro === 'nhanvien')) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, admin]);

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>

      <Grid container sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f5f5f5',
        backgroundImage: 'url("..//image/login_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Grid item xs={6} />

        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            p: 4,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            mx: 'auto'
          }}>
            <Typography sx={{fontSize: "20px", fontWeight: 600, mb: 3, color: '#333'}}>
              Đăng nhập Admin
            </Typography>

            {(authError || error) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {authError || error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Typography variant="body1" sx={{ color: '#555' }}>
                Email:
              </Typography>
              <TextField
                fullWidth
                placeholder="Email"
                name="ThuDienTu"
                value={formData.ThuDienTu}
                onChange={(e) => setFormData({ ...formData, ThuDienTu: e.target.value })}
                margin="normal"
                sx={{ mb: 1, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
              />

              <Typography variant="body1" sx={{ color: '#555' }}>
                Mật Khẩu:
              </Typography>
              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                name="MatKhau"
                value={formData.MatKhau}
                onChange={(e) => setFormData({ ...formData, MatKhau: e.target.value })}
                margin="normal"
                sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
              />

              <Button
                onClick={handleSubmit}
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#333',
                  color: 'white',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#555'
                  }
                }}
              >
                ĐĂNG NHẬP
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginAdmin;
