const router = require("express").Router();
const { verifyToken, cekRole } = require("../middleware/auth");
const { categoryController } = require("../controller");

router.post("/", verifyToken, cekRole, categoryController.createCategory);
router.get("/", categoryController.getCategory);
router.delete("/:id", verifyToken, cekRole, categoryController.deleteCategory);

router.patch("/:id", verifyToken, cekRole, categoryController.editCategory);

module.exports = router;
