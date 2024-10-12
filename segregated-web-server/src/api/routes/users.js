const express = require("express");
const controller = require("../controllers/users");
const router = express.Router();

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getSingleUser);
router.post("/", controller.addUser);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
