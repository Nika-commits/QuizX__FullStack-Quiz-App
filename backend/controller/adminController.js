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

// async function editUserController(req, res) {
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;

//     // Check if user exists
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // Update user data
//     const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });

//     res.status(200).json({
//       message: "User Updated Successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Edit user error:", error);
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// }

async function editUserController(req, res) {
  try {
    const userId = req.params.id; // the target user's ID
    const updatedData = req.body;

    // Remove user field to prevent overwriting
    delete updatedData.user;

    // Update the profile document
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      updatedData,
      { new: true, runValidators: true, upsert: true } // upsert ensures profile is created if missing
    ).populate("user", "-password");

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  createQuestionSetController,
  deleteUserController,
  editUserController,
};
