const db = require("../models");
const category = db.Category;
const setPagination = (limit, page) => {
  const offset = (page - 1) * +limit;
  return { limit: parseInt(limit), offset };
};

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      db.sequelize.transaction(async (t) => {
        const result = await category.create({ name }, { transaction: t });
        return res.status(200).json({ message: "Kategori baru berhasil dibuat", result });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const { limit = 7, page = 1, order = "ASC", orderBy = "createdAt" } = req.query;
      const pagination = setPagination(limit, page);
      const totalCategory = await category.count({});
      const totalPage = Math.ceil(totalCategory / +limit);
      const result = await category.findAll({ ...pagination });
      const coba = { page, limit, totalCategory, totalPage, result };
      return res.status(200).json({ message: "success", ...coba });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getActiveCategory: async (req, res) => {
    try {
      const { limit = 7, page = 1, order = "ASC", orderBy = "createdAt" } = req.query;
      const pagination = setPagination(limit, page);
      const totalCategory = await category.count({ where: { isActive: true } });
      const totalPage = Math.ceil(totalCategory / +limit);
      const result = await category.findAll({ where: { isActive: true }, ...pagination });
      const coba = { page, limit, totalCategory, totalPage, result };
      return res.status(200).json({ message: "success", ...coba });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      db.sequelize.transaction(async (t) => {
        await category.update({ isActive }, { where: { id } }, { transaction: t });
        if (isActive) return res.status(200).json({ message: "Category telah diaktifkan" });

        return req.status(200).json({ message: "Category telah dinonaktifkan" });
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  editCategory: async (req, res) => {
    const { id } = req.params;
    const { name, isActive } = req.body;
    console.log(isActive);
    const updateClause = {};
    if (isActive || !isActive) updateClause.isActive = isActive;
    if (name) updateClause.name = name;
    console.log(updateClause);
    try {
      db.sequelize.transaction(async (t) => {
        await category.update(updateClause, { where: { id } }, { transaction: t });
      });
      return res.status(200).json({ name: "category berhasil diedit" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = categoryController;
