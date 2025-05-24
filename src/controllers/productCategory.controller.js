const ProductCategory = require('../models/productCategory.model');
const generatePCId = require('../utils/generateId');
const fs = require('fs').promises;  // Add this
const path = require('path');       // Add this

const productCategoryController = {
  create: async (req, res) => {
    try {
      const categoryData = req.body;

      // Handle base64 image
      if (categoryData.HinhAnh) {
        const base64Data = categoryData.HinhAnh.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
    
        const uploadDir = path.join(__dirname, '../../public/uploads/categories');
        await fs.mkdir(uploadDir, { recursive: true });
    
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
        const filePath = path.join(uploadDir, uniqueFilename);
    
        await fs.writeFile(filePath, buffer);
        categoryData.HinhAnh = `/uploads/categories/${uniqueFilename}`;
      }

      const category = new ProductCategory({
        id: generatePCId('DM'),
        ...categoryData
      });

      await category.save();
      res.status(201).json({ 
        message: 'Tạo danh mục thành công', 
        category 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const query = {};

      if (search) {
        query.$or = [
          { TenDanhMuc: new RegExp(search, 'i') },
          { MoTa: new RegExp(search, 'i') }
        ];
      }

      const categories = await ProductCategory.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      // Add full image URLs
      const categoriesWithFullImageUrls = categories.map(category => {
        const categoryObj = category.toObject();
        if (categoryObj.HinhAnh) {
          categoryObj.HinhAnh = `http://https://back-end-gray-pi.vercel.app:8080${categoryObj.HinhAnh}`;
        }
        return categoryObj;
      });

      const total = await ProductCategory.countDocuments(query);

      res.json({
        categories: categoriesWithFullImageUrls,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const category = await ProductCategory.findOne({ id: req.params.id });
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }
      // Add full image URL
      const categoryObj = category.toObject();
      if (categoryObj.HinhAnh) {
        categoryObj.HinhAnh = `http://https://back-end-gray-pi.vercel.app:8080${categoryObj.HinhAnh}`;
      }
      res.json(categoryObj);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const categoryData = req.body;
      const existingCategory = await ProductCategory.findOne({ id: req.params.id });

      if (!existingCategory) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }

      // Handle base64 image
      if (categoryData.HinhAnh) {
        // If image is a new base64 string
        if (categoryData.HinhAnh.startsWith('data:image')) {
          // Delete old image if exists
          if (existingCategory.HinhAnh) {
            const oldImagePath = path.join(__dirname, '../../public', existingCategory.HinhAnh);
            await fs.unlink(oldImagePath).catch(console.error);
          }

          // Save new image
          const base64Data = categoryData.HinhAnh.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
      
          const uploadDir = path.join(__dirname, '../../public/uploads/categories');
          await fs.mkdir(uploadDir, { recursive: true });
      
          const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
          const filePath = path.join(uploadDir, uniqueFilename);
      
          await fs.writeFile(filePath, buffer);
          categoryData.HinhAnh = `/uploads/categories/${uniqueFilename}`;
        } else if (categoryData.HinhAnh.startsWith('http')) {
          // If it's an existing URL, remove the base URL
          categoryData.HinhAnh = categoryData.HinhAnh.replace('http://https://back-end-gray-pi.vercel.app:8080', '');
        }
      }

      const category = await ProductCategory.findOneAndUpdate(
        { id: req.params.id },
        categoryData,
        { new: true }
      );

      res.json({ 
        message: 'Cập nhật danh mục thành công', 
        category 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const category = await ProductCategory.findOne({ id: req.params.id });
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }

      // Delete associated image if exists
      if (category.HinhAnh) {
        const imagePath = path.join(__dirname, '../../public', category.HinhAnh);
        await fs.unlink(imagePath).catch(console.error);
      }

      await category.deleteOne();
      res.json({ message: 'Xóa danh mục thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productCategoryController;