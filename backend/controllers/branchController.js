const branchesData = require('../data/branches');

class BranchController {
  static getAllBranches(req, res) {
    try {
      res.json({ success: true, branches: branchesData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static getBranchById(req, res) {
    try {
      const { id } = req.params;
      const branch = branchesData.find(b => b.id === parseInt(id));
      if (!branch) {
        return res.status(404).json({ success: false, error: 'Rama no encontrada' });
      }
      res.json({ success: true, branch });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = BranchController;
