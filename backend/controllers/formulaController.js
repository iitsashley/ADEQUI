const formulasData = require('../data/formulas');

class FormulaController {
  static getAllFormulas(req, res) {
    try {
      res.json({ success: true, formulas: formulasData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static getFormulasByCategory(req, res) {
    try {
      const { category } = req.params;
      const filtered = formulasData.filter(f => f.category === category);
      res.json({ success: true, formulas: filtered });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static searchFormulas(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.json({ success: true, formulas: formulasData });
      }
      const filtered = formulasData.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.formula.toLowerCase().includes(query.toLowerCase()) ||
        f.category.toLowerCase().includes(query.toLowerCase())
      );
      res.json({ success: true, formulas: filtered });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = FormulaController;
