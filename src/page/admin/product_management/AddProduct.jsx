import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useProduct } from "../../../hooks/useProduct";

const AddProduct = () => {
  const navigate = useNavigate();
  const {
    productTypes,
    prices,
    categories,
    styles,
    suppliers,
    loading,
    error,
    fetchAllData,
  } = useProduct();

  const [formData, setFormData] = useState({
    TenSanPham: "",
    DanhMucSanPham: { id: "", TenDanhMuc: "" },
    LoaiSanPham: { id: "", TenLoaiSanPham: "" },
    DonGia: { id: "", TenDonGia: "" },
    Style: { id: "", TenStyle: "", HinhAnh: "" },
    NhaCungCap: {
      idNhaCungCap: "",
      TenNhaCungCap: "",
      Email: "",
      SoDienThoai: "",
      DiaChi: "",
      MoTa: "",
    },
    GiaSanPham: "",
    SoLuong: null,
    MoTa: "",
    MauSac: [],
    TrangThai: "available",
    DanhGia: "",
    HinhAnh: [],
    YeuThich: [],
  });

  const [filteredProductTypes, setFilteredProductTypes] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (formData.DanhMucSanPham.id) {
      const filtered = productTypes.filter(
        type => type.DanhMucSanPham.id === formData.DanhMucSanPham.id
      );
      setFilteredProductTypes(filtered);
      setFormData(prev => ({
        ...prev,
        LoaiSanPham: { id: "", TenLoaiSanPham: "" }
      }));
    }
  }, [formData.DanhMucSanPham.id, productTypes]);

  const { handleCreateProduct } = useProduct();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [newColor, setNewColor] = useState({ MaMau: '', TenMau: '' });

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5;
    const selectedFiles = files.slice(0, maxFiles);

    setSelectedFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newUrls]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        HinhAnh: selectedFiles,
      };
      const success = await handleCreateProduct(productData);
      if (success) {
        previewUrls.forEach((url) => URL.revokeObjectURL(url));
        alert("Thêm sản phẩm thành công!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm!");
    }
  };
  const handleAddColor = () => {
    if (newColor.MaMau && newColor.TenMau) {
      setFormData({
        ...formData,
        MauSac: [...formData.MauSac, newColor]
      });
    }
  };
  
  const handleRemoveColor = (index) => {
    setFormData({
      ...formData,
      MauSac: formData.MauSac.filter((_, i) => i !== index)
    });
  };
  return (
    <>
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          borderRadius: "4px 4px 0 0",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InventoryIcon />
          <Typography variant="h5">Thêm sản phẩm mới</Typography>
        </Box>
      </Box>

      <Paper sx={{ mt: 2, p: 3 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>Đang tải dữ liệu...</Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 3, color: "error.main" }}>
            {error}
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <TextField
                required
                fullWidth
                label="Tên sản phẩm"
                value={formData.TenSanPham}
                onChange={(e) =>
                  setFormData({ ...formData, TenSanPham: e.target.value })
                }
              />

              <FormControl fullWidth>
                <InputLabel>Danh mục sản phẩm</InputLabel>
                <Select
                  value={formData.DanhMucSanPham.id}
                  label="Danh mục sản phẩm"
                  onChange={(e) => {
                    const selectedCategory = categories?.find(
                      (cat) => cat.id === e.target.value
                    );
                    if (selectedCategory) {
                      setFormData({
                        ...formData,
                        DanhMucSanPham: {
                          id: selectedCategory.id,
                          TenDanhMuc: selectedCategory.TenDanhMuc,
                        },
                      });
                    }
                  }}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.TenDanhMuc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Loại sản phẩm</InputLabel>
                <Select
                  value={formData.LoaiSanPham.id}
                  label="Loại sản phẩm"
                  onChange={(e) => {
                    const selectedType = filteredProductTypes.find(
                      (type) => type.id === e.target.value
                    );
                    if (selectedType) {
                      setFormData({
                        ...formData,
                        LoaiSanPham: {
                          id: selectedType.id,
                          TenLoaiSanPham: selectedType.TenLoaiSanPham,
                        },
                      });
                    }
                  }}
                  disabled={!formData.DanhMucSanPham.id}
                >
                  {filteredProductTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.TenLoaiSanPham}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Đơn giá</InputLabel>
                <Select
                  value={formData.DonGia.id}
                  label="Đơn giá"
                  onChange={(e) => {
                    const selectedPrice = prices.find(
                      (price) => price.id === e.target.value
                    );
                    if (selectedPrice) {
                      setFormData({
                        ...formData,
                        DonGia: {
                          id: selectedPrice.id,
                          TenDonGia: selectedPrice.TenDonGia,
                        },
                      });
                    }
                  }}
                >
                  {prices.map((price) => (
                    <MenuItem key={price.id} value={price.id}>
                      {price.TenDonGia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Style</InputLabel>
                <Select
                  value={formData.Style.id}
                  label="Style"
                  onChange={(e) => {
                    const selectedStyle = styles.find(
                      (style) => style.id === e.target.value
                    );
                    if (selectedStyle) {
                      setFormData({
                        ...formData,
                        Style: {
                          id: selectedStyle.id,
                          TenStyle: selectedStyle.TenStyle,
                          HinhAnh: selectedStyle.HinhAnh,
                        },
                      });
                    }
                  }}
                >
                  {styles.map((style) => (
                    <MenuItem key={style.id} value={style.id}>
                      {style.TenStyle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Nhà cung cấp</InputLabel>
                <Select
                  value={formData.NhaCungCap.idNhaCungCap}
                  label="Nhà cung cấp"
                  onChange={(e) => {
                    const selectedSupplier = suppliers.find(
                      (sup) => sup.idNhaCungCap === e.target.value
                    );
                    if (selectedSupplier) {
                      setFormData({
                        ...formData,
                        NhaCungCap: {
                          idNhaCungCap: selectedSupplier.idNhaCungCap,
                          TenNhaCungCap: selectedSupplier.TenNhaCungCap,
                          Email: selectedSupplier.Email,
                          SoDienThoai: selectedSupplier.SoDienThoai,
                          DiaChi: selectedSupplier.DiaChi,
                          MoTa: selectedSupplier.MoTa,
                        },
                      });
                    }
                  }}
                >
                  {suppliers.map((supplier) => (
                    <MenuItem
                      key={supplier.idNhaCungCap}
                      value={supplier.idNhaCungCap}
                    >
                      {supplier.TenNhaCungCap}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                type="number"
                label="Giá sản phẩm"
                value={formData.GiaSanPham}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    GiaSanPham: Number(e.target.value),
                  })
                }
              />
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Số lượng"
                  value={formData.SoLuong}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setFormData({
                      ...formData,
                      SoLuong: newValue,
                      TrangThai: newValue > 0 ? "available" : "outOfStock",
                    });
                  }}
                />
                 <FormControl fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    value={formData.TrangThai}
                    label="Trạng thái"
                    onChange={(e) =>
                      setFormData({ ...formData, TrangThai: e.target.value })
                    }
                  >
                    <MenuItem value="available">Đang bán</MenuItem>
                    <MenuItem value="outOfStock">Hết hàng</MenuItem>
                    <MenuItem value="discontinued">Ngừng kinh doanh</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ gridColumn: "span 2" }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Màu sắc:</Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    bgcolor: '#fafafa'
                  }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
                        <TextField
                          size="small"
                          type="color"
                          label="Mã màu"
                          value={newColor.MaMau}
                          onChange={(e) => setNewColor({ ...newColor, MaMau: e.target.value })}
                          sx={{ width: '120px' }}
                        />
                        <TextField
                          size="small"
                          label="Tên màu"
                          value={newColor.TenMau}
                          onChange={(e) => setNewColor({ ...newColor, TenMau: e.target.value })}
                          sx={{ flex: 1 }}
                          placeholder="Ví dụ: Đỏ, Xanh, Vàng..."
                        />
                      </Box>
                      <Button
                        variant="contained"
                        onClick={handleAddColor}
                        disabled={!newColor.MaMau || !newColor.TenMau}
                        size="medium"
                        sx={{ minWidth: '100px' }}
                      >
                        Thêm màu
                      </Button>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1,
                      minHeight: '50px',
                      p: formData.MauSac.length > 0 ? 2 : 0,
                      bgcolor: formData.MauSac.length > 0 ? '#fff' : 'transparent',
                      borderRadius: 1,
                      border: formData.MauSac.length > 0 ? '1px dashed #e0e0e0' : 'none'
                    }}>
                      {formData.MauSac.map((color, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: '#fff',
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            p: 1,
                            pr: 0.5
                          }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: color.MaMau,
                              borderRadius: '50%',
                              border: '1px solid #ddd'
                            }}
                          />
                          <Typography variant="body2" sx={{ mx: 1 }}>{color.TenMau}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveColor(index)}
                            sx={{ 
                              '&:hover': { 
                                color: 'error.main',
                                bgcolor: 'error.lighter'
                              }
                            }}
                          >
                            <CloseOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Mô tả"
                value={formData.MoTa}
                onChange={(e) =>
                  setFormData({ ...formData, MoTa: e.target.value })
                }
                sx={{ gridColumn: "span 2" }}
              />

              <Box sx={{ gridColumn: "span 2" }}>
                <input
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                  id="product-images"
                />
                <label htmlFor="product-images">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mb: 2 }}
                    startIcon={<CloudUploadOutlinedIcon />}
                  >
                    Chọn hình ảnh ({selectedFiles.length}/5)
                  </Button>
                </label>

                {previewUrls.length > 0 && (
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                  >
                    {previewUrls.map((url, index) => (
                      <Box key={index} sx={{ position: "relative" }}>
                        <Box
                          component="img"
                          src={url}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            bgcolor: "background.paper",
                            "&:hover": {
                              bgcolor: "error.light",
                              color: "white",
                            },
                          }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <CloseOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/admin/products")}
              >
                Quay lại
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Lưu
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </>
  );
};

export default AddProduct;
