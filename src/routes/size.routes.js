const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/size.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
// router.use(verifyToken, verifyAdmin);

router.post('/create', sizeController.create);
router.get('/', sizeController.getAll);
router.get('/:id', sizeController.getById);
router.put('/update/:id', sizeController.update);
router.delete('/delete/:id', sizeController.delete);

module.exports = router;