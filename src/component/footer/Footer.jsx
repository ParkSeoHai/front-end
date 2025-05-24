import { Box, Typography, Link, TextField, Button } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      py: 4, 
      px: { xs: 2, sm: 3, md: 4 },
      mt: 'auto'
    }}>
      <Box sx={{ 
        maxWidth: '1240px', 
        mx: 'auto', 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, minmax(0, 1fr))'  // Fixed grid columns
        },
        gap: { xs: 3, sm: 4 },
        '& > div': {
          px: { xs: 1, sm: 2 }
        }
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
            display: { xs: 'none', sm: 'block' }, // Ẩn trên mobile
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
            display: { xs: 'none', sm: 'block' }, // Ẩn trên mobile
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
            mt: 2,
            display: { xs: 'none', sm: 'block' } // Ẩn trên mobile
          }}
          />
          
          <Link 
            href="https://youtube.com" 
            target="_blank"
            sx={{ 
            display: { xs: 'none', sm: 'flex' }, // Ẩn trên mobile
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
            component="button"
            onClick={() => navigate('/loyalty-policy')}
            sx={{ 
            display: { xs: 'none', sm: 'block' }, // Ẩn trên mobile
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

        {/* CHÍNH SÁCH Column */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            CHÍNH SÁCH
          </Typography>
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
        </Box>

        {/* THÔNG TIN LIÊN HỆ Column */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            THÔNG TIN LIÊN HỆ
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Hotline: 1900 1234
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Email: support@fdsshop.vn
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM
          </Typography>
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
        </Box>

        {/* ĐĂNG KÝ MAIL Column */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            ĐĂNG KÝ MAIL NHẬN ƯU ĐÃI
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              placeholder="Nhập Email của bạn"
              size="small"
              sx={{ 
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
          <Typography sx={{ 
            mt: 2,
            fontSize: '0.875rem'
          }}>
            Bằng cách nhấp vào nút Đăng ký, bạn đồng ý với Chính sách bảo mật và cookie của chúng tôi.
          </Typography>
          <Box component="img" 
            src="/image/image-footer-1.png" 
            alt="Đã thông báo Bộ Công Thương"
            sx={{ 
              width: 150,
              mt: 2
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;