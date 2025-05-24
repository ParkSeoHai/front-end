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
            Hotline: 0865005580
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Email: maiphuongbui26@gmail.com
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Địa chỉ: Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
          </Typography>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;