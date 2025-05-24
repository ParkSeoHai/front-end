const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenDanhMuc: {
    type: String,
    required: true
  },
  MoTa: String,
  HinhAnh: String,
}, {
  timestamps: true
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
module.exports = ProductCategory;