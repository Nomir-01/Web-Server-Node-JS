const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");

router.get("/", controller.getPosts);
router.get("/:id", controller.getSinglePost);
router.post("/", controller.addPost);
router.patch("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
