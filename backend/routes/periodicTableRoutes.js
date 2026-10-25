const express = require('express');
const router = express.Router();
const PeriodicTableController = require('../controllers/periodicTableController');

// Get all elements
router.get('/', PeriodicTableController.getAllElements);

// Get element by symbol
router.get('/symbol/:symbol', PeriodicTableController.getElementBySymbol);

// Get element by atomic number
router.get('/atomic-number/:atomicNumber', PeriodicTableController.getElementByAtomicNumber);

// Search elements
router.get('/search', PeriodicTableController.searchElements);

module.exports = router;
