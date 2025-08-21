const { mongoose } = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    bio: String,
    profilePicture: String,
    skills: [
      {
        name: String,
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced"],
          default: "Beginner",
        },
      },
    ],
    github: String,
    linkedin: String,
    portfolioUrl: String,
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

const Profile = mongoose.model("Profile", profileSchema); // ✅ Fixed: was userSchema
module.exports = Profile;
