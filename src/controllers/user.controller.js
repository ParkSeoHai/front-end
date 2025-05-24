const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateUserId = require('../utils/generateId');

const userController = {
  // Login
  login: async (req, res) => {
    try {
      const { ThuDienTu, MatKhau } = req.body;
      const user = await User.findOne({ ThuDienTu });
      if (!user) {
        return res.status(401).json({ message: 'Email không tồn tại' });
      }

      const isValidPassword = await bcrypt.compare(MatKhau, user.MatKhau);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Mật khẩu không chính xác' });
      }

      const token = jwt.sign(
        { id: user.id, VaiTro: user.VaiTro },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.cookie('token', token, {
        httpOnly: true,          // Không thể truy cập bằng JavaScript
        secure: true,            // Chỉ gửi qua HTTPS
        sameSite: 'strict',      // Bảo vệ CSRF
        maxAge: 24 * 60 * 60 * 1000  // Hết hạn sau 24h
      });
      res.json({ token, user: { ...user._doc, MatKhau: undefined } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create/Register user
  create: async (req, res) => {
    try {
      const formData = req.body;
      const hashedPassword = await bcrypt.hash(formData.MatKhau, 10);
      const user = new User({
        id: generateUserId('U'),
        ...formData,
        MatKhau: hashedPassword
      });

      await user.save();
      res.status(201).json({ message: 'Tạo tài khoản thành công', user: { ...user._doc, MatKhau: undefined } });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all users with pagination and filters
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search, TrangThai } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { HoVaTen: new RegExp(search, 'i') },
          { ThuDienTu: new RegExp(search, 'i') },
          { SoDienThoai: new RegExp(search, 'i') }
        ];
      }
      if (TrangThai) {
        query.TrangThai = TrangThai;
      }

      const users = await User.find(query)
        .select('-MatKhau')
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await User.countDocuments(query);

      res.json({
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user by ID
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-MatKhau');
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update user
  update: async (req, res) => {
    try {
      const { MatKhau, ...updateData } = req.body;
      
      if (MatKhau) {
        updateData.MatKhau = await bcrypt.hash(MatKhau, 10);
      }
      const user = await User.findOneAndUpdate(
        { id: req.params.id }, // Tìm theo trường 'id' thay vì '_id'
        updateData,
        { new: true }
      ).select('-MatKhau');

      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete user
  delete: async (req, res) => {
    try {
      const user = await User.findOneAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Logout user
  logout: async (req, res) => {
    try {
      res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0) // Set cookie expiration to past date
      });
      res.json({ message: 'Đăng xuất thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get current logged-in user
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findOne({id: req.user.id}).select('-MatKhau');
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update password
  updatePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findOne({ id: req.user.id });
      
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.MatKhau);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Mật khẩu hiện tại không chính xác' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.MatKhau = hashedPassword;
      await user.save();

      // Trả về response một lần và kết thúc
      return res.status(200).json({ 
        success: true,
        message: 'Cập nhật mật khẩu thành công'
      });
    } catch (error) {
      // Trả về lỗi một lần và kết thúc
      return res.status(400).json({ 
        success: false,
        message: error.message 
      });
    }
  },

  // Update profile
  updateProfile: async (req, res) => {
    try {
      const { HoVaTen, SoDienThoai, DiaChi } = req.body;
      const user = await User.findOne({ id: req.user.id });
      
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
  
      user.HoVaTen = HoVaTen;
      user.SoDienThoai = SoDienThoai;
      user.DiaChi = DiaChi;
      
      await user.save();
  
      return res.status(200).json({ 
        success: true,
        message: 'Cập nhật thông tin thành công',
        user: { ...user._doc, MatKhau: undefined }
      });
    } catch (error) {
      return res.status(400).json({ 
        success: false,
        message: error.message 
      });
    }
  },
   // Thêm các phương thức xử lý đăng nhập social
   loginWithGoogle: async (req, res) => {
    try {
      const { email, name, googleId } = req.body;
      
      // Kiểm tra xem user đã tồn tại chưa
      let user = await User.findOne({ ThuDienTu: email });
      
      if (!user) {
        // Tạo user mới nếu chưa tồn tại
        user = new User({
          id: generateUserId('U'),
          HoVaTen: name,
          ThuDienTu: email,
          GoogleId: googleId,
          VaiTro: 'khachhang',
          TrangThai: 'active'
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user.id, VaiTro: user.VaiTro },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json({ token, user: { ...user._doc, MatKhau: undefined } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  loginWithFacebook: async (req, res) => {
    try {
      const { email, name, facebookId } = req.body;
      
      let user = await User.findOne({ ThuDienTu: email });
      
      if (!user) {
        user = new User({
          id: generateUserId('U'),
          HoVaTen: name,
          ThuDienTu: email,
          FacebookId: facebookId,
          VaiTro: 'khachhang',
          TrangThai: 'active'
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user.id, VaiTro: user.VaiTro },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json({ token, user: { ...user._doc, MatKhau: undefined } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;

 