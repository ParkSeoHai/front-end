const mongoose = require('mongoose');
const Payment = require('../models/payment.model');
const Order = require('../models/order.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      // Get an order for reference
      const order = await Order.findOne();
      if (!order) {
        throw new Error('No order found. Please create orders first.');
      }

      const testPayments = [
        {
          idThanhToan: 'TT001',
          DonHang: [order._id],
          SoTien: 628000,
          PhuongThucThanhToan: 'cash',
          TrangThaiThanhToan: 'completed',
          NgayThanhToan: new Date(),
          MoTa: 'Thanh toán tiền mặt khi nhận hàng',
          NguoiThanhToan: 'Nguyễn Văn A'
        },
        {
          idThanhToan: 'TT002',
          DonHang: [order._id],
          SoTien: 629000,
          PhuongThucThanhToan: 'bank_transfer',
          TrangThaiThanhToan: 'pending',
          MoTa: 'Chuyển khoản ngân hàng',
          NguoiThanhToan: 'Trần Thị B'
        }
      ];

      for (const payment of testPayments) {
        await new Payment(payment).save();
      }
      console.log('Test payments created successfully');
    } catch (error) {
      console.error('Error creating payments:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));