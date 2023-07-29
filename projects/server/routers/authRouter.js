const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

const {
  loginValidator,
  regisValidator,
  resetPasswordValidator,
  resultValidation,
} = require("../middleware/validator");

const { verifyToken } = require("../middleware/auth");

router.post("/login", loginValidator, resultValidation, authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch(
  "/reset-password",
  verifyToken,
  resetPasswordValidator,
  resultValidation,
  authController.resetPassword
);
router.post(
  "/register",
  regisValidator,
  resultValidation,
  authController.register
);
router.patch("/active-cashier", verifyToken, authController.updateActive);

module.exports = router;
