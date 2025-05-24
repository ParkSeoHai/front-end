import { Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const { handleForgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await handleForgotPassword(email);
      setStatus({ type: 'success', message: 'Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.' });
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
            Quên mật khẩu
          </Typography>

          <Typography sx={{ 
            color: '#666', 
            mb: 3, 
            fontSize: { xs: '14px', sm: '16px' } 
          }}>
            Vui lòng nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu vào email của bạn.
          </Typography>

          {status.message && (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.9)' }}
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
                mb: 2,
                '&:hover': {
                  bgcolor: '#555'
                }
              }}
            >
              Gửi yêu cầu
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                to="/auth/user/login"
                style={{ 
                  color: '#0066cc',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                Quay lại đăng nhập
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;