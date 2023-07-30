const { where } = require("sequelize");
const db = require("../models");
const cart = db.Cart;
const cartItem = db.CartItem;
const product = db.Product;

const cartController = {
  create: async (req, res) => {
    const { id } = req.user;
    try {
      const belumSelesai = await cart.findAll({
        where: { userId: id, isDone: false },
      });
      if (belumSelesai.length > 0)
        return res
          .status(400)
          .json({ message: "selesaikan cart yang belum selesai" });

      const result = await cart.create({
        userId: id,
      });

      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  masukinItem: async (req, res) => {
    try {
      const item = await product.findByPk(req.params.id);
      if (item.quantity < 1)
        return res.status(400).json({ message: "stock habis" });
      if (!item.isActive)
        return res.status(400).json({ message: "produk sudah tidak terjual" });
      const itemCart = await cartItem.findOne({
        where: { productId: req.params.id },
      });

      if (!itemCart) {
        await cartItem.create({
          cartId: req.cart.id,
          productId: req.params.id,
          quantity: 1,
        });
      } else {
        if (itemCart.quantity >= item.quantity)
          return res
            .status(400)
            .json({ message: `stock cuman ${item.quantity}` });

        await itemCart.increment("quantity");
      }
      await req.cart.increment({ totalPrice: item.harga_produk });
      return res
        .status(200)
        .json({ message: `${item.name} telah ditambahkan` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  nguranginItem: async (req, res) => {
    try {
      const item = await product.findByPk(req.params.id);
      const itemCart = await cartItem.findOne({
        where: { productId: req.params.id },
      });

      if (!itemCart) {
        return res.status(400).json({ message: "item tidak ada" });
      }

      if (itemCart.quantity > 1) {
        await cartItem.update(
          { quantity: itemCart.quantity - 1 },
          { where: { productId: req.params.id } }
        );
      }

      await req.cart.decrement({ totalPrice: item.harga_produk });
      await cartItem.destroy({ where: { productId: req.params.id } });
      return res.status(200).json({ message: "sudah dikurangi" });
    } catch (err) {
      return res.status(500).json({ message: "ada yang salah" });
    }
  },

  getItem: async (req, res) => {
    const { id } = req.cart;
    try {
      const result = await cartItem.findAll({
        where: { cartId: id },
      });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  checkOut: async (req, res) => {
    try {
      const result = await cart.update(
        { isDone: true },
        { where: { id: req.cart.id } }
      );
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = cartController;
