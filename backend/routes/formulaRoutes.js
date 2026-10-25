const express = require('express');
const router = express.Router();
const FormulaController = require('../controllers/formulaController');

// Get all formulas
router.get('/', FormulaController.getAllFormulas);

// Get formulas by category
router.get('/category/:category', FormulaController.getFormulasByCategory);

// Search formulas
router.get('/search', FormulaController.searchFormulas);

module.exports = router;
