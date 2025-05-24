const Supplier = require('../models/supplier.model');
const generateSupId = require('../utils/generateId');

const supplierController = {
  // Create new supplier
  create: async (req, res) => {
    try {
      const supplierData = req.body;
      const supplier = new Supplier({
        idNhaCungCap: generateSupId('NCC'),
        ...supplierData
      });

      await supplier.save();
      res.status(201).json({ 
        message: 'Tạo nhà cung cấp thành công', 
        supplier 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all suppliers with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { TenNhaCungCap: new RegExp(search, 'i') },
          { Email: new RegExp(search, 'i') },
          { SoDienThoai: new RegExp(search, 'i') }
        ];
      }

      const suppliers = await Supplier.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Supplier.countDocuments(query);

      res.json({
        suppliers,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get supplier by ID
  getById: async (req, res) => {
    try {
      const supplier = await Supplier.findOne({ idNhaCungCap: req.params.id });
      if (!supplier) {
        return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp' });
      }
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update supplier
  update: async (req, res) => {
    try {
      const supplier = await Supplier.findOneAndUpdate(
        { idNhaCungCap: req.params.id },
        req.body,
        { new: true }
      );

      if (!supplier) {
        return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp' });
      }

      res.json({ 
        message: 'Cập nhật nhà cung cấp thành công', 
        supplier 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete supplier
  delete: async (req, res) => {
    try {
      const supplier = await Supplier.findOneAndDelete({ idNhaCungCap: req.params.id });
      if (!supplier) {
        return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp' });
      }
      res.json({ message: 'Xóa nhà cung cấp thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = supplierController;