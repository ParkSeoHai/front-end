const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenDonGia: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Price = mongoose.model('Price', priceSchema);
module.exports = Price;