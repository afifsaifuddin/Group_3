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

const resultValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  loginValidator,
  resultValidation,
};
