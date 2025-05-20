import {
  Box,
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProduct } from "../../../hooks/useProduct";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const { products, isLoading, error, handleFetchProducts, handleDeleteProduct } = useProduct();

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      available: "#66bb6a",
      outOfStock: "#ff9800",
      discontinued: "#ef5350",
    };
    return colors[status] || "#757575";
  };

  const handleDeleteClick = (productId) => {
    setSelectedId(productId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const success = await handleDeleteProduct(selectedId);
      if (success) {
        handleFetchProducts();
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const filteredProducts = products?.filter(product => {
    const matchesSearch = searchTerm.trim() === '' || 
      product.TenSanPham.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.idSanPham.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || product.TrangThai === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil((filteredProducts?.length || 0) / rowsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          borderRadius: "4px 4px 0 0",
          borderBottom: "1px solid #e0e0e0",
          mb: 2,
        }}
      >
        <Typography variant="h5">Danh sách sản phẩm</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />
              }}
              sx={{ width: 250 }}
            />
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: 150 }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="available">Đang bán</MenuItem>
              <MenuItem value="outOfStock">Hết hàng</MenuItem>
              <MenuItem value="discontinued">Ngừng kinh doanh</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/products/add")}
          >
            Thêm sản phẩm
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: "#f8f9fa" }}>
              <TableRow>
                <TableCell>Mã SP</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Giá bán</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts?.map((product) => (
                <TableRow key={product.idSanPham}>
                  <TableCell>{product.idSanPham}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={`${product.HinhAnh[0]}`}
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                      {product.TenSanPham}
                    </Box>
                  </TableCell>
                  <TableCell>{product.DanhMucSanPham?.TenDanhMuc}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.GiaSanPham)}
                  </TableCell>
                  <TableCell>{product.SoLuong}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: getStatusColor(product.TrangThai) + "20",
                        color: getStatusColor(product.TrangThai),
                        py: 0.5,
                        px: 1.5,
                        borderRadius: 1,
                        display: "inline-block",
                        fontSize: "0.875rem",
                      }}
                    >
                      {product.TrangThai === "available"
                        ? "Đang bán"
                        : product.TrangThai === "outOfStock"
                        ? "Hết hàng"
                        : "Ngừng kinh doanh"}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(`/admin/products/edit/${product.idSanPham}`)
                      }
                      sx={{ mr: 1 }}
                    >
                      <EditIcon fontSize="small" sx={{ color: "#66bb6a" }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(product.idSanPham)}
                    >
                      <DeleteIcon fontSize="small" sx={{ color: "#f44336" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {!isLoading && filteredProducts?.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa sản phẩm này không?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductManagement;
