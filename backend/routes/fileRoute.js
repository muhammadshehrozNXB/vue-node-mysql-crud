// backend/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Routes
router.post('/', fileController.uploadFile);
router.get('/', fileController.getFiles);
router.delete('/:id', fileController.deleteFile);
router.put('/:id', fileController.updateFile);

module.exports = router;
