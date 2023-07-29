const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { categoryController } = require("../controller");

router.post("/create-category", categoryController.createCategory);
router.get("/", categoryController.getCategory);

module.exports = router;
