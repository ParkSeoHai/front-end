export const validateProduct = (formData) => {
  const errors = {};

  // Required field validations
  if (!formData.TenSanPham?.trim()) {
    errors.TenSanPham = 'Tên sản phẩm không được để trống';
  }

  if (!formData.DanhMucSanPham?.id) {
    errors.DanhMucSanPham = 'Vui lòng chọn danh mục sản phẩm';
  }

  if (!formData.LoaiSanPham?.id) {
    errors.LoaiSanPham = 'Vui lòng chọn loại sản phẩm';
  }

  if (!formData.DonGia?.id) {
    errors.DonGia = 'Vui lòng chọn đơn giá';
  }

  if (!formData.Style?.id) {
    errors.Style = 'Vui lòng chọn style';
  }

  if (!formData.NhaCungCap?.idNhaCungCap) {
    errors.NhaCungCap = 'Vui lòng chọn nhà cung cấp';
  }

  if (!formData.GiaSanPham || formData.GiaSanPham <= 0) {
    errors.GiaSanPham = 'Giá sản phẩm phải lớn hơn 0';
  }

  if (!formData.SoLuong || formData.SoLuong < 0) {
    errors.SoLuong = 'Số lượng không được nhỏ hơn 0';
  }

  if (formData.MauSac?.length === 0) {
    errors.MauSac = 'Vui lòng thêm ít nhất một màu sắc';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};