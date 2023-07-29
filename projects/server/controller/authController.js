const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const path = require("path");

const sendEmail = async (result) => {
  let payload = {
    id: result.id,
    username: result.username,
    email: result.email,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  const redirect = `http://localhost:3000/verification?${token}`;
  const data = await fs.readFile(
    path.resolve(__dirname, "../emails/forgotpassword.html"),
    "utf-8"
  );
  const tesCompile = handlebars.compile(data);
  const tempResult = tesCompile({ redirect });

  await transporter.sendMail({
    to: result.email,
    subject: "Reset Password",
    html: tempResult,
  });
};
const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const cekUser = await user.findOne({
        where: { username: username },
      });
      if (!cekUser) {
        return res.status(500).json({ message: "Username tidak ditemukan!" });
      }
      const isValid = await bcrypt.compare(password, cekUser.password);
      if (!isValid) return res.status(404).json({ message: "password salah" });

      return res.status(200).json({ success: "login berhasil", cekUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const cekUser = await user.findOne({
        where: { email: email },
      });
      if (!cekUser) {
        return res.status(500).json({ message: "Email tidak ditemukan!" });
      }
      await sendEmail(cekUser);
      return res.status(200).json({ success: "Email berhasil dikirim!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
