const express = require("express");
const controller = require("../controllers/products");
const router = express.Router();

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getSingleProduct_Categories);
router.get("/:id1/:id2", controller.getCategoryProduct);
router.post("/", controller.addProduct);
router.patch("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
