const express = require('express');
const router = express.Router();
const SolveController = require('../controllers/solveController');

// Molarity
router.post('/molarity', SolveController.solveMolarity);

// Moles
router.post('/moles', SolveController.solveMoles);

// Molar Mass
router.post('/molar-mass', SolveController.solveMolarMass);

// Density
router.post('/density', SolveController.solveDensity);

// Dilution
router.post('/dilution', SolveController.solveDilution);

// Ideal Gas Law
router.post('/ideal-gas', SolveController.solveIdealGas);

// pH
router.post('/ph', SolveController.solvePH);

// pOH
router.post('/poh', SolveController.solvePOH);

// Mass
router.post('/mass', SolveController.solveMass);

// Normality
router.post('/normality', SolveController.solveNormality);

// PPM
router.post('/ppm', SolveController.solvePPM);

// Percent P/V
router.post('/percent-pv', SolveController.solvePercentPV);

// Percent P/P
router.post('/percent-pp', SolveController.solvePercentPP);

// Percent V/V
router.post('/percent-vv', SolveController.solvePercentVV);

// Stoichiometry
router.post('/stoichiometry', SolveController.solveStoichiometry);

// Gas Laws
router.post('/boyle-law', SolveController.solveBoyleLaw);
router.post('/charles-law', SolveController.solveCharlesLaw);
router.post('/gay-lussac-law', SolveController.solveGayLussacLaw);

module.exports = router;
