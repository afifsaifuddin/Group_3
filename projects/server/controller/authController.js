const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const path = require("path");
const { Sequelize } = require("sequelize");
const sendEmail = async (result) => {
  let payload = {
    id: result.id,
    username: result.username,
    email: result.email,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  const redirect = `http://localhost:3000/resetpassword/${token}`;
  const data = await fs.readFile(path.resolve(__dirname, "../emails/forgotpassword.html"), "utf-8");
  const tesCompile = handlebars.compile(data);
  const tempResult = tesCompile({ redirect });

  await transporter.sendMail({
    to: result.email,
    subject: "Reset Password",
    html: tempResult,
  });
};

const kirimEmailRegister = async (email, username) => {
  const data = await fs.readFile(path.resolve(__dirname, "../emails/registercashier.html"), "utf-8");
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
      if (!cekUser.isActive)
        return res.status(400).json({ message: "Akun Sudah di Nonaktifkan mohon kontak ke admin!" });

      const isValid = await bcrypt.compare(password, cekUser.password);
      if (!isValid) return res.status(404).json({ message: "password salah" });
      const payload = { id: cekUser.id, role: cekUser.role };
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ success: "login berhasil", token, cekUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  cekUser: async (req, res) => {
    try {
      const { id } = req.user;
      const cekUser = await user.findOne({ where: { id } });
      return res.status(200).json({ message: "masih login", cekUser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
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

  getCashier: async (req, res) => {
    try {
      const result = await user.findAll();
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  resetPassword: async (req, res) => {
    const { id } = req.user;
    const { password, confirmPassword } = req.body;
    console.log(id, password, confirmPassword);
    if (password !== confirmPassword) return res.status(400).json({ message: "Password tidak sama" });

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
      console.log(1);
      if (!username || !email || !password || !confirmpassword) {
        return res.status(400).json({ error: "Data tidak lengkap" });
      }
      console.log(username, email);

      const cekUser = await user.findOne({ where: { [Sequelize.Op.or]: [{ username }, { email }] } });
      if (cekUser) return res.status(400).json({ message: "user atau email sudah terdaftar" });

      console.log(3);

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const createkasir = await user.create({
        username,
        email,
        password,
        confirmpassword,
      });
      await kirimEmailRegister(email, username);
      return res.status(200).json({ message: "register berhasil", createkasir });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateActive: async (req, res) => {
    try {
      const { id, isActive } = req.body;
      const profil = await user.findByPk(id);
      if (profil.role === "admin") return res.status(400).json({ message: "Admin tidak bisa dinonaktifkan" });
      await user.update({ isActive }, { where: { id } });
      if (isActive) return res.status(200).json({ message: "user sudah diaktifkan" });

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
