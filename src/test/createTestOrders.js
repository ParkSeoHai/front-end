const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await Order.deleteMany({});

      const user = await User.findOne();
      const cart = await Cart.findOne({ TrangThai: 'active' });

      console.log('Found cart:', cart);
      console.log('Found user:', user);

      if (!user || !cart) {
        throw new Error('User and active Cart must exist before creating orders');
      }

      const testOrders = [
        {
          idDonHang: 'DH001',
          NguoiDung: {
            id: user._id,
            HoTen: user.HoTen,
            Email: user.Email,
            SoDienThoai: user.SoDienThoai
          },
          GioHang: {
            Id: cart.Id,
            DanhSachSanPham: cart.DanhSachSanPham,
            TongTienHang: cart.TongTienHang,
            GiamGia: cart.GiamGia,
            TamTinh: cart.TamTinh,
            TongTien: cart.TongTien
          },
          MaGiamGia: 'SUMMER2024',
          PhiShip: 30000,
          TongTien: cart.TongTien + 30000,
          DiaChiGiaoHang: '123 Nguyễn Văn A, Q.1, TP.HCM',
          PhuongThucThanhToan: 'cash',
          TrangThaiDonHang: 'pending',
          GhiChu: 'Giao giờ hành chính'
        },
        {
          idDonHang: 'DH002',
          NguoiDung: {
            id: user._id,
            HoTen: user.HoTen,
            Email: user.Email,
            SoDienThoai: user.SoDienThoai
          },
          GioHang: {
            Id: cart.Id,
            DanhSachSanPham: cart.DanhSachSanPham,
            TongTienHang: cart.TongTienHang,
            GiamGia: cart.GiamGia,
            TamTinh: cart.TamTinh,
            TongTien: cart.TongTien
          },
          PhiShip: 45000,
          TongTien: cart.TongTien + 45000,
          DiaChiGiaoHang: '456 Lê Văn B, Q.2, TP.HCM',
          PhuongThucThanhToan: 'bank_transfer',
          TrangThaiDonHang: 'confirmed',
          GhiChu: 'Giao nhanh'
        }
      ];

      console.log('Creating orders:', JSON.stringify(testOrders, null, 2));

      for (const order of testOrders) {
        await new Order(order).save();
      }
      console.log('Test orders created successfully');
    } catch (error) {
      console.error('Error creating orders:', error);
    } finally {
      await mongoose.connection.close();
    }
  })
  .catch(err => console.error('Connection error:', err));