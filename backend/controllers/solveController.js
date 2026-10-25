const ChemistrySolver = require('../services/chemistrySolver');

class SolveController {
  static solveMolarity(req, res) {
    try {
      const result = ChemistrySolver.solveMolarity(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveMoles(req, res) {
    try {
      const result = ChemistrySolver.solveMoles(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveMolarMass(req, res) {
    try {
      const result = ChemistrySolver.solveMolarMass(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveDensity(req, res) {
    try {
      const result = ChemistrySolver.solveDensity(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveDilution(req, res) {
    try {
      const result = ChemistrySolver.solveDilution(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveIdealGas(req, res) {
    try {
      const result = ChemistrySolver.solveIdealGas(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solvePH(req, res) {
    try {
      const result = ChemistrySolver.solvePH(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solvePOH(req, res) {
    try {
      const result = ChemistrySolver.solvePOH(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveMass(req, res) {
    try {
      const result = ChemistrySolver.solveMass(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveNormality(req, res) {
    try {
      const result = ChemistrySolver.solveNormality(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solvePPM(req, res) {
    try {
      const result = ChemistrySolver.solvePPM(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solvePercentPV(req, res) {
    try {
      const result = ChemistrySolver.solvePercentPV(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solvePercentPP(req, res) {
    try {
      const result = ChemistrySolver.solvePercentPP(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solvePercentVV(req, res) {
    try {
      const result = ChemistrySolver.solvePercentVV(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveStoichiometry(req, res) {
    try {
      const result = ChemistrySolver.solveStoichiometry(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveBoyleLaw(req, res) {
    try {
      const result = ChemistrySolver.solveBoyleLaw(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveCharlesLaw(req, res) {
    try {
      const result = ChemistrySolver.solveCharlesLaw(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static solveGayLussacLaw(req, res) {
    try {
      const result = ChemistrySolver.solveGayLussacLaw(req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = SolveController;
