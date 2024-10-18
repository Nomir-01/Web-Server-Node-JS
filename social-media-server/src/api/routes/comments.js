const express = require("express");
const router = express.Router();
const controller = require("../controllers/comments");
const middleware = require("../middleware");

router.get("/", middleware.validateToken, controller.getComments);
router.get("/:id", middleware.validateToken, controller.getSingleComment);
router.post("/", middleware.validateToken, controller.addComment);
router.patch("/:id", middleware.validateToken, controller.updateComment);
router.delete("/:id", middleware.validateToken, controller.deleteComment);

module.exports = router;
