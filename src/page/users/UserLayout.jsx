import { Box, Container } from '@mui/material';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import { Outlet } from 'react-router-dom';
import PolicyLinks from '../../component/header/PolicyLinks';
const UserLayout = () => {
  return (
    <>
    <Header/>
      <Box sx={{ flexGrow: 1, }}>
      <PolicyLinks />
       <Outlet/>
      </Box>
    <Footer/>
    </>
  );
};
export default UserLayout;