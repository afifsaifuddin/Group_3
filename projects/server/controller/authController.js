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

const kirimEmailRegister = async (email, username) => {
  const data = await fs.readFile(
    path.resolve(__dirname, "../emails/registercashier.html"),
    "utf-8"
  );
  const tesCompile = handlebars.compile(data);
  const tempResult = tesCompile({ email, username });

  await transporter.sendMail({
    to: email,
    subject: "Register Kasir Magfirah",
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
      const payload = { id: cekUser.id, role: cekUser.role };
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "24h",
      });

      return res
        .status(200)
        .json({ success: "login berhasil", token, cekUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const cekUser = await user.findOne({
        where: { email },
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

  resetPassword: async (req, res) => {
    const { id } = req.user;
    const { password, confirmPassword } = req.body;
    console.log(id, password, confirmPassword);
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password tidak sama" });

    try {
      const salt = await bcrypt.genSalt(10);
      const Hashpassword = await bcrypt.hash(password, salt);
      await user.update({ password: Hashpassword }, { where: { id } });

      return res.status(200).json({ message: "Password berhasil diubah" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  register: async (req, res) => {
    try {
      let { username, email, password, confirmpassword } = req.body;
      if (password !== confirmpassword) {
        return res.status(400).json({ error: "Password tidak sama" });
      }
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const createkasir = await user.create({
        username,
        email,
        password,
        confirmpassword,
      });
      await kirimEmailRegister(email, username);
      return res
        .status(200)
        .json({ success: "register berhasil", createkasir });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateActive: async (req, res) => {
    try {
      const { id } = req.user;
      const { isActive } = req.body;
      await user.update({ isActive }, { where: { id } });
      if (isActive)
        return res.status(200).json({ message: "user sudah diaktifkan" });

      return res.status(200).json({ message: "user sudah di nonaktifkan" });
    } catch (err) {
      return res.status(500).json({ message: "user tidak ditemukan" });
    }
  },

  updateProfilePicture: async (req, res) => {
    try {
      const { id } = req.user;
      const profil = await user.findByPk(id);
      console.log(req.file);
      if (profil.imgProfile) {
        fs.unlink(profil.imgProfile, (err) => {
          if (err) return res.status(500).json({ message: err.message });
        });
      }
      await user.update({ imgProfile: req.file.path }, { where: { id } });

      res.status(200).json({ message: "Ganti foto profil berhasil" });
    } catch (err) {
      res.status(500).json({ message: "ada yang salah" });
    }
  },
};
module.exports = authController;
