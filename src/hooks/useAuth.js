import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  logout,
  getCurrentUser,
  register,
  forgotPassword,
  resetPassword
} from '../redux/features/auth/authThunks';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error, isAuthenticated } = useSelector(state => state.auth);
  const handleLogin = async (credentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const handleRegister = async (credentials) => {
    try {
      await dispatch(register(credentials)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const getUser = async () => {
    await dispatch(getCurrentUser()).unwrap();
    return user;
  }
  const handleForgotPassword = async (email) => {
    const result = await dispatch(forgotPassword(email)).unwrap();
    return { success: true, message: result.message };
  };

  const handleResetPassword = async (token, newPassword) => {
    const result = await dispatch(resetPassword({ token, newPassword })).unwrap();
    return { success: true, message: result.message };
  };


  return { user, isLoading, error, isAuthenticated, handleLogin, handleLogout, getUser, handleRegister, handleForgotPassword, handleResetPassword };
};