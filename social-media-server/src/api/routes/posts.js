const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");
const middleware = require("../middleware");

router.get("/", middleware.validateToken, controller.getPosts);
router.get("/:id", middleware.validateToken, controller.getSinglePost);
router.post("/", middleware.validateToken, controller.addPost);
router.patch("/:id", middleware.validateToken, controller.updatePost);
router.delete("/:id", middleware.validateToken, controller.deletePost);

module.exports = router;
