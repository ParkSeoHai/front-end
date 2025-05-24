const express = require('express');
const router = express.Router();
const styleController = require('../controllers/style.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');

// All routes require authentication and admin privileges
// router.use(verifyToken, verifyAdmin);

// CRUD routes
router.post('/create', styleController.create);
router.get('/', styleController.getAll);
router.get('/:id', styleController.getById);
router.put('/update/:id', styleController.update);
router.delete('/delete/:id', styleController.delete);

module.exports = router;