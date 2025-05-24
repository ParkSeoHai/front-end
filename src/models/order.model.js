const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  idDonHang: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  NguoiDung: {
    id: {
      type: String,
      required: true
    },
    HoVaTen: {
      type: String,
      required: true
    },
    ThuDienTu: {
      type: String,
      required: true
    },
    SoDienThoai: {
      type: String,
      required: true
    },
    DiaChi: String
  },
  GioHang: {
    DanhSachSanPham: [{
      idSanPham: String,
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
      SoLuong: Number,
      MauSac: String,
      KichThuoc: {
        id: String,
        TenKichThuoc: {
          type: String,
          enum: ['S', 'M', 'L'],
        }
      },
      GiaTien: Number,
      ThanhTien: Number,
    },
    ],
    TongTienHang: Number,
    GiamGia: Number,
    TamTinh: Number,
    TongTien: Number,
  },
  DiaChiGiaoHang: {
    type: String,
  },
  PhuongThucThanhToan: {
    type: String,
    enum: ["cash", "credit_card", "bank_transfer", "cod",'paypal'],
  },
  TrangThaiDonHang: {
    type: String,
    enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
    default: "pending",
  },
  GhiChu: String,
  NgayDatHang: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
}
);

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const user = await mongoose.model("User").findOne({ id: this.NguoiDung.id });
    if (user) {
      this.NguoiDung = {
        id: user.id,
        HoVaTen: user.HoVaTen,
        ThuDienTu: user.ThuDienTu,
        SoDienThoai: user.SoDienThoai,
        DiaChi: user.DiaChi
      };
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
