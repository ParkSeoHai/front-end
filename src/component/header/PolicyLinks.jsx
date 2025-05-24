import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PolicyLinks = () => {
  return (
    <Box
        sx={{
          display: { xs: "none", md: "block" },
          backgroundColor: "#F2F2F2",
          width: "100%",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            maxWidth: "1240px",
            margin: "0 auto", // Center the Box horizontally
          }}
        >
          <Link
            href="/he-thong-cua-hang"
            aria-label="policy"
            sx={{ textDecoration: "none", color: "inherit", display: "flex" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                width={32}
                height={29}
                src="../../../../public/image/map_nav.png"
                alt="Hệ thống cửa hàng"
              />
              <Typography
                sx={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  color: "#989898",
                  fontWeight: "700",
                }}
                component="span"
              >
                Hệ thống cửa hàng
              </Typography>
            </Box>
          </Link>
          <Link
            href="/chinh-sach-van-chuyen-n93684.html"
            aria-label="policy"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                width={32}
                height={29}
                src="../../../../public/image/tranform_nav.png"
                alt="Thông tin vận chuyển"
              />
              <Typography
                sx={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  color: "#989898",
                  fontWeight: "700",
                }}
                component="span"
              >
                Thông tin vận chuyển
              </Typography>
            </Box>
          </Link>
          <Link
            href="/chuong-trinh-tich-diem-n93679.html"
            aria-label="policy"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                width={32}
                height={29}
                src="../../../../public/image/policy_nav.png"
                alt="Chính sách tích điểm"
              />
              <Typography
                sx={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  color: "#989898",
                  fontWeight: "700",
                }}
                component="span"
              >
                Chính sách tích điểm
              </Typography>
            </Box>
          </Link>
        </Box>
      </Box>
  );
};

export default PolicyLinks;