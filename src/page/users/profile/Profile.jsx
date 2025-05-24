import { Box, Button, TextField, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const { handleUpdateProfile, isLoading } = useUser();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    HoVaTen: user?.HoVaTen || '',
    SoDienThoai: user?.SoDienThoai || '',
    ThuDienTu: user?.ThuDienTu || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await handleUpdateProfile(profileData);
      if (result) {
        toast.success("Cập nhật thông tin thành công!");
      } else {
        toast.error("Cập nhật thông tin thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  // Add new states
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Add handlers
  const handlePasswordModalOpen = () => setOpenPasswordModal(true);
  const handlePasswordModalClose = () => {
    setOpenPasswordModal(false);
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePasswordSubmit = () => {
    // Add your password change logic here
    console.log(passwordData);
    handlePasswordModalClose();
  };
  useEffect(() => {
    if (user) {
      setProfileData({
        HoVaTen: user.HoVaTen || '',
        SoDienThoai: user.SoDienThoai || '',
        ThuDienTu: user.ThuDienTu || ''
      });
    }
  }, [user]);
  return (
    <Box sx={{ 
      maxWidth: "1240px", 
      margin: "0 auto", 
      padding: { xs: "20px 10px", sm: "30px 15px", md: "40px 20px" },
      marginTop: { xs: "60px", sm: "0" }
    }}>
      <Box sx={{ 
        display: "flex", 
        gap: { xs: 2, sm: 3, md: 4 },
        flexDirection: { xs: "column", md: "row" }
      }}>
        {/* Left Side - Profile Info */}
        <Box sx={{ 
          flex: 1, 
          bgcolor: "#fff", 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 1 
        }}>
          <Typography variant="h6" sx={{ 
            mb: 3,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}>
            Hồ sơ của tôi
          </Typography>
          
          <Box sx={{ 
            display: "flex", 
            alignItems: { xs: "center" }, 
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 }
          }}>
            <Avatar sx={{ 
              width: { xs: 100, sm: 80 }, 
              height: { xs: 100, sm: 80 },
              mr: { xs: 0, sm: 2 }
            }}/>
            <Box sx={{ 
              textAlign: { xs: 'center', sm: 'left' },
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Typography sx={{ 
                fontWeight: 600, 
                mb: 1,
                fontSize: { xs: '1.1rem', sm: 'inherit' }
              }}>
                {user?.HoVaTen}
              </Typography>
              <Button 
                onClick={handlePasswordModalOpen}
                sx={{ 
                  color: "#dc0606", 
                  p: 0,
                  fontSize: { xs: 14, sm: 12 },
                  fontWeight: 600,
                  textDecoration: "underline",
                  "&:hover": {
                    bgcolor: "transparent",
                    opacity: 0.8
                  }
                }}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Box>

          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: { xs: 2, sm: 3 }
          }}>
            {/* Form fields remain the same, just add responsive padding */}
            <Box>
              <Typography sx={{ mb: 1, fontSize: { xs: '0.95rem', sm: 'inherit' } }}>Tên</Typography>
              <TextField
                fullWidth
                name="HoVaTen"
                value={profileData?.HoVaTen}
                onChange={handleChange}
                placeholder="Họ và tên"
                size="small"
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, fontSize: { xs: '0.95rem', sm: 'inherit' } }}>Email</Typography>
              <TextField
                fullWidth
                name="ThuDienTu"
                value={profileData?.ThuDienTu}
                onChange={handleChange}
                placeholder="Thư điện tử"
                size="small"
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, fontSize: { xs: '0.95rem', sm: 'inherit' } }}>Địa chỉ</Typography>
              <TextField
                fullWidth
                name="DiaChi"
                value={profileData?.DiaChi}
                onChange={handleChange}
                placeholder="Địa chỉ"
                size="small"
              />
            </Box>
            {/* Repeat similar changes for other TextField containers */}
            
            <Button 
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{ 
                width: { xs: "100%", sm: "fit-content" },
                bgcolor: "#303030",
                "&:hover": {
                  bgcolor: "#1a1a1a"
                }
              }}
            >
              {isLoading ? "ĐANG LƯU..." : "LƯU"}
            </Button>
          </Box>
        </Box>

        {/* Right Side - Orders */}
        <Box sx={{ flex: 1, bgcolor: "#fff", p: 3, borderRadius: 1 }}>
            <Typography variant="h6">Đơn hàng của tôi</Typography>
            <Typography sx={{fontSize: "14px", color: "#666", mt: 2,fontWeight: 600, textAlign: 'center' }}>
            Tra cứu đơn hàng của tôi <a style={{color: "#D40404" }} href="/user/order">tại đây</a>
            </Typography>
        </Box>
      </Box>
      {/* Password Dialog - Make it responsive */}
      <Dialog 
        open={openPasswordModal} 
        onClose={handlePasswordModalClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            margin: { xs: 2, sm: 'auto' },
            width: { xs: 'calc(100% - 32px)', sm: '100%' }
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid #e0e0e0',
          p: { xs: 1.5, sm: 2 },
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}>
          Đổi mật khẩu
        </DialogTitle>
        <DialogContent sx={{ 
          mt: 2,
          p: { xs: 1.5, sm: 2 }
        }}>
          <Typography sx={{ fontSize: '14px', color: '#666', mb: 3 }}>
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              name="oldPassword"
              label="Mật khẩu cũ"
              type="password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              size="small"
            />
            <TextField
              fullWidth
              name="newPassword"
              label="Mật khẩu mới"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              size="small"
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Xác nhận Mật khẩu"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2 }, 
          borderTop: '1px solid #e0e0e0' 
        }}>
          <Button 
            onClick={handlePasswordModalClose}
            sx={{ 
              color: '#666',
              '&:hover': { bgcolor: 'transparent', opacity: 0.8 }
            }}
          >
            HỦY
          </Button>
          <Button
            onClick={handlePasswordSubmit}
            variant="contained"
            sx={{
              bgcolor: '#303030',
              '&:hover': { bgcolor: '#1a1a1a' }
            }}
          >
            XÁC NHẬN
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default Profile;