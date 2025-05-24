const Style = require('../models/style.model');
const generateId = require('../utils/generateId');

const styleController = {
  // Create new style
  create: async (req, res) => {
    try {
      const style = new Style({
        id: generateId('ST'),
        ...req.body
      });
      await style.save();
      res.status(201).json({ 
        message: 'Tạo style thành công', 
        style 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all styles with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { TenStyle: new RegExp(search, 'i') },
          { MoTa: new RegExp(search, 'i') }
        ];
      }

      const styles = await Style.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Style.countDocuments(query);

      res.json({
        styles,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get style by ID
  getById: async (req, res) => {
    try {
      const style = await Style.findOne({ id: req.params.id });
      if (!style) {
        return res.status(404).json({ message: 'Không tìm thấy style' });
      }
      res.json(style);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update style
  update: async (req, res) => {
    try {
      const style = await Style.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );

      if (!style) {
        return res.status(404).json({ message: 'Không tìm thấy style' });
      }

      res.json({ 
        message: 'Cập nhật style thành công', 
        style 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete style
  delete: async (req, res) => {
    try {
      const style = await Style.findOneAndDelete({ id: req.params.id });
      if (!style) {
        return res.status(404).json({ message: 'Không tìm thấy style' });
      }
      res.json({ message: 'Xóa style thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = styleController;