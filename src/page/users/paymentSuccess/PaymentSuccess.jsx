import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Thank you for your purchase. Your order has been successfully processed.
      </Typography>
      <Button variant="contained" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentSuccess;