const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { multerUpload } = require("../middleware/multer");
const { loginValidator, regisValidator, resetPasswordValidator, resultValidation } = require("../middleware/validator");

const { verifyToken } = require("../middleware/auth");

router.post("/login", loginValidator, resultValidation, authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password", verifyToken, resetPasswordValidator, resultValidation, authController.resetPassword);
router.post("/register", regisValidator, resultValidation, authController.register);
router.patch("/active-cashier", verifyToken, authController.updateActive);
router.patch("/ganti-avatar", verifyToken, multerUpload.single("imgProfile"), authController.updateProfilePicture);
router.get("/", verifyToken, authController.cekUser);
router.get("/all", verifyToken, authController.getCashier);

module.exports = router;
