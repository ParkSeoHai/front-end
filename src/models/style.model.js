const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  TenStyle: {
    type: String,
    required: true
  },
  HinhAnh: String
}, {
  timestamps: true
});

const Style = mongoose.model('Style', styleSchema);
module.exports = Style;