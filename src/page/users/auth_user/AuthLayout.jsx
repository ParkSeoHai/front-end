import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      minHeight: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      {/* Right side - Image */}
      <Box sx={{
        flex: { xs: '1', md: '0 0 60%' },
        order: { xs: 1, md: 2 },
        display: { xs: 'none', md: 'block' },
        backgroundImage: 'url("/image/login_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: { xs: '35vh', md: '100vh' }
      }} />

      {/* Left side - Auth Forms */}
      <Box sx={{
        flex: { xs: '1', md: '0 0 40%' },
        order: { xs: 2, md: 1 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 2, sm: 3, md: 4 },
        pl: { xs: 2, sm: 3, md: 8 },
        width: '100%'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;