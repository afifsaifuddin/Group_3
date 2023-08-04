const express = require("express");
const router = express.Router();
const { transactionController } = require("../controller");
const { verifyToken, cekRole } = require("../middleware/auth");

router.get("/", transactionController.getAll);
router.post("/", verifyToken, transactionController.create);
router.post("/item", verifyToken, transactionController.cartToTransaction);
router.get("/:id", transactionController.getItemTransaction);
module.exports = router;
