const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");

router.get("/", controller.getUsers);
router.get("/:id", controller.getSingleUser);
router.post("/", controller.addUser);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
