const Price = require('../models/price.model');
const generatePriceId = require('../utils/generateId');

const priceController = {
  // Create new price
  create: async (req, res) => {
    try {
      const priceData = req.body;
      const price = new Price({
        id: generatePriceId('P'),
        ...priceData
      });

      await price.save();
      res.status(201).json({ 
        message: 'Tạo đơn giá thành công', 
        price 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all prices with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.TenDonGia = new RegExp(search, 'i');
      }

      const prices = await Price.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Price.countDocuments(query);

      res.json({
        prices,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get price by ID
  getById: async (req, res) => {
    try {
      const price = await Price.findOne({ id: req.params.id });
      if (!price) {
        return res.status(404).json({ message: 'Không tìm thấy đơn giá' });
      }
      res.json(price);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update price
  update: async (req, res) => {
    try {
      const price = await Price.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );

      if (!price) {
        return res.status(404).json({ message: 'Không tìm thấy đơn giá' });
      }

      res.json({ 
        message: 'Cập nhật đơn giá thành công', 
        price 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete price
  delete: async (req, res) => {
    try {
      const price = await Price.findOneAndDelete({ id: req.params.id });
      if (!price) {
        return res.status(404).json({ message: 'Không tìm thấy đơn giá' });
      }
      res.json({ message: 'Xóa đơn giá thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = priceController;