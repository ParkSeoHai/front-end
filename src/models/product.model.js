const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false }); // Thêm option { _id: false } để tránh tạo _id cho subdocument

const productSchema = new mongoose.Schema({
  idSanPham: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenSanPham: {
    type: String,
    required: true,
    trim: true
  },
  LoaiSanPham: {
    id: String,
    TenLoaiSanPham: String
  },
  DanhMucSanPham: {
    id: String,
    TenDanhMuc: String
  },
  DonGia: {
    id: String,
    TenDonGia: String
  },
  SoLuong: {
    type: Number,
    required: true,
    default: 0
  },
  DaBan: {
    type: Number,
    default: 0,
    min: 0
  },
  Style: {
    id: String,
    TenStyle: String,
    HinhAnh: String
  },
  NhaCungCap: {
    idNhaCungCap: String,
    TenNhaCungCap: String,
    Email: String,
    SoDienThoai: String,
    DiaChi: String,
    MoTa: String,
  },
  GiaSanPham: {
    type: Number,
    required: true
  },
  MoTa: String,
  MauSac: [{
    MaMau: String,  
    TenMau: String  
  }],
  DanhGia: String,
  HinhAnh: [String],
  TrangThai: {
    type: String,
    enum: ['available', 'outOfStock', 'discontinued'],
    default: 'available'
  },
  YeuThich: {
    type: [favoriteSchema],
    default: [],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.every(item => 
          typeof item === 'object' && 
          typeof item.userId === 'string'
        );
      },
      message: 'YeuThich phải là một mảng các object có userId'
    }
  },
}, {
  timestamps: true
});

productSchema.index({ TenSanPham: 1 });
productSchema.index({ GiaSanPham: 1 });
productSchema.index({ 'LoaiSanPham.id': 1 });
productSchema.index({ 'DanhMuc.id': 1 });
productSchema.index({ DaBan: -1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;