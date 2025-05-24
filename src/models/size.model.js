const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenKichThuoc: {
    type: String,
    required: true
  },
  MoTa: String
}, {
  timestamps: true
});

const Size = mongoose.model('Size', sizeSchema);
module.exports = Size;