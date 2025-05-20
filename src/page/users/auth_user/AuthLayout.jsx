import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      {/* Right side - Image */}
      <Box sx={{
        flex: '0 0 60%',
        order: 2,
        display: { xs: 'none', md: 'block' },
        backgroundImage: 'url("..//image/login_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* Left side - Auth Forms */}
      <Box sx={{
        flex: '0 0 40%',
        order: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        pl: 8
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;