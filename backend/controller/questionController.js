const AnswerModel = require("../model/AnswerModel");
const QuestionSet = require("../model/QuestionSetModel");

async function listQuestionSetController(req, res) {
  const questionSet = await QuestionSet.aggregate([
    {
      $project: {
        title: 1,
        questionCount: { $size: { $ifNull: ["$questions", []] } },
      },
    },
  ]);

  res.json({
    questionSet: questionSet,
  });
}

async function getQuestionSetController(req, res) {
  const { id } = req.params;
  const questionSet = await QuestionSet.findById(id).select(
    "-questions.choices.correctAnswer"
  );

  if (!questionSet) {
    return res.status(404).json({ message: "Question set not found" });
  }

  res.json(questionSet);
}

async function saveAttemptedQuestionController(req, res) {
  const { questionSet: questionSetId, responses } = req.body;
  const { id: userId } = req.user;

  const questionSet = await QuestionSet.findById(questionSetId).select(
    "questions._id questions.choices._id questions.choices.correctAnswer"
  );

  if (!questionSet)
    return res.status(404).json({ message: "QuestionSet not found" });

  const result = (responses || []).reduce(
    (acc, current) => {
      const questions = Array.isArray(questionSet?.questions)
        ? questionSet.questions
        : Array.isArray(questionSet)
        ? questionSet
        : [];

      // 1) find the question in this set
      const q = questions.find(
        (qn) => String(qn._id) === String(current.questionId)
      );
      if (!q) return acc; // skip unknown question ids

      // 2) build the list of correct choice ids using reduce
      const correctIds = (q.choices || []).reduce((ids, c) => {
        if (c?.correctAnswer) ids.push(String(c._id));
        return ids;
      }, []);

      // 3) count how many SELECTED are actually CORRECT (using find)
      const selected = current.selectedChoiceIds || [];
      const selectedAreCorrectCount = selected.reduce((cnt, selId) => {
        const hit =
          correctIds.find((cid) => cid === String(selId)) !== undefined;
        return cnt + (hit ? 1 : 0);
      }, 0);

      // 4) count how many CORRECT were actually SELECTED (using find)
      const correctSelectedCount = correctIds.reduce((cnt, cid) => {
        const hit =
          selected.find((selId) => String(selId) === cid) !== undefined;
        return cnt + (hit ? 1 : 0);
      }, 0);

      // exact match if:
      //  - every selected is correct, AND
      //  - every correct was selected, AND
      //  - lengths line up on both sides
      const allSelectedAreCorrect = selectedAreCorrectCount === selected.length;
      const allCorrectWereSelected = correctSelectedCount === correctIds.length;
      const isCorrect = allSelectedAreCorrect && allCorrectWereSelected;

      acc.total += 1;
      if (isCorrect) acc.score += 1;

      // optional per-question detail (nice for review UI)
      acc.details.push({
        questionId: String(q._id),
        selectedChoiceIds: selected.map(String),
        isCorrect,
      });

      return acc;
    },
    { score: 0, total: 0, details: [] }
  );

  const saveAnswerQuestion = await new AnswerModel({
    questionSet: questionSetId,
    user: userId,
    responses,
    score: result.score,
    total: result.total,
  });

  await saveAnswerQuestion.save();
  return res.status(201).json({
    message: "Graded",
    data: {
      score: result.score,
      total: result.total,
      responses: result.responses,
      // id: saved?._id,
    },
  });
}

async function deleteQuestionSetController(req, res) {
  const { id } = req.params;

  try {
    const deleted = await QuestionSet.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Question set not found" });
    }

    // Optionally, delete all related answers as well
    await AnswerModel.deleteMany({ questionSet: id });

    return res.json({ message: "Question set deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete question set" });
  }
}

