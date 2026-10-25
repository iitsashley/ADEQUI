const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/historyController');

// Get all history
router.get('/', HistoryController.getAllHistory);

// Get history event by ID
router.get('/:id', HistoryController.getHistoryById);

module.exports = router;
