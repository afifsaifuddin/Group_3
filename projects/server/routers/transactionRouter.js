const express = require("express");
const router = express.Router();
const { transactionController } = require("../controller");
const { verifyToken } = require("../middleware/auth");

router.get("/", transactionController.getAll);
router.post("/", verifyToken, transactionController.create);

module.exports = router;
