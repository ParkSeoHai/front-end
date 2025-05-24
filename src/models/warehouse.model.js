const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  SanPham: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  },
  NgayXuatKho: {
    type: Date
  },
  NgayNhapKho: {
    type: Date
  },
  HanBanLoHang: {
    type: Date
  },
  SoLuong: {
    type: Number,
    required: true
  },
  GhiChu: {
    type: String
  }
}, {
  timestamps: true
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
module.exports = Warehouse;