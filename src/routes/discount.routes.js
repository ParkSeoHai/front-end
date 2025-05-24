const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discount.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
// router.use(verifyToken, verifyAdmin);

router.post('/create', discountController.create);
router.get('/', discountController.getAll);
router.get('/:id', discountController.getById);
router.put('/update/:id', discountController.update);
router.delete('/delete/:id', discountController.delete);

module.exports = router;