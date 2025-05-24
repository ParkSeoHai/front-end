const mongoose = require('mongoose');
const ProductCategory = require('../models/productCategory.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testCategories = [
        {
          id: 'DM001',
          TenDanhMuc: 'Áo Nam',
          MoTa: 'Các loại áo dành cho nam giới',
          HinhAnh: 'https://example.com/images/ao-nam.jpg'
        },
        {
          id: 'DM002',
          TenDanhMuc: 'Quần Nam',
          MoTa: 'Các loại quần dành cho nam giới',
          HinhAnh: 'https://example.com/images/quan-nam.jpg'
        }
      ];

      for (const category of testCategories) {
        await new ProductCategory(category).save();
      }
      console.log('Test product categories created successfully');
    } catch (error) {
      console.error('Error creating product categories:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));