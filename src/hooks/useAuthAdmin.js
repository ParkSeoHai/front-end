import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, logoutAdmin, getCurrentAdmin, updateAdminPassword, updateAdminProfile } from '../redux/features/auth/adminAuthThunks';

export const useAuthAdmin = () => {
  const dispatch = useDispatch();
  const { admin, isLoading, error, isAuthenticated } = useSelector(state => state.authAdmin);

  const handleAdminLogin = async (credentials) => {
    try {
      await dispatch(loginAdmin(credentials)).unwrap();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleAdminLogout = async () => {
    try {
     const res =  await dispatch(logoutAdmin()).unwrap();
      return res;
    } catch (error) {
      console.error(error);
    }
  };
  const getAdmin = async() => {
    try {
       await dispatch(getCurrentAdmin()).unwrap()
       return admin
    } catch (error) {
        console.error(error);
    }
  };

  const handleUpdatePassword = async (passwords) => {
    try {
      await dispatch(updateAdminPassword(passwords)).unwrap();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      await dispatch(updateAdminProfile(profileData)).unwrap();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { 
    admin, 
    isLoading, 
    error, 
    isAuthenticated, 
    getAdmin, 
    handleAdminLogin, 
    handleAdminLogout,
    handleUpdatePassword,
    handleUpdateProfile 
  };
};