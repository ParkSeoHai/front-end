const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
// router.use(verifyToken, verifyAdmin);

router.post('/create', supplierController.create);
router.get('/', supplierController.getAll);
router.get('/:id', supplierController.getById);
router.put('/update/:id', supplierController.update);
router.delete('/delete/:id', supplierController.delete);

module.exports = router;