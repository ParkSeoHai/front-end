const mongoose = require('mongoose');
const ProductType = require('../models/productType.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testProductTypes = [
        {
          id: 'LSP001',
          TenLoaiSanPham: 'Áo thun'
        },
        {
          id: 'LSP002',
          TenLoaiSanPham: 'Áo sơ mi'
        },
        {
          id: 'LSP003',
          TenLoaiSanPham: 'Quần jean'
        }
      ];

      for (const type of testProductTypes) {
        await new ProductType(type).save();
      }
      console.log('Test product types created successfully');
    } catch (error) {
      console.error('Error creating product types:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));