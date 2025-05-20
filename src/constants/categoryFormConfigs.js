export const categoryFormConfigs = {
  C_DanhMucSanPham: [
    { id: 'id', label: 'Mã danh mục', field: 'id', hidden: true},
    { id: 'TenDanhMuc', label: 'Tên danh mục', field: 'TenDanhMuc', required: true },
    { id: 'MoTa', label: 'Mô tả', field: 'MoTa', multiline: true },
    { id: 'HinhAnh', label: 'Hình ảnh', field: 'HinhAnh', type: 'file' },
    { id: 'API', label: 'API', field: 'EndPoint', endpoint: 'categories', hidden: true },
    { id: 'DisplayName', label: 'Tên hiển thị', field: 'DisplayName', hidden: true, value: 'Danh mục sản phẩm' },
  ],
  C_KichThuoc: [
    { id: 'id', label: 'Mã kích thước', field: 'id', hidden: true},
    { id: 'TenKichThuoc', label: 'Kích thước', field: 'TenKichThuoc', required: true },
    { id: 'MoTa', label: 'Mô tả', field: 'MoTa', multiline: true },
    { id: 'API', label: 'API', field: 'EndPoint', endpoint: 'sizes', hidden: true},
    { id: 'DisplayName', label: 'Tên hiển thị', field: 'DisplayName', hidden: true, value: 'Kích thước' },
  ],
  C_LoaiSanPham: [
    { id: 'id', label: 'Mã loại sản phẩm', field: 'id', hidden: true},
    { id: 'TenLoaiSanPham', label: 'Tên loại sản phẩm', field: 'TenLoaiSanPham', required: true },
    { 
      id: 'DanhMucId', 
      label: 'Danh mục sản phẩm', 
      field: 'DanhMucSanPham', 
      type: 'select', 
      required: true, 
      reference: 'C_DanhMucSanPham', 
      displayField: 'TenDanhMuc',
      valueField: 'id',
      saveAsObject: true 
    },
    { id: 'API', label: 'API', field: 'EndPoint', endpoint: 'product-types', hidden: true},
    { id: 'DisplayName', label: 'Tên hiển thị', field: 'DisplayName', hidden: true, value: 'Loại sản phẩm' },
  ],
  C_DonGia: [
    { id: 'id', label: 'Mã đơn giá', field: 'id', hidden: true},
    { id: 'TenDonGia', label: 'Tên đơn giá', field: 'TenDonGia', required: true },
    { id: 'API', label: 'API', field: 'EndPoint', endpoint: 'prices', hidden: true},
    { id: 'DisplayName', label: 'Tên hiển thị', field: 'DisplayName', hidden: true, value: 'Đơn giá' },
  ],
  C_Style: [
    { id: 'id', label: 'Mã style', field: 'id', hidden: true},
    { id: 'TenStyle', label: 'Tên style', field: 'TenStyle', required: true },
    { id: 'HinhAnh', label: 'Ảnh minh họa', field: 'HinhAnh', type: 'file' },
    { id: 'API', label: 'API', field: 'EndPoint', endpoint: 'styles', hidden: true},
    { id: 'DisplayName', label: 'Tên hiển thị', field: 'DisplayName', hidden: true, value: 'Style' },
  ]
};