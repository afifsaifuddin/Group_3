const router = require("express").Router();
const { verifyToken, cekRole } = require("../middleware/auth");
const { productController } = require("../controller");
const { multerUpload } = require("../middleware/multer");
const { productValidator, resultValidation } = require("../middleware/validator");

router.get("/", productController.getProdukQuery);
router.get("/:id", productController.getProdukbyId);
router.post(
  "/upload",
  multerUpload.single("productImg"),
  verifyToken,
  cekRole,
  productValidator,
  resultValidation,
  productController.uploadProduk
);

router.patch(
  "/updateProduk/:id",
  multerUpload.single("productImg"),
  verifyToken,
  cekRole,
  productController.updateProduk
);

module.exports = router;
