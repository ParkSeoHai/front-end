import { 
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem, 
  Pagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { categoryFormConfigs } from '../../../constants/categoryFormConfigs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category;

  // State definitions
  const [items, setItems] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [referenceData, setReferenceData] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Constants
  const formFields = category ? categoryFormConfigs[category.TenMuc] : [];
  const visibleFields = formFields.filter(field => !field.hidden);
  const BASE_URL = 'https://back-end-gray-pi.vercel.app/';
  const API_ENDPOINT = category ? `${BASE_URL}/api/${category.endpoint}` : '';

  // Handlers
  const clearFileSelection = () => {
    if (selectedFile) {
      setSelectedFile(null);
      setPreviewUrl(null);
      handleInputChange('HinhAnh', null);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
    console.log('Form data:', formData);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({});
  };

  const handleEdit = (item) => {
    setIsAdding(false);
    setEditingId(item.id);
    
    const editData = {};
    formFields.forEach(field => {
      if (!field.hidden) {
        if (field.field === 'id' && !item[field.field]) {
          editData[field.field] = item.id;
        } else if (field.type === 'select' && field.reference === 'C_DanhMuc') {
          editData[field.field] = item.DanhMucSanPham;
        } else {
          editData[field.field] = item[field.field];
        }
      }
    });
    
    setFormData(editData);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
    setError(null);
  };

  const handleBack = () => {
    navigate('/admin/categories');
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(API_ENDPOINT, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setItems(response.data[`${category.endpoint}`]);
    } catch (err) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };
  const fetchReferenceData = async (referenceConfig) => {
    try {
      const token = localStorage.getItem('adminToken');
      const refEndpoint = categoryFormConfigs[referenceConfig.reference].find(
        field => field.id === 'API'
      ).endpoint;
      
      const response = await axios.get(`${BASE_URL}/api/${refEndpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if(referenceConfig.reference){
        setReferenceData(prev => ({
          ...prev,
          [referenceConfig.reference]: response.data[refEndpoint]
        }));
      }
    } catch (error) {
      console.error('Error fetching reference data:', error);
    }
  };

  // Thêm useEffect này để theo dõi thay đổi của referenceData
  useEffect(() => {
  }, [referenceData]);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('HinhAnh', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
  
      const submitData = { ...formData };
  
      if (isAdding) {
        await axios.post(`${API_ENDPOINT}/create`, submitData, config);
      } else {
        await axios.put(`${API_ENDPOINT}/update/${editingId}`, submitData, config);
      }
      
      fetchItems();
      handleCancel();
      setPreviewUrl(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_ENDPOINT}/delete/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchItems();
      formFields.forEach(field => {
        if (field.type === 'select' && field.reference) {
          fetchReferenceData(field);
        }
      });
    }
  }, [category]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
      // Tính toán phân trang
  const totalPages = Math.ceil((items?.length || 0) / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedItems = items?.slice(startIndex, startIndex + rowsPerPage);

  // Xử lý thay đổi trang
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số hàng mỗi trang
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };
  return (
    <>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: '4px 4px 0 0', borderBottom: '1px solid #e0e0e0', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">
            {category ? `Chi tiết danh mục: ${category.TenMuc.replace('C_', '')}` : 'Chi tiết danh mục'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleAdd}
            disabled={isAdding || loading}
          >
            Thêm mới
          </Button>
        </Box>

        {(isAdding || editingId) && (
          <Box component="form" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {isAdding ? 'Thêm mới' : 'Chỉnh sửa'}
            </Typography>
            
            {formFields.filter(item => !item.hidden).map((field, index) => (
              field.type === 'file' ? (
                <Box key={index} sx={{ mb: 2 }}>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="category-image"
                  />
                  <label htmlFor="category-image">
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      sx={{ mb: 2 }}
                      startIcon={<CloudUploadOutlinedIcon />}
                    >
                      Chọn hình ảnh {selectedFile ? '(1/1)' : '(0/1)'}
                    </Button>
                  </label>
                  
                  {previewUrl && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={previewUrl}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                            borderRadius: 1
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -10,
                            right: -10,
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'error.light', color: 'white' }
                          }}
                          onClick={clearFileSelection}
                        >
                          <CloseOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              ): field.type === 'select' ? (
                <TextField
                  key={index}
                  select
                  fullWidth
                  label={field.label}
                  value={formData[field.field]?.id || ''}
                  onChange={(e) => {
                    const selectedOption = referenceData[field.reference]?.find(
                      option => option.id === e.target.value
                    );
                    handleInputChange(field.field, selectedOption);
                  }}
                  required={field.required}
                  error={error && !formData[field.field] && field.required}
                  helperText={error && !formData[field.field] && field.required ? 'Trường này là bắt buộc' : ''}
                  sx={{ mb: 2 }}
                >
                  {referenceData[field.reference]?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option[field.displayField]}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  key={index}
                  fullWidth
                  label={field.label}
                  value={formData[field.field] || ''}
                  onChange={(e) => handleInputChange(field.field, e.target.value)}
                  required={field.required}
                  type={field.type || 'text'}
                  multiline={field.multiline}
                  rows={field.multiline ? 4 : 1}
                  error={error && !formData[field.field] && field.required}
                  helperText={error && !formData[field.field] && field.required ? 'Trường này là bắt buộc' : ''}
                  sx={{ mb: 2 }}
                />
              )
            ))}

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </Box>
          </Box>
        )}

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                {visibleFields.map((field, index) => (
                  <TableCell key={index}>{field.label}</TableCell>
                ))}
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={visibleFields.length + 1} align="center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : items?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleFields.length + 1} align="center">
                    Chưa có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                paginatedItems?.map((item, itemIndex) => (
                  <TableRow key={itemIndex}>
                    {visibleFields.map((field, fieldIndex) => (
                      <TableCell key={`${itemIndex}-${fieldIndex}`}>
                        {field.type === 'file' ? (
                          item[field.field] ? (
                            <Box
                              component="img"
                              src={`${item[field.field]}`}
                              sx={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: 1
                              }}
                            />
                          ) : (
                            'Chưa có hình ảnh'
                          )
                        ):field.type === 'select' ? (
                          referenceData[field.reference]?.find(
                            ref => ref.id === item.DanhMucSanPham?.id  // Changed to access nested DanhMucSanPham object
                          )?.[field.displayField] || 'N/A'
                        ) : (
                          item[field.field]
                        )}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(item)}
                        disabled={isAdding || loading}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                      >
                        <DeleteIcon fontSize="small" />
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
            Tổng số: {items?.length || 0} mục
          </Typography>
        </Box>
        <Pagination 
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          size="small"
          shape="rounded"
          showFirstButton 
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#666',
              bgcolor: '#fff',
              border: '1px solid #ddd',
              margin: '0 2px',
              '&.Mui-selected': {
                bgcolor: '#1976d2',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#1565c0'
                }
              },
              '&:hover': {
                bgcolor: '#f5f5f5'
              }
            },
            '& .MuiPaginationItem-page': {
              minWidth: '32px',
              height: '32px'
            }
          }}
        />
      </Box>
        {error && !error.includes('bắt buộc') && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CategoryDetail;