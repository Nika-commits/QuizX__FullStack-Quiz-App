var express = require("express");
const {
  createQuestionSetController,
  deleteUserController,
  editUserController,
} = require("../controller/adminController");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
const { adminOnlyMiddleware } = require("../middleware/RoleMiddleware");
var router = express.Router();

router.post(
  "/questionset/create",
  validateTokenMiddleware,
  adminOnlyMiddleware,
  createQuestionSetController
);

router.delete(
  "/:id",
  validateTokenMiddleware,
  adminOnlyMiddleware,
  deleteUserController
);

router.put(
  "/edit/:id",
  validateTokenMiddleware,
  adminOnlyMiddleware,
  editUserController
);
module.exports = router;
