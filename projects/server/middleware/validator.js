const { body, validationResult } = require("express-validator");

const loginValidator = [
  body("username").notEmpty().withMessage("Username harus diisi"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    .matches(/[!@#$%^&*()\-_=+{};:'",.<>?]/)
    .withMessage("password harus mengandung karakter")
    .matches(/[A-Z]/)
    .withMessage("password harus mengandung huruf kapital"),
];
const regisValidator = [
  body("username").notEmpty().withMessage("Username harus diisi"),
  body("email").isEmail().withMessage("Email harus valid"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    .matches(/[!@#$%^&*()\-_=+{};:'",.<>?]/)
    .withMessage("password harus mengandung karakter")
    .matches(/[A-Z]/)
    .withMessage("password harus mengandung huruf kapital"),
];

const resetPasswordValidator = [
  body("password", "confirmPassword")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    .matches(/[!@#$%^&*()\-_=+{};:'",.<>?]/)
    .withMessage("password harus mengandung karakter")
    .matches(/[A-Z]/)
    .withMessage("password harus mengandung huruf kapital"),
];
const productValidator = [
  body("name").notEmpty().withMessage("Nama produk harus diisi"),
  body("categoryId").notEmpty().withMessage("Kategori harus diisi"),
  body("description").notEmpty().withMessage("Deskripsi produk harus diisi"),
  body("modal_produk").notEmpty().withMessage("Harga Modal produk harus diisi"),
  body("harga_produk").notEmpty().withMessage("Harga produk harus diisi"),
  body("quantity").notEmpty().withMessage("Jumlah produk harus diisi"),
];

const resultValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  loginValidator,
  regisValidator,
  resetPasswordValidator,
  productValidator,
  resultValidation,
};
