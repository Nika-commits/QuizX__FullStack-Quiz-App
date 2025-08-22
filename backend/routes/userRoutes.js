var express = require("express");

const {
  createUserController,
  getUserController,
  loginHandleController,
  getUserListController,
} = require("../controller/userController");

const {
  getCurrentUserProfileController,
  updateCurrentUserProfileController,
  getUserProfileController,
} = require("../controller/profileController");

const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  res.json({
    message: "User Controller is working",
  });
});

// User routes
router.post("/create", createUserController);
router.post("/login", loginHandleController);
router.get("/list", validateTokenMiddleware, getUserListController);

// Profile routes
router.get(
  "/profile/me",
  validateTokenMiddleware,
  getCurrentUserProfileController
);
router.put(
  "/profile/me",
  validateTokenMiddleware,
  updateCurrentUserProfileController
);

router.get(
  "/profile/:userId",
  validateTokenMiddleware,
  getUserProfileController
);

module.exports = router;
