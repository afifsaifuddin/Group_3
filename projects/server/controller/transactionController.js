const db = require("../models");
const transaction = db.Transaction;
const transactionItem = db.TransactionItem;
const product = db.Product;

const database = [{ model: db.User, attributes: ["username"] }];
const setPagination = (limit, page) => {
  const offset = (page - 1) * +limit;
  return { limit: parseInt(limit), offset };
};

const transactionController = {
  getAll: async (req, res) => {
    try {
      const { limit = 9, page = 1, order = "DESC", orderBy = "createdAt" } = req.query;
      const pagination = setPagination(limit, page);
      const totalTransaction = await transaction.count({});
      const totalPage = Math.ceil(totalTransaction / +limit);

      const result = await transaction.findAll({
        attributes: { exclude: ["userId"] },
        include: database,
        order: [[orderBy, order]],
        ...pagination,
      });

      const coba = { page, limit, totalTransaction, totalPage, result };
      return res.status(200).json({ message: "success", ...coba });
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
      const itemTransaction = await product.findByPk(item.id);
      await itemTransaction.decrement("quantity", { by: item.quantity });
      if (itemTransaction.quantity - item.quantity <= 0) {
        await itemTransaction.update({ isActive: false });
      }
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getTransactionDate: async (req, res) => {
    try {
      const { order = "ASC", orderBy = "createdAt", dateBefore, dateAfter } = req.query;

      const where = {};
      if (dateBefore) where.createdAt = { [db.Sequelize.Op.gte]: dateBefore };
      if (dateAfter) where.createdAt = { [db.Sequelize.Op.lte]: dateAfter };

      const result = await transaction.findAll({
        where,
        attributes: { exclude: ["userId"] },
        include: database,
        order: [[orderBy, order]],
      });
      console.log(result);
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
module.exports = transactionController;
