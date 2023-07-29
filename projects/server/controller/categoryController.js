const db = require("../models");
const category = db.Category;

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const result = await category.create({ name });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const result = await category.findAll();
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = categoryController;
