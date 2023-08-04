const db = require("../models");
const transaction = db.Transaction;
const transactionItem = db.TransactionItem;
const product = db.Product;

const database = [{ model: db.User, attributes: ["username"] }];

const transactionController = {
  getAll: async (req, res) => {
    try {
      const result = await transaction.findAll({
        attributes: { exclude: ["userId"] },
        include: database,
      });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getItemTransaction: async (req, res) => {
    try {
      const result = await transactionItem.findAll({
        where: { transactionId: req.params.id },
        include: [{ model: product, attributes: ["name"] }],
      });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    const { id } = req.user;
    try {
      const result = await transaction.create({ userId: id, totalPrice: req.body.totalharga });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  cartToTransaction: async (req, res) => {
    const { transactionId, item } = req.body;
    console.log(transactionId, item);
    try {
      const result = await transactionItem.create({
        transactionId,
        productId: item.id,
        quantity: item.quantity,
        price: item.harga_produk,
      });
      return res.status(200).json({ message: "success" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
module.exports = transactionController;
