const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const middleware = require("../middleware");

router.get("/", middleware.validateToken, controller.getUsers);
router.get("/:id", middleware.validateToken, controller.getSingleUser);
router.post("/", middleware.validateToken, controller.addUser);
router.patch("/:id", middleware.validateToken, controller.updateUser);
router.delete("/:id", middleware.validateToken, controller.deleteUser);

module.exports = router;
