const mongoose = require('mongoose');
const Price = require('../models/price.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testPrices = [
        {
          id: 'DG001',
          TenDonGia: 'Giá bán lẻ'
        },
        {
          id: 'DG002',
          TenDonGia: 'Giá bán sỉ'
        },
        {
          id: 'DG003',
          TenDonGia: 'Giá khuyến mãi'
        }
      ];

      for (const price of testPrices) {
        await new Price(price).save();
      }
      console.log('Test prices created successfully');
    } catch (error) {
      console.error('Error creating prices:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));