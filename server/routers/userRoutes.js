const express = require("express");
const UserController = require("../controllers/users");

const router = express.Router();

router.post("/username", UserController.getUserByUsername);
router.post("/email", UserController.getUserByEmail);
router.post("/teacher-id", UserController.getUserTeacherId);
router.get("/:id", UserController.getUserById);
router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/:id/classes", UserController.getUserClasses);
router.get("/:id/classes/past", UserController.getUserPastClasses);
router.get("/:id/classes/future", UserController.getUserFutureClasses);

module.exports = router;
