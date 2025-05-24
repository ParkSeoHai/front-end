const mongoose = require('mongoose');
const Size = require('../models/size.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testSizes = [
        {
          id: 'KT001',
          TenKichThuoc: 'S',
          MoTa: 'Small - Dành cho người 45-50kg'
        },
        {
          id: 'KT002',
          TenKichThuoc: 'M',
          MoTa: 'Medium - Dành cho người 50-55kg'
        },
        {
          id: 'KT003',
          TenKichThuoc: 'L',
          MoTa: 'Large - Dành cho người 55-60kg'
        }
      ];

      for (const size of testSizes) {
        await new Size(size).save();
      }
      console.log('Test sizes created successfully');
    } catch (error) {
      console.error('Error creating sizes:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));