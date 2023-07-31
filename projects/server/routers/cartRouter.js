const express = require("express");
const router = express.Router();
const { cartController } = require("../controller");
const { verifyToken, cekRole, cekCart } = require("../middleware/auth");

router.post("/", verifyToken, cartController.create);
router.post("/masukin/:id", verifyToken, cekCart, cartController.masukinItem);
router.patch(
  "/ngurangin/:id",
  verifyToken,
  cekCart,
  cartController.nguranginItem
);
router.get("/", verifyToken, cekCart, cartController.getItem);

module.exports = router;
