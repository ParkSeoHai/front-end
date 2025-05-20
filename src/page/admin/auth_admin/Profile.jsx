import { Box, Paper, Typography, Button, Grid, Avatar, Divider } from '@mui/material';
import { useEffect } from 'react';
import { useAuthAdmin } from '../../../hooks/useAuthAdmin';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

const ProfileAdmin = () => {
  const navigate = useNavigate();
  const { admin } = useAuthAdmin();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
    }
  }, [admin, navigate]);

  if (!admin) return null;

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ 
          mb: 2,
          color: '#303030',
          '&:hover': { bgcolor: 'rgba(48, 48, 48, 0.04)' }
        }}
      >
        Quay lại
      </Button>
      
      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)'
        }}
      >
        <Grid container spacing={4}>
          {/* Left Column - Avatar and Basic Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 180, 
                  height: 180,
                  margin: '0 auto 20px',
                  bgcolor: '#303030',
                  fontSize: '4rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                {admin.HoVaTen?.charAt(0)}
              </Avatar>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                {admin.HoVaTen}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666',
                  bgcolor: '#f0f0f0',
                  py: 0.5,
                  px: 2,
                  borderRadius: 2,
                  display: 'inline-block'
                }}
              >
                {admin.VaiTro === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
              </Typography>
            </Box>
          </Grid>

          {/* Right Column - Detailed Info */}
          <Grid item xs={12} md={8}>
            <Box sx={{ pl: { md: 4 } }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Thông tin cá nhân
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon sx={{ color: '#666', fontSize: 28 }} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Họ và tên
                      </Typography>
                      <Typography variant="body1">
                        {admin.HoVaTen}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon sx={{ color: '#666', fontSize: 28 }} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {admin.ThuDienTu}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PhoneIcon sx={{ color: '#666', fontSize: 28 }} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Số điện thoại
                      </Typography>
                      <Typography variant="body1">
                        {admin.SoDienThoai || 'Chưa cập nhật'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationOnIcon sx={{ color: '#666', fontSize: 28 }} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Địa chỉ
                      </Typography>
                      <Typography variant="body1">
                        {admin.DiaChi || 'Chưa cập nhật'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button 
                    variant="contained"
                    onClick={() => navigate('/admin/settings')}
                    sx={{ 
                      bgcolor: '#303030',
                      '&:hover': { bgcolor: '#404040' },
                      px: 4
                    }}
                  >
                    Chỉnh sửa thông tin
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfileAdmin;