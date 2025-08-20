var express = require("express");
const {
  listQuestionSetController,
  getQuestionSetController,
  saveAttemptedQuestionController,
  deleteQuestionSetController,
} = require("../controller/questionController");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
var router = express.Router();

router.get("/set/list", validateTokenMiddleware, listQuestionSetController);
router.get("/set/:id", validateTokenMiddleware, getQuestionSetController);
router.post(
  "/answer/attempt",
  validateTokenMiddleware,
  saveAttemptedQuestionController
);
// Only admins should delete
router.delete(
  "/set/:id",
  validateTokenMiddleware, // verify token first
  deleteQuestionSetController
);

module.exports = router;
