const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { loginValidator, resultValidation } = require("../middleware/validator");

router.post("/login", loginValidator, resultValidation, authController.login);
router.post("/forgot-password", authController.forgotPassword);
module.exports = router;
