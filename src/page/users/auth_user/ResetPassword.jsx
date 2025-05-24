import { Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { handleResetPassword } = useAuth();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      setStatus({ type: 'error', message: 'Mật khẩu không khớp' });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Mật khẩu phải có ít nhất 6 ký tự' });
      return;
    }

    try {
      await handleResetPassword(token, passwords.newPassword);
      setStatus({ 
        type: 'success', 
        message: 'Đặt lại mật khẩu thành công. Bạn sẽ được chuyển hướng đến trang đăng nhập.' 
      });
      setTimeout(() => {
        navigate('/auth/user/login');
      }, 3000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.' 
      });
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
          maxWidth: { xs: '95%', sm: 400 },
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          mx: 'auto'
        }}>
          <Typography sx={{
            fontSize: { xs: "18px", sm: "20px" }, 
            fontWeight: 600, 
            mb: 3, 
            color: '#333'
          }}>
            Đặt lại mật khẩu
          </Typography>

          {status.message && (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Mật khẩu mới"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 3 }}
              required
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#333',
                color: 'white',
                py: { xs: 1, sm: 1.5 },
                '&:hover': {
                  bgcolor: '#555'
                }
              }}
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;