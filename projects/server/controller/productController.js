const db = require("../models");
const product = db.Product;
const fs = require("fs").promises;

const database = [{ model: db.Category, attributes: ["name"] }];
const setPagination = (limit, page) => {
  const offset = (page - 1) * +limit;
  return { limit: parseInt(limit), offset };
};

const productController = {
  getProdukQuery: async (req, res) => {
    const {
      limit = 9,
      page = 1,
      order = "ASC",
      orderBy = "createdAt",
      categoryId,
      name,
    } = req.query;

    // const where = { isActive: true };
    const where = {};
    if (name) where.name = { [db.Sequelize.Op.like]: `%${name}%` };
    if (categoryId) where.categoryId = categoryId;

    const pagination = setPagination(limit, page);
    const totalProduct = await product.count({ where });
    const totalPage = Math.ceil(totalProduct / +limit);
    try {
      const result = await product.findAll({
        where,
        include: database,
        order: [[orderBy, order]],
        ...pagination,
      });
      const coba = { page, limit, totalProduct, totalPage, result };
      return res.status(200).json({ message: "success", ...coba });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getProdukbyId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await product.findByPk(id, { include: database });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return req.status(500).json({ message: err.message });
    }
  },

  uploadProduk: async (req, res) => {
    try {
      const {
        name,
        categoryId,
        description,
        modal_produk,
        harga_produk,
        quantity,
      } = req.body;
      console.log(req.file);
      if (!req.file)
        return res.status(400).json({ message: "file gamebar harus ada" });
      console.log(
        name,
        categoryId,
        description,
        modal_produk,
        harga_produk,
        quantity
      );
      const result = await product.create({
        name,
        categoryId,
        description,
        modal_produk,
        harga_produk,
        quantity,
        productImg: req.file.path,
      });

      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateProduk: async (req, res) => {
    try {
      const {
        name,
        categoryId,
        description,
        modal_produk,
        harga_produk,
        quantity,
        isActive,
      } = req.body;
      const item = await product.findOne({ where: { id: req.params.id } });
      const updateClause = {};
      if (name) updateClause.name = name;
      if (categoryId) updateClause.categoryId = categoryId;
      if (description) updateClause.description = description;
      if (modal_produk) updateClause.modal_produk = modal_produk;
      if (harga_produk) updateClause.harga_produk = harga_produk;
      if (quantity) updateClause.quantity = quantity;
      if (isActive) updateClause.isActive = isActive;
      if (req.file) {
        fs.unlink(item.productImg, (err) => {
          if (err)
            res.status(500).json({ message: "Ubah gambar ada yang salah" });
        });
        updateClause.productImg = req.file.path;
      }
      await product.update(updateClause, { where: { id: req.params.id } });
      return res.status(200).json({ message: "update berhasil" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deactivateProduk: async (req, res) => {
    const { id } = req.params;
    try {
      db.sequelize.transaction(async (t) => {
        await product.update(
          { isActive: false },
          { where: { id } },
          { transaction: t }
        );
        if (isActive)
          return res.status(200).json({ message: "produk telah diaktifkan" });

        return req.status(200).json({ message: "produk telah dinonaktifkan" });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = productController;
