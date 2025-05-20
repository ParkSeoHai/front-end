import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useWarehouse } from "../../../hooks/useWarehouse";
import { useProduct } from "../../../hooks/useProduct";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import viLocale from "date-fns/locale/vi";

const WarehouseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isImport = location.pathname.includes("/import");
  const isExport = location.pathname.includes("/export");
  const { handleExportStock,handleImportStock } = useWarehouse();
  const { products, handleFetchProducts } = useProduct();

  const [formData, setFormData] = useState({
    productId: "",
    importDate: isImport ? new Date() : null,
    exportDate: isExport ? new Date() : null,
    expiryDate: new Date(),
    quantity: 0,
    note: "",
  });

  const getFormTitle = () => {
    if (isImport) return "Nhập kho";
    if (isExport) return "Xuất kho";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let success;
      if (isImport) {
        success = await handleImportStock({
          SanPham: formData.productId,
          SoLuong: formData.quantity,
          NgayNhapKho: formData.importDate,
          GhiChu: formData.note
        });
      } else if (isExport) {
        success = await handleExportStock({
          SanPham: formData.productId,
          SoLuong: formData.quantity,
          NgayXuatKho: formData.exportDate,
          HanBanLoHang: formData.expiryDate,
          GhiChu: formData.note
        });
      }
      if (success) {
        navigate("/admin/warehouses");
      }
    } catch (error) {
      console.error("Error processing warehouse operation:", error);
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {getFormTitle()}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                required
                label="Sản phẩm"
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
                }
              >
                {products.map((product) => (
                  <MenuItem
                    key={product.idSanPham}
                    value={product.idSanPham}
                    selected={location.search.includes(product.idSanPham)}
                  >
                    {product.TenSanPham}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Số lượng"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
              />
            </Grid>

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={viLocale}
            >
              {isImport && (
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Ngày nhập kho"
                    value={formData.importDate}
                    onChange={(newValue) =>
                      setFormData({ ...formData, importDate: newValue })
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </Grid>
              )}

              {isExport  && (
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Ngày xuất kho"
                    value={formData.exportDate}
                    onChange={(newValue) =>
                      setFormData({ ...formData, exportDate: newValue })
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
              )}

              {isExport && (
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Hạn bán lô hàng"
                    value={formData.expiryDate}
                    onChange={(newValue) =>
                      setFormData({ ...formData, expiryDate: newValue })
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </Grid>
              )}
            </LocalizationProvider>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Ghi chú"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/warehouses")}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color={isImport ? "success" : isExport ? "primary" : "info"}
                >
                  {getFormTitle()}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default WarehouseForm;
