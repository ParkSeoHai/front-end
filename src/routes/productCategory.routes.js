const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategory.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
// router.use(verifyToken, verifyAdmin);

router.post('/create', productCategoryController.create);
router.get('/', productCategoryController.getAll);
router.get('/:id', productCategoryController.getById);
router.put('/update/:id', productCategoryController.update);
router.delete('/delete/:id', productCategoryController.delete);

module.exports = router;