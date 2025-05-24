const mongoose = require('mongoose');
const Style = require('../models/style.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const testStyles = [
        {
          id: 'ST001',
          TenStyle: 'Casual',
          HinhAnh: 'https://example.com/images/casual-style.jpg'
        },
        {
          id: 'ST002',
          TenStyle: 'Formal',
          HinhAnh: 'https://example.com/images/formal-style.jpg'
        },
        {
          id: 'ST003',
          TenStyle: 'Sport',
          HinhAnh: 'https://example.com/images/sport-style.jpg'
        }
      ];

      for (const style of testStyles) {
        await new Style(style).save();
      }
      console.log('Test styles created successfully');
    } catch (error) {
      console.error('Error creating styles:', error);
    }
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));