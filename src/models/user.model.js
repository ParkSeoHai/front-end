const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  HoVaTen: {
    type: String,
    required: true,
    trim: true
  },
  NgaySinh: {
    type: Date,
  },
  DiaChi: {
    type: String,
    trim: true
  },
  ThuDienTu: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  SoDienThoai: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  TrangThai: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  MatKhau: {
    type: String,
    required: true
  },
  VaiTro: {
    type: String,
    enum: ['admin', 'khachhang','nhanvien'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Add pre-save middleware to handle password hashing if needed
userSchema.pre('save', async function(next) {
  // Add password hashing logic here if required
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;