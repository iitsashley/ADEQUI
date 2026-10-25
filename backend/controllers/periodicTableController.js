const periodicTableData = require('../data/periodicTable');

class PeriodicTableController {
  static getAllElements(req, res) {
    try {
      res.json({ success: true, elements: periodicTableData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static getElementBySymbol(req, res) {
    try {
      const { symbol } = req.params;
      const element = periodicTableData.find(e => e.symbol === symbol);
      if (!element) {
        return res.status(404).json({ success: false, error: 'Elemento no encontrado' });
      }
      res.json({ success: true, element });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static getElementByAtomicNumber(req, res) {
    try {
      const { atomicNumber } = req.params;
      const element = periodicTableData.find(e => e.atomicNumber === parseInt(atomicNumber));
      if (!element) {
        return res.status(404).json({ success: false, error: 'Elemento no encontrado' });
      }
      res.json({ success: true, element });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static searchElements(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.json({ success: true, elements: periodicTableData });
      }
      const filtered = periodicTableData.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.symbol.toLowerCase().includes(query.toLowerCase())
      );
      res.json({ success: true, elements: filtered });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = PeriodicTableController;
