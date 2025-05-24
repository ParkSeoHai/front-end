const Size = require('../models/size.model');
const generateSizeId = require('../utils/generateId');

const sizeController = {
  // Create new size
  create: async (req, res) => {
    try {
      const sizeData = req.body;
      const size = new Size({
        id: generateSizeId('SIZE'),
        ...sizeData
      });

      await size.save();
      res.status(201).json({ 
        message: 'Tạo kích thước thành công', 
        size 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all sizes with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { TenKichThuoc: new RegExp(search, 'i') },
          { MoTa: new RegExp(search, 'i') }
        ];
      }

      const sizes = await Size.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Size.countDocuments(query);

      res.json({
        sizes,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get size by ID
  getById: async (req, res) => {
    try {
      const size = await Size.findOne({ id: req.params.id });
      if (!size) {
        return res.status(404).json({ message: 'Không tìm thấy kích thước' });
      }
      res.json(size);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update size
  update: async (req, res) => {
    try {
      const size = await Size.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );

      if (!size) {
        return res.status(404).json({ message: 'Không tìm thấy kích thước' });
      }

      res.json({ 
        message: 'Cập nhật kích thước thành công', 
        size 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete size
  delete: async (req, res) => {
    try {
      const size = await Size.findOneAndDelete({ id: req.params.id });
      if (!size) {
        return res.status(404).json({ message: 'Không tìm thấy kích thước' });
      }
      res.json({ message: 'Xóa kích thước thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = sizeController;