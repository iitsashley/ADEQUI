const historyData = require('../data/history');

class HistoryController {
  static getAllHistory(req, res) {
    try {
      res.json({ success: true, history: historyData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static getHistoryById(req, res) {
    try {
      const { id } = req.params;
      const event = historyData.find(h => h.id === parseInt(id));
      if (!event) {
        return res.status(404).json({ success: false, error: 'Evento histórico no encontrado' });
      }
      res.json({ success: true, event });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = HistoryController;
