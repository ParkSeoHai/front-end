const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    NguoiDung: {
      type: String,
      ref: "User",
      required: true,
    },
    DanhSachSanPham: [
      {
        idSanPham: {
          type: String,
          required: true,
        },
        TenSanPham: String,
        LoaiSanPham: {
          id: String,
          TenLoaiSanPham: String,
        },
        DanhMuc: {
          id: String,
          TenDanhMuc: String,
          MoTa: String,
          HinhAnh: String,
        },
        DonGia: {
          id: String,
          TenDonGia: String,
        },
        HinhAnh: String,
        SoLuong: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        KichThuoc: {
          id: String,
          TenKichThuoc: {
            type: String,
            enum: ['S', 'M', 'L'],
          }
        },
        MauSacDaChon: String,
        GiaTien: {
          type: Number,
          required: true,
        },
        ThanhTien: {
          type: Number,
          default: 0,
        },
      },
    ],
    SoLuong: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    TongTienHang: {
      type: Number,
      default: 0,
    },
    GiamGia: {
      type: Number,
      default: 0,
    },
    TamTinh: {
      type: Number,
      default: 0,
    },
    TongTien: {
      type: Number,
      default: 0,
    },
    TrangThai: {
      type: String,
      enum: ["active", "ordered", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware remains the same
cartSchema.pre("save", function (next) {
  this.DanhSachSanPham.forEach((item) => {
    item.ThanhTien = item.SoLuong * item.GiaTien;
  });

  this.TongTienHang = this.DanhSachSanPham.reduce((total, item) => {
    return total + item.ThanhTien;
  }, 0);

  this.TamTinh = this.TongTienHang - this.GiamGia;
  this.TongTien = this.TamTinh;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
