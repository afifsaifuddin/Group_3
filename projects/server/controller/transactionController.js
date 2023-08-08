const db = require("../models");
const sequelize = db.sequelize;
const transaction = db.Transaction;
const transactionItem = db.TransactionItem;
const product = db.Product;
const { Op } = require("sequelize");

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
      db.sequelize.transaction(async (t) => {
        const result = await transaction.create({ userId: id, totalPrice: req.body.totalharga }, { transaction: t });
        return res.status(200).json({ message: "success", result });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  cartToTransaction: async (req, res) => {
    const { transactionId, item } = req.body;
    console.log(transactionId, item);
    try {
      db.sequelize.transaction(async (t) => {
        const result = await transactionItem.create({
          transactionId,
          productId: item.id,
          quantity: item.quantity,
          price: item.harga_produk,
        });
        const itemTransaction = await product.findByPk(item.id);
        await itemTransaction.decrement("quantity", { by: item.quantity });
        if (itemTransaction.quantity - item.quantity <= 0) {
          await itemTransaction.update({ isActive: false }, { transaction: t });
        }
        return res.status(200).json({ message: "success", result });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getTransactionDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const result = await transaction.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(startDate), new Date(endDate).setHours(23, 59, 59)],
          },
        },
        attributes: [
          [sequelize.fn("date", sequelize.col("createdAt")), "transactionDate"],
          [sequelize.fn("sum", sequelize.col("totalPrice")), "totalPrice"],
        ],
        group: [sequelize.fn("date", sequelize.col("createdAt"))],
      });

      return res.status(200).json({ message: "success", result });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  getTransactionbyDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const result = await transaction.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(startDate).setHours(0, 0, 0), new Date(endDate).setHours(23, 59, 59)],
          },
        },
        include: database,
      });
      return res.status(200).json({ message: "success", result });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  transactionItemDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const result = await transactionItem.findAll({
        include: [
          {
            model: transaction,
            where: { createdAt: { [Op.between]: [new Date(startDate), new Date(endDate).setHours(23, 59, 59)] } },
          },
          { model: product },
        ],
        attributes: ["productId", [sequelize.fn("sum", sequelize.col("transactionitem.quantity")), "totalQuantity"]],
        group: ["productId", "Transaction.id"],
      });
      return res.status(200).json({ message: "success", result });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },
};
module.exports = transactionController;
