const express = require('express');
const router = express.Router();
const priceController = require('../controllers/price.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
// router.use(verifyToken, verifyAdmin);

router.post('/create', priceController.create);
router.get('/', priceController.getAll);
router.get('/:id', priceController.getById);
router.put('/update/:id', priceController.update);
router.delete('/delete/:id', priceController.delete);

module.exports = router;