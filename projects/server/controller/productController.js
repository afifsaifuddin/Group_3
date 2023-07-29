const db = require("../models");
const product = db.Product;
const fs = require("fs").promises;
const productController = {
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
      if (!req.file)
        return res.status(400).json({ message: "file gamebar harus ada" });

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
      } = req.body;

      const item = await product.findOne({ where: { id: req.params.id } });
      const updateClause = {};
      if (name) updateClause.name = name;
      if (categoryId) updateClause.categoryId = categoryId;
      if (description) updateClause.description = description;
      if (modal_produk) updateClause.modal_produk = modal_produk;
      if (harga_produk) updateClause.harga_produk = harga_produk;
      if (quantity) updateClause.quantity = quantity;
      if (req.file) {
        fs.unlink(item.productImg, (err) => {
          if (err)
            res.status(500).json({ message: "Ubah gambar ada yang salah" });
        });
        updateClause.productImg = req.file.path;
      }
      await product.update(updateClause, {
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: "update berhasil" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = productController;
