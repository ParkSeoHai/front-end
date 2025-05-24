const Discount = require('../models/discount.model');
const generateDiscountId = require('../utils/generateId');

const discountController = {
  // Create new discount
  create: async (req, res) => {
    try {
      const discountData = req.body;
      const discount = new Discount({
        id: generateDiscountId('D'),
        ...discountData
      });
      await discount.save();
      res.status(201).json({ 
        message: 'Tạo mã giảm giá thành công', 
        discount 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all discounts with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { id: new RegExp(search, 'i') },
          { TenChuongTrinh: new RegExp(search, 'i') }
        ];
      }

      const discounts = await Discount.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Discount.countDocuments(query);

      res.json({
        discounts,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get discount by ID
  getById: async (req, res) => {
    try {
      const discount = await Discount.findOne({ id: req.params.id });
      if (!discount) {
        return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
      }
      res.json(discount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update discount
  update: async (req, res) => {
    try {
      const discount = await Discount.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );

      if (!discount) {
        return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
      }

      res.json({ 
        message: 'Cập nhật mã giảm giá thành công', 
        discount 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete discount
  delete: async (req, res) => {
    try {
      const discount = await Discount.findOneAndDelete({ id: req.params.id });
      if (!discount) {
        return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
      }
      res.json({ message: 'Xóa mã giảm giá thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = discountController;