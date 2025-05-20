

import { 
  Box, Typography, TextField, IconButton, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Pagination 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import { categoryFormConfigs } from '../../../constants/categoryFormConfigs';
import { useNavigate } from 'react-router-dom';

const CategoryManagement = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  // Thay đổi fetchCategories để tạo dữ liệu từ categoryFormConfigs
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesList = Object.keys(categoryFormConfigs).map(key => {
        const apiField = categoryFormConfigs[key].find(field => field.id === 'API');
        return {
          MaMuc: key,
          TenMuc: key,
          MoTa: `Danh mục ${key.replace('C_', '')}`,
          endpoint: apiField?.endpoint || key.toLowerCase()
        };
      });
      setCategories(categoriesList);
    } catch (err) {
      setError('Không thể tải danh sách danh mục');
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Tối ưu hóa hàm lọc dữ liệu
  const filteredData = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return categories.filter(item =>
      item.TenMuc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.MoTa.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Xử lý thay đổi trang
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số hàng mỗi trang
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  // Replace modal handling with navigation
  const handleViewCategory = (category) => {
    navigate(`/admin/categories/${category.MaMuc}`, { state: { category } });
  };

  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0', mb: 2 }}>
        <Typography variant="h5">Danh sách danh mục</Typography>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <TextField 
            size="small"
            placeholder="Tìm kiếm danh mục"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
            sx={{ 
              width: 250,
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                height: '36px',
                bgcolor: '#f8f9fa'
              }
            }}
          />
        </Box>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Mã danh mục</TableCell>
                <TableCell align="center">Tên danh mục</TableCell>
                <TableCell align="center">Số trường dữ liệu</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Đang tải...</TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Không có dữ liệu</TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.MaMuc}</TableCell>
                    <TableCell align="center">{row.MaMuc.replace('C_', '')}</TableCell>
                    <TableCell align="center">{categoryFormConfigs[row.MaMuc].length} trường</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewCategory(row)}
                      >
                        <VisibilityIcon fontSize="small" sx={{ color: '#1976d2' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Số hàng mỗi trang:
            </Typography>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              style={{ 
                padding: '4px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <Typography variant="body2" color="text.secondary">
              Tổng số: {filteredData.length} danh mục
            </Typography>
          </Box>
          <Pagination 
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            size="small"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#666',
                '&.Mui-selected': {
                  bgcolor: '#1976d2',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#1565c0'
                  }
                }
              }
            }}
          />
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CategoryManagement;