import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import NavbarAdmin from "../../component/header/NavbarAdmin";
import { Outlet, useNavigate } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useAuthAdmin } from "../../hooks/useAuthAdmin";

const styles = {
  navbar: {
    width: 280,
    bgcolor: "#2c3e50", // Màu nền tối của navbar
    height: "100vh",
    color: "#fff",
    position: "fixed",
    left: 0,
    top: 0,
    borderRight: "1px solid #34495e",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)"
  },
  header: {
    p: 2,
    borderBottom: "1px solid #34495e",
    display: "flex",
    alignItems: "center",
    '& :hover': { 
      cursor: 'pointer',
      opacity: 0.9
    },
    background: "linear-gradient(to bottom, #2c3e50, #34495e)"
  },
  logo: {
    marginLeft: "16px",
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    letterSpacing: "1px",
    fontSize: "22px",
    color: "#fff"
  },
  menuItem: (isActive) => ({
    py: 1.5,
    color: "#fff",
    transition: "all 0.3s ease",
    bgcolor: isActive ? "rgba(26, 188, 156, 0.1)" : "transparent",
    borderLeft: isActive ? "4px solid #1abc9c" : "4px solid transparent",
    paddingLeft: isActive ? "12px" : "16px",
    "&:hover": {
      bgcolor: "rgba(26, 188, 156, 0.1)",
      borderLeft: "4px solid #1abc9c",
      paddingLeft: "12px"
    }
  }),
  menuIcon: (isActive) => ({
    color: isActive ? "#1abc9c" : "#fff", // Màu xanh mint khi active
    minWidth: 40,
    transition: "all 0.3s ease"
  }),
  menuText: (isActive) => ({
    "& .MuiListItemText-primary": {
      fontSize: "14px",
      fontWeight: isActive ? 600 : 500,
      color: isActive ? "#1abc9c" : "#fff"
    }
  }),
  submenuItem: (isActive) => ({
    pl: 4,
    py: 1,
    color: "#fff",
    bgcolor: isActive ? "rgba(26, 188, 156, 0.1)" : "transparent",
    borderLeft: isActive ? "4px solid #1abc9c" : "4px solid transparent",
    "&:hover": {
      bgcolor: "rgba(26, 188, 156, 0.05)",
      borderLeft: "4px solid #1abc9c",
    }
  }),
  submenuText: (isActive) => ({
    "& .MuiListItemText-primary": {
      fontSize: "13px",
      color: isActive ? "#1abc9c" : "#bdc3c7",
      fontWeight: isActive ? 600 : 400
    }
  })
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const { admin, handleAdminLogout, getAdmin } = useAuthAdmin();

  useEffect(() => {
    getAdmin();
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = async () => {
    const res = await handleAdminLogout();
    if (res.status === 200) {
      navigate("/auth/admin/login");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavbarAdmin />
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: "280px" }}>
        {/* Header */}
        <Box
          sx={{
            height: "64px",
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 1,
              px: 2,
            }}
          ></Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <DarkModeOutlinedIcon />
            </IconButton>
            <IconButton>
              <FullscreenExitOutlinedIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleClick}>
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                sx: {
                  width: 200,
                  bgcolor: "#fff",
                  "& .MuiMenuItem-root": {
                    py: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* User Info */}
              <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #eee" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {admin?.HoVaTen}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "13px" }}
                >
                  {admin?.ThuDienTu}
                </Typography>
              </Box>

              <MenuItem sx={{ bgcolor: "#f3f0ff", mt: 1 }} onClick={()=>{navigate('/admin/settings')}}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cài đặt tài khoản</ListItemText>
              </MenuItem>
              <MenuItem onClick={()=>{navigate('/admin/profile')}}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Hồ sơ cá nhân" />
                <Box
                  sx={{
                    bgcolor: "#fff3dc",
                    color: "#ffb74d",
                    px: 1,
                    borderRadius: 1,
                    fontSize: "12px",
                  }}
                >
                  02
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Đăng xuất</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "calc(100vh - 64px)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
