const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  idNhaCungCap: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenNhaCungCap: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  SoDienThoai: {
    type: String,
    required: true
  },
  DiaChi: {
    type: String,
    required: true
  },
  MoTa: String
}, {
  timestamps: true
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;