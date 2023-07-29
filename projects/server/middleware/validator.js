const { body, validationResult } = require("express-validator");

const loginValidator = [
  body("username").isEmpty().withMessage("Username harus diisi"),
  body("password").isEmpty().withMessage("Password harus diisi"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("password")
    .matches(/[!@#$%^&*()\-_=+{};:'",.<>?]/)
    .withMessage("password harus mengandung karakter"),
  body("password")
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
