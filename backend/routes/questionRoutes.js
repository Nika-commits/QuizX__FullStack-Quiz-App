var express = require("express");
const {
  listQuestionSetController,
  getQuestionSetController,
  saveAttemptedQuestionController,
  deleteQuestionSetController,
  getUserQuizStatsController,
  getUserQuizAttemptsController,
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

router.get(
  "/quiz-attempts/:userId",
  validateTokenMiddleware,
  getUserQuizAttemptsController
);
router.get(
  "/quiz-stats/:userId",
  validateTokenMiddleware,
  getUserQuizStatsController
);
module.exports = router;
