const express = require('express');
const router = express.Router();
const productTypeController = require('../controllers/productType.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
// router.use(verifyToken, verifyAdmin);

router.post('/create', productTypeController.create);
router.get('/', productTypeController.getAll);
router.get('/:id', productTypeController.getById);
router.put('/update/:id', productTypeController.update);
router.delete('/delete/:id', productTypeController.delete);

module.exports = router;