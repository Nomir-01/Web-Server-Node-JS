const express = require("express");
const router = express.Router();
const controller = require("../controllers/comments");

router.get("/", controller.getComments);
router.get("/:id", controller.getSingleComment);
router.post("/", controller.addComment);
router.patch("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

module.exports = router;
