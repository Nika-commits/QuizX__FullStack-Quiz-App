const Profile = require("../model/ProfileModel"); // Adjust path as needed
const User = require("../model/userModel");

// Get current user's profile
async function getCurrentUserProfileController(req, res) {
  try {
    const { id: userId } = req.user; // From validateTokenMiddleware

    // Find profile and populate user data
    let profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "-password"
    );

    // If no profile exists, create a basic one
    if (!profile) {
      profile = new Profile({ user: userId });
      await profile.save();
      await profile.populate("user", "-password");
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      profile: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving profile",
      error: error.message,
    });
  }
}

// Update current user's profile
async function updateCurrentUserProfileController(req, res) {
  try {
    const { id: userId } = req.user;
    const updateData = req.body;

    // Remove user field from update data to prevent changing user reference
    delete updateData.user;

    let profile = await Profile.findOneAndUpdate({ user: userId }, updateData, {
      new: true, // Return updated document
      upsert: true, // Create if doesn't exist
      runValidators: true,
    }).populate("user", "-password");

    res.status(200).json({
      message: "Profile updated successfully",
      profile: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
}

// Get any user's profile by user ID (for viewing other profiles)
async function getUserProfileController(req, res) {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "-password"
    );

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      profile: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving profile",
      error: error.message,
    });
  }
}

module.exports = {
  getCurrentUserProfileController,
  updateCurrentUserProfileController,
  getUserProfileController,
};
