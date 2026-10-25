const express = require('express');
const router = express.Router();
const BranchController = require('../controllers/branchController');

// Get all branches
router.get('/', BranchController.getAllBranches);

// Get branch by ID
router.get('/:id', BranchController.getBranchById);

module.exports = router;
