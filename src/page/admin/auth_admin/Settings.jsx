import { Box, Paper, Typography, TextField, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useAuthAdmin } from '../../../hooks/useAuthAdmin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer } from 'react-toastify';

const Settings = () => {
  const navigate = useNavigate();
  const { admin, handleUpdatePassword, handleUpdateProfile } = useAuthAdmin();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profileData, setProfileData] = useState({
    HoVaTen: admin?.HoVaTen || '',
    SoDienThoai: admin?.SoDienThoai || '',
    DiaChi: admin?.DiaChi || ''
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    try {
      await handleUpdatePassword(passwords);
      toast.success('Cập nhật mật khẩu thành công', { autoClose: 1000 });
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Cập nhật mật khẩu thất bại', { autoClose: 1000 });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateProfile(profileData);
      toast.success('Cập nhật thông tin thành công', { autoClose: 1000 });
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại', { autoClose: 1000 });
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ 
          mb: 2,
          color: '#303030',
          '&:hover': { 
            bgcolor: 'rgba(48, 48, 48, 0.04)' 
          }
        }}
      >
        Quay lại
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Thông tin cá nhân</Typography>
        
        <form onSubmit={handleProfileSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={profileData.HoVaTen}
                onChange={(e) => setProfileData({...profileData, HoVaTen: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={profileData.SoDienThoai}
                onChange={(e) => setProfileData({...profileData, SoDienThoai: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                value={profileData.DiaChi}
                onChange={(e) => setProfileData({...profileData, DiaChi: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit"
                variant="contained"
                sx={{ 
                  bgcolor: '#303030',
                  '&:hover': { bgcolor: '#404040' }
                }}
              >
                Cập nhật thông tin
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Đổi mật khẩu</Typography>
        
        <form onSubmit={handlePasswordSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu hiện tại"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu mới"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Xác nhận mật khẩu mới"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit"
                variant="contained"
                sx={{ 
                  bgcolor: '#303030',
                  '&:hover': { bgcolor: '#404040' }
                }}
              >
                Cập nhật mật khẩu
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Settings;