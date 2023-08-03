const db = require("../models");
const transaction = db.Transaction;
const product = db.Product;

const transactionController = {
  getAll: async (req, res) => {
    try {
      const result = await transaction.findAll();
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    const { userId } = req.user;
    try {
      const result = await transaction.create({
        userId,
      });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  checkOut: async (req, res) => {},
};
module.exports = transactionController;
