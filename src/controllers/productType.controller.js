const ProductType = require('../models/productType.model');
const generatePTId = require('../utils/generateId');

const productTypeController = {
  // Create new product type
  create: async (req, res) => {
    try {
      const typeData = req.body;
      console.log(typeData);
      const productType = new ProductType({
        id: generatePTId('LSP'),
        ...typeData
      });

      await productType.save();
      res.status(201).json({ 
        message: 'Tạo loại sản phẩm thành công', 
        productType 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all product types with pagination and search
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.TenLoaiSanPham = new RegExp(search, 'i');
      }

      const productTypes = await ProductType.find(query)

      const total = await ProductType.countDocuments(query);

      res.json({
        'product-types': productTypes,
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get product type by ID
  getById: async (req, res) => {
    try {
      const productType = await ProductType.findOne({ id: req.params.id });
      if (!productType) {
        return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
      }
      res.json(productType);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update product type
  update: async (req, res) => {
    console.log(req.body);
    try {
      const productType = await ProductType.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );
      
      if (!productType) {
        return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
      }
      
      res.json({ 
        message: 'Cập nhật loại sản phẩm thành công', 
        productType 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete product type
  delete: async (req, res) => {
    try {
      const productType = await ProductType.findOneAndDelete({ id: req.params.id });
      if (!productType) {
        return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
      }
      res.json({ message: 'Xóa loại sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productTypeController;