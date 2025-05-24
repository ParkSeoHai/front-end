const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
router.use(verifyToken, verifyAdmin);

// Import/Export routes
router.post('/import', warehouseController.importStock);
router.post('/export', warehouseController.exportStock);
router.post('/import-receipt', warehouseController.createImportReceipt); // Add this line

// CRUD routes
router.get('/', warehouseController.getAll);
router.get('/:id', warehouseController.getById);
router.put('/update/:id', warehouseController.update);
router.delete('/delete/:id', warehouseController.delete);

module.exports = router;