// Get quiz attempts for a specific user
async function getUserQuizAttemptsController(req, res) {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;
    const mongoose = require("mongoose");

    // Determine target user ID
    let targetUserId;
    if (userId === "me") {
      targetUserId = currentUserId;
    } else {
      targetUserId = userId;

      // Check permissions: users can only view their own attempts unless they're admin
      if (currentUserId !== targetUserId && currentUserRole !== "admin") {
        return res.status(403).json({
          message: "Access denied. You can only view your own quiz attempts.",
        });
      }
    }

    // Convert string ID to ObjectId for MongoDB query
    const userObjectId = new mongoose.Types.ObjectId(targetUserId);

    console.log(
      "Fetching attempts for user:",
      targetUserId,
      "ObjectId:",
      userObjectId
    ); // Debug log

    // Fetch quiz attempts with populated question set data
    const attempts = await AnswerModel.find({ user: userObjectId })
      .populate({
        path: "questionSet",
        select: "title description",
      })
      .sort({ createdAt: -1 }) // Most recent first
      .lean(); // Use lean() for better performance

    console.log("Found attempts:", attempts.length); // Debug log

    // Transform the data to match frontend expectations
    const formattedAttempts = attempts.map((attempt) => ({
      _id: attempt._id,
      questionSet: {
        _id: attempt.questionSet._id,
        title: attempt.questionSet.title,
        description: attempt.questionSet.description,
      },
      score: attempt.score,
      total: attempt.total,
      percentage:
        attempt.total > 0
          ? Math.round((attempt.score / attempt.total) * 100)
          : 0,
      attemptedAt: attempt.createdAt,
      responses: attempt.responses || [],
    }));

    res.status(200).json({
      message: "Quiz attempts retrieved successfully",
      attempts: formattedAttempts,
      totalAttempts: formattedAttempts.length,
    });
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    res.status(500).json({
      message: "Error retrieving quiz attempts",
      error: error.message,
    });
  }
}

// Get quiz attempt statistics for a user
async function getUserQuizStatsController(req, res) {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;
    const mongoose = require("mongoose");

    // Determine target user ID
    let targetUserId;
    if (userId === "me") {
      targetUserId = currentUserId;
    } else {
      targetUserId = userId;

      if (currentUserId !== targetUserId && currentUserRole !== "admin") {
        return res.status(403).json({
          message: "Access denied.",
        });
      }
    }

    console.log("Fetching stats for user:", targetUserId); // Debug log

    // Convert string ID to ObjectId for MongoDB query
    const userObjectId = new mongoose.Types.ObjectId(targetUserId);

    // First, let's get a simple count to debug
    const totalCount = await AnswerModel.countDocuments({ user: userObjectId });
    console.log("Total attempts found:", totalCount); // Debug log

    // Aggregate quiz statistics with proper ObjectId conversion
    const stats = await AnswerModel.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: 1 },
          totalScore: { $sum: "$score" },
          totalQuestions: { $sum: "$total" },
          averageScore: {
            $avg: {
              $cond: {
                if: { $gt: ["$total", 0] },
                then: { $divide: ["$score", "$total"] },
                else: 0,
              },
            },
          },
          highestScore: {
            $max: {
              $cond: {
                if: { $gt: ["$total", 0] },
                then: { $divide: ["$score", "$total"] },
                else: 0,
              },
            },
          },
          lowestScore: {
            $min: {
              $cond: {
                if: { $gt: ["$total", 0] },
                then: { $divide: ["$score", "$total"] },
                else: 0,
              },
            },
          },
        },
      },
    ]);

    console.log("Aggregation result:", stats); // Debug log

    const result = stats[0] || {
      totalAttempts: 0,
      totalScore: 0,
      totalQuestions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
    };

    const formattedStats = {
      ...result,
      averagePercentage: Math.round((result.averageScore || 0) * 100),
      highestPercentage: Math.round((result.highestScore || 0) * 100),
      lowestPercentage: Math.round((result.lowestScore || 0) * 100),
    };

    console.log("Formatted stats:", formattedStats); // Debug log

    res.status(200).json({
      message: "Quiz statistics retrieved successfully",
      stats: formattedStats,
    });
  } catch (error) {
    console.error("Error fetching quiz stats:", error);
    res.status(500).json({
      message: "Error retrieving quiz statistics",
      error: error.message,
    });
  }
}
module.exports = {
  listQuestionSetController,
  getQuestionSetController,
  saveAttemptedQuestionController,
  deleteQuestionSetController,
  getUserQuizAttemptsController,
  getUserQuizStatsController,
};
