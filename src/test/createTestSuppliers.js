const mongoose = require('mongoose');
const Supplier = require('../models/supplier.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testSuppliers = [
        {
          idNhaCungCap: 'NCC001',  
          TenNhaCungCap: 'Công ty TNHH Thời Trang ABC',
          Email: 'abc@fashion.com',
          SoDienThoai: '0123456789',
          DiaChi: '123 Nguyễn Văn A, Q.1, TP.HCM',
          MoTa: 'Chuyên cung cấp quần áo thời trang',
          SanPhamCungCap: 'Quần nữ cao cấp'
        },
        {
          idNhaCungCap: 'NCC002',  
          TenNhaCungCap: 'Công ty CP Thời Trang XYZ',
          Email: 'xyz@fashion.com',
          SoDienThoai: '0987654321',
          DiaChi: '456 Lê Văn B, Q.2, TP.HCM',
          MoTa: 'Nhà phân phối thời trang cao cấp',
          SanPhamCungCap: 'Đầm thanh lịch'
        }
      ];

      // Clear existing data before inserting new ones
      await Supplier.deleteMany({});  // Added this line to clear existing data
      
      for (const supplier of testSuppliers) {
        await new Supplier(supplier).save();
      }
      console.log('Test suppliers created successfully');
    } catch (error) {
      console.error('Error creating suppliers:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));