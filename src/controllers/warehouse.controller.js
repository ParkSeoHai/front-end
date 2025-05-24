const Warehouse = require('../models/warehouse.model');
const Product = require('../models/product.model');
const generateWarehouseId = require('../utils/generateId');

const warehouseController = {
  // Import stock
  importStock: async (req, res) => {
    try {
      const { SanPham, SoLuong, NgayNhapKho, HanBanLoHang } = req.body;
      const product = await Product.findOne({ idSanPham: SanPham });
      // In importStock function
      const warehouse = new Warehouse({
        id: generateWarehouseId('WH'),
        SanPham: product.toObject(), // Store full product object
        NgayNhapKho: NgayNhapKho || new Date(),
        SoLuong
      });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      // Increase product quantity
      product.SoLuong = (product.SoLuong || 0) + SoLuong;
      await product.save();
      await warehouse.save();

      res.status(201).json({ 
        message: 'Nhập kho thành công', 
        warehouse,
        product: {
          idSanPham: product.idSanPham,
          TenSanPham: product.TenSanPham,
          SoLuong: product.SoLuong
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Export stock
  exportStock: async (req, res) => {
    try {
        
        const { SanPham, SoLuong, NgayXuatKho,HanBanLoHang } = req.body;

      const product = await Product.findOne({ idSanPham: SanPham });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      if (product.SoLuong < SoLuong) {
        return res.status(400).json({ message: 'Số lượng xuất kho vượt quá số lượng tồn kho' });
      }

      // In exportStock function
      const warehouse = new Warehouse({
        id: generateWarehouseId('WH'),
        SanPham: product.toObject(), 
        NgayXuatKho: NgayXuatKho || new Date(),
        SoLuong: -SoLuong,
        HanBanLoHang
      });

      // Decrease product quantity
      product.SoLuong -= SoLuong;
      await product.save();
      await warehouse.save();

      res.status(201).json({ 
        message: 'Xuất kho thành công', 
        warehouse,
        product: {
          idSanPham: product.idSanPham,
          TenSanPham: product.TenSanPham,
          SoLuong: product.SoLuong
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all warehouse entries
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        const products = await Product.find({ 
          TenSanPham: new RegExp(search, 'i') 
        });
        const productIds = products.map(p => p._id);
        query.SanPham = { $in: productIds };
      }

      const warehouses = await Warehouse.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Warehouse.countDocuments(query);

      res.json({
        warehouses,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get warehouse entry by ID
  getById: async (req, res) => {
    try {
      const warehouse = await Warehouse.findOne({ id: req.params.id })
        .populate('SanPham', ['idSanPham', 'TenSanPham', 'SoLuong']);

      if (!warehouse) {
        return res.status(404).json({ message: 'Không tìm thấy phiếu kho' });
      }

      res.json(warehouse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update warehouse entry
  update: async (req, res) => {
    try {
      const warehouse = await Warehouse.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      ).populate('SanPham', ['idSanPham', 'TenSanPham', 'SoLuong']);

      if (!warehouse) {
        return res.status(404).json({ message: 'Không tìm thấy phiếu kho' });
      }

      res.json({ 
        message: 'Cập nhật phiếu kho thành công', 
        warehouse 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete warehouse entry
  delete: async (req, res) => {
    try {
      const warehouse = await Warehouse.findOneAndDelete({ id: req.params.id });
      
      if (!warehouse) {
        return res.status(404).json({ message: 'Không tìm thấy phiếu kho' });
      }

      // If it's an import record, decrease the product quantity
      if (!warehouse.NgayXuatKho) {
        const product = await Product.findOne({ idSanPham: warehouse.SanPham });
        if (product) {
          product.SoLuong -= warehouse.SoLuong;
          await product.save();
        }
      }

      res.json({ 
        message: 'Xóa phiếu kho thành công',
        id: warehouse.id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create import receipt
  createImportReceipt: async (req, res) => {
    try {
      const { productId, quantity, importDate, expiryDate, note } = req.body;

      // Change this line to use idSanPham instead of _id
      const product = await Product.findOne({ idSanPham: productId });
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }

      // In createImportReceipt function
      const warehouse = new Warehouse({
        id: generateWarehouseId('WH'),
        SanPham: product.toObject(), // Store full product object
        NgayNhapKho: importDate || new Date(),
        HanBanLoHang: expiryDate,
        SoLuong: quantity,
        GhiChu: note
      });

      // Update product quantity
      product.SoLuong = (product.SoLuong || 0) + quantity;
      await product.save();
      await warehouse.save();

      res.status(201).json({
        message: 'Tạo phiếu nhập kho thành công',
        warehouse: await warehouse.populate('SanPham', ['idSanPham', 'TenSanPham', 'SoLuong'])
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = warehouseController;