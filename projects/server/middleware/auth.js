const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve("../.env") });
const db = require("../models");

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).send("Belum Login");

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token)
      return res.status(401).send("access denied");
    let verifiedUser = jwt.verify(token, process.env.JWT_KEY);

    if (!verifiedUser) return res.status(401).send("unauthorized request");
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(400).send("Token Expired");
  }
};

const cekRole = async (req, res, next) => {
  const { id } = req.user;
  const cekUser = await db.User.findByPk(id);
  if (cekUser.role != "admin")
    return res.status(200).json({ message: "forbidden" });

  next();
};

module.exports = { verifyToken, cekRole };
