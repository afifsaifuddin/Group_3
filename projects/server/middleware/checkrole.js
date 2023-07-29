const checkrole = (req, res, next) => {
  if (req.role == "admin") {
    return res.status(200).send("admin");
  } else {
    return res.status(200).send("kasir");
  }
};

module.exports = {
  checkrole,
};
