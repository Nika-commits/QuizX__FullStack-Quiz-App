const QuestionSet = require("../model/QuestionSetModel");
// Add these imports for the delete function to work
const User = require("../model/userModel"); // Adjust path as needed
const Profile = require("../model/ProfileModel"); // Adjust path as needed

async function createQuestionSetController(req, res) {
  const data = req.body;
  const { id, role } = req.user;

  const finalData = {
    ...data,
    createdBy: id,
  };

  const createSet = new QuestionSet(finalData);
  await createSet.save();

  res.status(201).json({
    message: "Question Set Created Successfully",
  });
}

async function deleteUserController(req, res) {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete user's profile first (if exists)
    await Profile.findOneAndDelete({ user: userId });

    // Then delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User and their Profile Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  createQuestionSetController,
  deleteUserController,
};
