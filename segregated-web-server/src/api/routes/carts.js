const express = require("express");
const controller = require("../controllers/carts");
const router = express.Router();

router.get("/", controller.getAllCarts);
router.get("/:id", controller.getSingleCart);
router.get("/:id1/:id2", controller.getSingleUserCart);
router.post("/", controller.addCart);
router.patch("/:id", controller.updateCart);
router.delete("/:id", controller.deleteCart);

module.exports = router;
