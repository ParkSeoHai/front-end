const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// All cart routes require authentication
// router.use(verifyToken);

router.post('/create', cartController.create);
router.get('/:idUser', cartController.getCart);
router.post('/add', cartController.addProduct);
router.put('/quantity', cartController.updateQuantity);
router.delete('/remove/:idSanPham', cartController.removeProduct);
router.put('/discount', cartController.applyDiscount);
router.delete('/clear/:id', cartController.clearCart);
router.delete('/removeAll/:idSanPham', cartController.removeAllProduct);

module.exports = router;