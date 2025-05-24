const mongoose = require('mongoose');
const Product = require('../models/product.model');
const ProductType = require('../models/productType.model');
const ProductCategory = require('../models/productCategory.model');
const Price = require('../models/price.model');
const Size = require('../models/size.model');
const Style = require('../models/style.model');
const Supplier = require('../models/supplier.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await Product.deleteMany({});

      // Get references from all related collections
      const productType = await ProductType.findOne({ id: 'LSP001' });
      const category = await ProductCategory.findOne({ id: 'DM001' });
      const price = await Price.findOne({ id: 'DG001' });
      const size = await Size.findOne({ id: 'KT001' });
      const style = await Style.findOne({ id: 'ST001' });
      const supplier = await Supplier.findOne({ idNhaCungCap: 'NCC001' });

      if (!productType || !category || !price || !size || !style || !supplier) {
        throw new Error('Please create all required category data first');
      }

      const testProducts = [
        {
          idSanPham: 'SP001',
          TenSanPham: 'Áo Thun Nam Basic',
          LoaiSanPham: {
            id: productType.id,
            TenLoaiSanPham: productType.TenLoaiSanPham
          },
          DanhMuc: {
            id: category.id,
            TenDanhMuc: category.TenDanhMuc,
            MoTa: category.MoTa,
            HinhAnh: category.HinhAnh
          },
          DonGia: {
            id: price.id,
            TenDonGia: price.TenDonGia
          },
          KichThuoc: {
            id: size.id,
            TenKichThuoc: size.TenKichThuoc,
            MoTa: size.MoTa
          },
          Style: {
            id: style.id,
            TenStyle: style.TenStyle,
            HinhAnh: style.HinhAnh
          },
          NhaCungCap: {
            idNhaCungCap: supplier.idNhaCungCap,
            TenNhaCungCap: supplier.TenNhaCungCap,
            Email: supplier.Email,
            SoDienThoai: supplier.SoDienThoai,
            DiaChi: supplier.DiaChi,
            MoTa: supplier.MoTa,
            SanPhamCungCap: supplier.SanPhamCungCap
          },
          GiaSanPham: 299000,
          SoLuong: 100,
          MoTa: 'Áo thun nam cổ tròn basic',
          MauSac: 'Đen',
          TrangThai: 'available',
          DanhGia: '4.5',
          HinhAnh: [
            'https://example.com/images/ao-thun-den-1.jpg',
            'https://example.com/images/ao-thun-den-2.jpg'
          ],
          YeuThich: false
        },
        {
          idSanPham: 'SP002',
          TenSanPham: 'Quần Jean Nam Slim Fit',
          LoaiSanPham: productType.id,
          DanhMuc: category.id,
          DonGia: price.id,
          KichThuoc: size.id,
          Style: style.id,
          NhaCungCap: supplier.idNhaCungCap,
          GiaSanPham: 599000,
          SoLuong: 50,
          MoTa: 'Quần jean nam ống đứng',
          MauSac: 'Xanh đậm',
          TrangThai: 'available',
          DanhGia: '4.8',
          HinhAnh: [
            'https://example.com/images/quan-jean-1.jpg',
            'https://example.com/images/quan-jean-2.jpg'
          ],
          YeuThich: true
        }
      ];

      await Product.insertMany(testProducts);
      console.log('Test products created successfully');
    } catch (error) {
      console.error('Error creating products:', error);
    } finally {
      await mongoose.connection.close();
    }
  });