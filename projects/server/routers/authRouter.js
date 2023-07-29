const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

const { loginValidator, resultValidation } = require("../middleware/validator");
const { verifyToken } = require("../middleware/auth");

router.post("/login", loginValidator, resultValidation, authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password", verifyToken, authController.resetPassword);

const {
  loginValidator,
  resultValidation,
  regisValidator,
} = require("../middleware/validator");
const { checkrole } = require("../middleware/checkrole");

router.post("/login", loginValidator, resultValidation, authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post(
  "/register",
  regisValidator,
  resultValidation,
  authController.register
);

module.exports = router;
