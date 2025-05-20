import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser, updateProfile } from '../redux/features/user/userThunks';

export const useUser = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error, totalUsers, profile } = useSelector(state => state.users);

  const handleFetchUsers = async (params) => {
    try {
      await dispatch(fetchUsers(params)).unwrap();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await dispatch(createUser(userData)).unwrap();
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  };

  const handleUpdateUser = async (userId, userData) => {
    try {
      await dispatch(updateUser({ userId, userData })).unwrap();
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  const handleUpdateProfile = async (userData) => {
    try {
      const result = await dispatch(updateProfile(userData)).unwrap();
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  return {
    users,
    isLoading,
    error,
    totalUsers,
    profile,
    handleFetchUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleUpdateProfile
  };
};