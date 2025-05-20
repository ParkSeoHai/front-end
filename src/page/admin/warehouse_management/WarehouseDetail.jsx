import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWarehouse } from '../../../hooks/useWarehouse';

const WarehouseDetail = () => {
  const { id } = useParams();
  const { selectedWarehouse, handleFetchWarehouseById } = useWarehouse();

  useEffect(() => {
    handleFetchWarehouseById(id);
  }, [id]);

  if (!selectedWarehouse) return <Box>Loading...</Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Chi tiết phiếu kho
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Mã phiếu</Typography>
            <Typography>{selectedWarehouse.id}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Sản phẩm</Typography>
            <Typography>{selectedWarehouse.SanPham?.TenSanPham}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Ngày nhập kho</Typography>
            <Typography>
              {new Date(selectedWarehouse.NgayNhapKho).toLocaleDateString('vi-VN')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Ngày xuất kho</Typography>
            <Typography>
              {selectedWarehouse.NgayXuatKho 
                ? new Date(selectedWarehouse.NgayXuatKho).toLocaleDateString('vi-VN')
                : 'Chưa xuất kho'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Hạn bán lô hàng</Typography>
            <Typography>
              {new Date(selectedWarehouse.HanBanLoHang).toLocaleDateString('vi-VN')}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default WarehouseDetail;