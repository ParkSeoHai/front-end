const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await Cart.deleteMany({});

      const user = await User.findOne();
      const products = await Product.find().limit(1);
      
      if (!user || products.length === 0) {
        throw new Error('User and Products must exist before creating carts');
      }

      const testCarts = [
        {
          Id: 'GH001',
          NguoiDung: user.id,
          DanhSachSanPham: [
            {
              SanPham: {
                idSanPham: products[0].idSanPham,
                TenSanPham: products[0].TenSanPham,
                LoaiSanPham: products[0].LoaiSanPham,
                DanhMuc: products[0].DanhMuc,
                DonGia: products[0].DonGia,
                HinhAnh: products[0].HinhAnh[0]
              },
              SoLuong: 2,
              MauSac: products[0].MauSac,
              KichThuoc: products[0].KichThuoc.TenKichThuoc,
              GiaTien: products[0].GiaSanPham,
              ThanhTien: products[0].GiaSanPham * 2
            }
          ],
          TongTienHang: 0, // Will be calculated by pre-save middleware
          GiamGia: 50000,
          TamTinh: 0,    // Will be calculated by pre-save middleware
          TongTien: 0,   // Will be calculated by pre-save middleware
          TrangThai: 'active'
        }
      ];

      console.log('Creating carts with products:', JSON.stringify(testCarts, null, 2));
      await Cart.insertMany(testCarts);
      console.log('Test carts created successfully');
    } catch (error) {
      console.error('Error creating carts:', error);
    } finally {
      await mongoose.connection.close();
    }
  })
  .catch(err => console.error('Connection error:', err));