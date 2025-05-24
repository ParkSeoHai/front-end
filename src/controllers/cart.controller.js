const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Size = require('../models/size.model');
const generateCartId = require('../utils/generateId');

const cartController = {
  // Create new cart
  create: async (req, res) => {
    try {
      const cart = new Cart({
        Id: generateCartId('CART'),
        NguoiDung: req.user._id,
        DanhSachSanPham: [],
      });

      await cart.save();
      res.status(201).json({
        message: 'Tạo giỏ hàng thành công',
        cart
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get cart by user
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ 
        NguoiDung: req.params.idUser,
        TrangThai: 'active'
      });

      if (!cart) {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add product to cart
  addProduct: async (req, res) => {
    try {
      const { idSanPham, SoLuong, MauSac, KichThuoc,user } = req.body;
      console.log("KichThuoc",KichThuoc)
      let cart = await Cart.findOne({ 
        NguoiDung: user.id,
        TrangThai: 'active'
      });
     
      if (!cart) {
        cart = new Cart({
          id: generateCartId('CART'),
          NguoiDung: user.id,
          DanhSachSanPham: []
        });
      }
      const product = await Product.findOne({ idSanPham:  idSanPham});
      const size = await Size.findOne({ id:  KichThuoc});
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      const existingProductIndex = cart.DanhSachSanPham.findIndex(
        item => item.idSanPham === idSanPham && 
               item.MauSac === MauSac 
      );
      if (existingProductIndex > -1) {
        cart.DanhSachSanPham[existingProductIndex].SoLuong += SoLuong;
      } else {
        cart.DanhSachSanPham.push({
          idSanPham: product.idSanPham,
          TenSanPham: product.TenSanPham,
          LoaiSanPham: product.LoaiSanPham,
          DanhMuc: product.DanhMuc,
          DonGia: product.DonGia,
          HinhAnh: product.HinhAnh[0],
          SoLuong,
          MauSacDaChon: product.MauSac[0].TenMau,
          KichThuoc: size,
          GiaTien: product.GiaSanPham
        });
      }
      await cart.save();
      res.json({ 
        message: 'Thêm sản phẩm vào giỏ hàng thành công',
        cart 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update product quantity in cart
  updateQuantity: async (req, res) => {
    try {
      const { idSanPham, SoLuong, idUser, KichThuoc } = req.body;
      // Tìm giỏ hàng
      const cart = await Cart.findOne({ 
        NguoiDung: idUser,
        TrangThai: 'active'
      });
      if (!cart) {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
      }
      // Tìm sản phẩm trong database
      const product = await Product.findOne({ idSanPham: idSanPham });
      const size = await Size.findOne({TenKichThuoc: KichThuoc})
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
        cart.DanhSachSanPham.push({
          idSanPham: product.idSanPham,
          TenSanPham: product.TenSanPham,
          LoaiSanPham: product.LoaiSanPham,
          DanhMuc: product.DanhMuc,
          DonGia: product.DonGia,
          HinhAnh: product.HinhAnh.length > 0 ? product.HinhAnh[0] : [],
          SoLuong,
          MauSacDaChon: product.MauSac[0].TenMau,
          KichThuoc: size, 
          GiaTien: product.GiaSanPham
        });
      await cart.save();
      res.json({ 
        message: 'Cập nhật số lượng thành công',
        cart 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Remove product from cart
  removeProduct: async (req, res) => {
    try {
      const { idSanPham } = req.params;
      const { idUser } = req.body;
      
      const cart = await Cart.findOne({ 
        NguoiDung: idUser,
        TrangThai: 'active'
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
      }
  
      // Tìm và xóa một sản phẩm có idSanPham
      const productIndex = cart.DanhSachSanPham.findIndex(
        item => item.idSanPham === idSanPham
      );
  
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
      }
  
      // Xóa một sản phẩm khỏi mảng
      cart.DanhSachSanPham.splice(productIndex, 1);
      await cart.save();
  
      res.json({ 
        message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
        cart 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Apply discount to cart
  applyDiscount: async (req, res) => {
    try {
      const { GiamGia } = req.body;
      
      const cart = await Cart.findOne({ 
        NguoiDung: req.user._id,
        TrangThai: 'active'
      });

      if (!cart) {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
      }

      cart.GiamGia = GiamGia;
      await cart.save();

      res.json({ 
        message: 'Áp dụng giảm giá thành công',
        cart 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    const {idUser} = req.body
    
    try {
      const cart = await Cart.findOne({ 
        NguoiDung: idUser,
        TrangThai: 'active'
      });
      if (!cart) {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
      }
      cart.DanhSachSanPham = [];
      cart.TongTienHang = 0;
      cart.GiamGia = 0;
      cart.TamTinh = 0;
      cart.TongTien = 0;

      await cart.save();
      res.json({ 
        message: 'Xóa giỏ hàng thành công',
        cart 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
    removeAllProduct: async (req, res) => {
      try {
        const { idSanPham } = req.params;
        const { idUser } = req.body;
        
        const cart = await Cart.findOne({ 
          NguoiDung: idUser,
          TrangThai: 'active'
        });
    
        if (!cart) {
          return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
        }
    
        // Lọc bỏ tất cả sản phẩm có idSanPham khớp
        cart.DanhSachSanPham = cart.DanhSachSanPham.filter(
          item => item.idSanPham !== idSanPham
        );
    
        await cart.save();
    
        res.json({ 
          message: 'Đã xóa tất cả sản phẩm khỏi giỏ hàng',
          cart 
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
};

module.exports = cartController;