import { Box, IconButton, Rating, Typography } from "@mui/material"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const ProductItem = ({ product, image, name, price, discount, rating, soldCount }) => {
  // Format price with Vietnamese currency
  const formatPrice = (price) => {
    // Ensure price is a valid number
    const numericPrice = Number(price) || 0;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(numericPrice);
  };

  // Calculate discounted price safely
  const calculateDiscountedPrice = (originalPrice, discountPercent) => {
    const numericPrice = Number(originalPrice) || 0;
    const numericDiscount = Number(discountPercent) || 0;
    return numericPrice - (numericPrice * (numericDiscount / 100));
  };

  return (
    <div>
      <Box sx={{ 
        "&:hover ": {
          transform: "translateY(-10px) scale(1.02)",
          transition: "transform 0.3s ease-in-out",
          cursor: "pointer",
        }
      }}>
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            color: "#303030",
            lineHeight: "20px",
            margin: "13px 0 7px",
            overflow: "hidden",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            fontWeight: "600",
          }}
        >
          {name}
        </Typography>

        <Box sx={{ marginBottom: '10px' }}>
          <Typography sx={{ 
            fontSize: "16px", 
            color: "#D40404", 
            fontWeight: "600",
            display: 'inline-block',
            marginRight: '10px'
          }}>
            {formatPrice(calculateDiscountedPrice(price, discount))}
          </Typography>
          {discount > 0 && (
            <Typography sx={{ 
              fontSize: "14px", 
              color: "#808284", 
              textDecoration: 'line-through',
              display: 'inline-block'
            }}>
              {formatPrice(price)}
            </Typography>
          )}
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            {/* Color options remain unchanged */}
            <Box sx={{ borderRadius: "50%", padding: "3px", display: "inline-block" }}>
              <Typography sx={{
                width: "14px",
                height: "14px",
                display: "block",
                borderRadius: "50%",
                border: "1px solid #D8D8D8",
              }}></Typography>
            </Box>
            <Box sx={{ borderRadius: "50%", padding: "3px", display: "inline-block" }}>
              <Typography sx={{
                width: "14px",
                height: "14px",
                display: "block",
                borderRadius: "50%",
                border: "1px solid #D8D8D8",
              }}></Typography>
            </Box>
          </Box>
          <Box sx={{ display: "inline-block", marginLeft: "10px" }}>
            <IconButton sx={{ color: "#808284", p: 0 }}>
              <FavoriteBorderOutlinedIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Rating
            sx={{ "&.MuiRating-sizeMedium": { fontSize: "16px" } }}
            name="half-rating"
            value={rating}
            precision={0.5}
            readOnly
          />
          <Typography sx={{
            fontSize: "12px",
            color: "#656565",
            lineHeight: "20px",
            fontWeight: "600",
          }}>
            ({soldCount} đã bán)
          </Typography>
        </Box>
      </Box>
    </div>  
  )
}

export default ProductItem