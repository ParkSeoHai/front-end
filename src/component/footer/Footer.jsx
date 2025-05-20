import { Box, Typography, Link, TextField, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      py: 4, 
      px: 2,
      mt: 'auto'
    }}>
      <Box sx={{ 
        maxWidth: '1240px', 
        mx: 'auto', 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
        gap: 4
      }}>
        {/* FDS SHOP Column */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            FDS SHOP
          </Typography>
          <Link 
            component="button"
            onClick={() => navigate('/about')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Giới thiệu
          </Link>
          <Link 
            component="button"
            onClick={() => navigate('/news')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Tin tức
          </Link>
          <Link 
            component="button"
            onClick={() => navigate('/stores')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Hệ thống cửa hàng
          </Link>
          <Link 
            component="button"
            onClick={() => navigate('/recruitment')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Thông tin tuyển dụng
          </Link>
          <Link 
            component="button"
            onClick={() => navigate('/business')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Liên hệ hợp tác kinh doanh
          </Link>
          <Box component="img" 
            src="/image/image-footer-1.png" 
            alt="Đã thông báo Bộ Công Thương"
            sx={{ 
              width: 150,
              mt: 2
            }}
          />
        </Box>

        {/* LIÊN KẾT VỚI CHÚNG TÔI Column */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            LIÊN KẾT VỚI CHÚNG TÔI
          </Typography>
          <Link 
            href="https://facebook.com" 
            target="_blank"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            <FacebookIcon sx={{ mr: 1 }} /> Facebook
          </Link>
          <Link 
            href="https://instagram.com" 
            target="_blank"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            <InstagramIcon sx={{ mr: 1 }} /> Instagram
          </Link>
          <Link 
            href="https://youtube.com" 
            target="_blank"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            <YouTubeIcon sx={{ mr: 1 }} /> Youtube
          </Link>
          <Link 
            href="mailto:contact@fdsshop.com"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            <EmailIcon sx={{ mr: 1 }} /> Email:
          </Link>
        </Box>

        {/* CHĂM SÓC KHÁCH HÀNG Column */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            CHĂM SÓC KHÁCH HÀNG
          </Typography>
          <Link 
            component="button"
            onClick={() => navigate('/shipping-policy')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Chính sách vận chuyển
          </Link>
          <Link 
            component="button"
            onClick={() => navigate('/loyalty-policy')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Chính sách tích điểm
          </Link>
          <Link 
            component="button"
            onClick={() => navigate('/return-policy')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Chính sách đổi trả
          </Link>
          <Link 
            component="button"
            onClick={() => navigate('/warranty-policy')}
            sx={{ 
              display: 'block', 
              color: '#fff', 
              textDecoration: 'none', 
              mb: 1,
              '&:hover': { color: '#ccc' }
            }}
          >
            Chế độ bảo hành trọn đời
          </Link>
        </Box>

        {/* ĐĂNG KÝ MAIL NHẬN ƯU ĐÃI CÙNG PM Column */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            ĐĂNG KÝ MAIL NHẬN ƯU ĐÃI
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              placeholder="Nhập Email của bạn"
              size="small"
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                }
              }}
            />
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: '#666',
                '&:hover': {
                  bgcolor: '#888'
                }
              }}
            >
              GỬI NGAY
            </Button>
          </Box>
          <Typography variant="body2" sx={{ color: '#ccc' }}>
            Bằng cách nhấp vào nút Đăng ký, bạn đồng ý với Chính sách bảo mật và cookie của chúng tôi. Vui lòng{' '}
            <Link 
              component="button"
              onClick={() => navigate('/auth/user/login')}
              sx={{ 
                color: '#fff',
                textDecoration: 'underline',
                '&:hover': { color: '#ccc' }
              }}
            >
              Đăng nhập
            </Link>
            {' '}khi bạn đã có tài khoản.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;