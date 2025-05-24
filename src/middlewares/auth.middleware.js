const jwt = require('jsonwebtoken');

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Không tìm thấy token xác thực' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }
  },

  verifyAdmin: (req, res, next) => {
    const user = req?.user || req?.body?.user;
    if (!user) {
      return res.status(401).json({ message: 'Không tìm thấy thông tin người dùng' });
    }
    
    if (user.VaiTro === 'admin' || user.VaiTro === 'nhanvien') {
      next();
    } else {
      return res.status(403).json({ message: 'Yêu cầu quyền admin' });
    }
  }
};

module.exports = authMiddleware;