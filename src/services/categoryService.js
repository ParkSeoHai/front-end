const CATEGORIES_KEY = 'categories';

// Initial data if localStorage is empty
const initialCategories = [
  { MaMuc: "01", TenMuc: "C_NhaCungCap", TrangThai: "Active" },
  { MaMuc: "02", TenMuc: "C_DanhMucSanPham", TrangThai: "Active" },
  { MaMuc: "03", TenMuc: "C_KichThuoc", TrangThai: "Active" },
];

// Initialize localStorage with data if empty
if (!localStorage.getItem(CATEGORIES_KEY)) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
}

export const categoryService = {
  // Get all categories
  getAll: () => {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    return Promise.resolve(categories);
  },

  // Get category by ID
  getById: (id) => {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const category = categories.find(c => c.MaMuc === id);
    return Promise.resolve(category);
  },

  // Create new category
  create: (categoryData) => {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const newCategory = {
      ...categoryData,
      MaMuc: `${categories.length + 1}`.padStart(2, '0'),
      TrangThai: 'Active'
    };
    categories.push(newCategory);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    return Promise.resolve(newCategory);
  },

  // Update category
  update: (id, categoryData) => {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const index = categories.findIndex(c => c.MaMuc === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...categoryData };
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
      return Promise.resolve(categories[index]);
    }
    return Promise.reject(new Error('Category not found'));
  },

  // Delete category
  delete: (id) => {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const filteredCategories = categories.filter(c => c.MaMuc !== id);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filteredCategories));
    return Promise.resolve({ success: true });
  },

  // Search categories
  search: (searchTerm) => {
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const filteredCategories = categories.filter(c => 
      c.TenMuc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.MaMuc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return Promise.resolve(filteredCategories);
  }
};