const router = require("express").Router();
const { verifyToken, cekRole } = require("../middleware/auth");
const { productController } = require("../controller");
const { multerUpload } = require("../middleware/multer");
const {
  productValidator,
  resultValidation,
} = require("../middleware/validator");
const { verify } = require("../helpers/transporter");

router.post(
  "/upload",

  verifyToken,
  cekRole,
  multerUpload.single("productImg"),
  productValidator,
  resultValidation,
  productController.uploadProduk
);

router.patch(
  "/updateProduk/:id",
  verifyToken,
  cekRole,
  productController.updateProduk
);
module.exports = router;
