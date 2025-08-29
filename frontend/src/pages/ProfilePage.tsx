// Updated ProfilePage with proper admin edit button logic
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import DeleteConfirmationModal from "../components/DeleteConfirmationModalProps";
import EditProfileForm from "../components/EditProfileForm";

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface Profile {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    age?: number;
  };
  bio?: string;
  profilePicture?: string;
  skills: Skill[];
  github?: string;
  linkedin?: string;
  portfolioUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfilePageProps {
  isAdmin?: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isAdmin = false }) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { role } = useContext<IAuthContext>(AuthContext);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Determine if viewing own profile or someone else's
  const isOwnProfile = !userId;
  const isViewingOtherProfile = !!userId && !editing;

  // Check if current user is admin using AuthContext
  const currentUserIsAdmin = role === "admin";

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("accessToken");
      const endpoint = userId
        ? `http://localhost:3000/users/profile/${userId}`
        : "http://localhost:3000/users/profile/me";

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProfile(response.data.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError("User profile not found");
        } else if (error.response?.status === 401) {
          setError("Unauthorized access");
        } else {
          setError("Error loading profile");
        }
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditSuccess = () => {
    setEditing(false);
    fetchProfile();
  };

  const handleEditCancel = () => {
    setEditing(false);
  };

  const handleDeleteUser = () => {
    if (profile && userId) {
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!profile || !userId) return;

    setIsDeleting(true);
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Authentication token not found. Please log in again.");
      setIsDeleting(false);
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/admin/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Navigate back to home after successful deletion
      navigate("/home");
    } catch (error) {
      console.error("Failed to delete user:", error);

      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "An unexpected error occurred";
      alert(
        `Delete Failed!\n\n` +
          `Error: ${errorMessage}\n\n` +
          `User "${profile.user.name}" was NOT deleted. Please try again.`
      );
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || "Profile not found"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The profile you're looking for could not be loaded.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/home")}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-200"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Updated logic: Show edit button if it's own profile OR if current user is admin
  const shouldShowEditButton = isOwnProfile || currentUserIsAdmin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button - Only show when viewing other user's profile */}
        {isViewingOtherProfile && (
          <div className="mb-6">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </button>
          </div>
        )}

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {getInitials(profile.user.name)}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile.user.name}
                  {currentUserIsAdmin && userId && (
                    <span className="text-sm text-gray-500 ml-2">
                      (Admin View)
                    </span>
                  )}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {profile.user.email}
                </p>
                {profile.user.age && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Age: {profile.user.age} years old
                  </p>
                )}
              </div>
            </div>

            {/* Show edit button for own profile OR when admin views any profile */}
            {shouldShowEditButton && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-200"
                >
                  {editing
                    ? "View Profile"
                    : `${
                        currentUserIsAdmin && userId
                          ? "Edit User Profile"
                          : "Edit Profile"
                      }`}
                </button>

                {/* Delete button - Only show for admin viewing other user's profile */}
                {currentUserIsAdmin && userId && !editing && (
                  <button
                    onClick={handleDeleteUser}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200"
                  >
                    Delete User
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {editing ? (
          /* Edit Form Component */
          <EditProfileForm
            profile={profile}
            onCancel={handleEditCancel}
            onSuccess={handleEditSuccess}
            isAdmin={currentUserIsAdmin}
            targetUserId={userId}
          />
        ) : (
          /* Profile Display */
          <div className="space-y-8">
            {/* Bio Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About {isOwnProfile ? "You" : profile.user.name.split(" ")[0]}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {profile.bio ||
                  `${
                    isOwnProfile ? "You haven't" : `${profile.user.name} hasn't`
                  } added a bio yet.${
                    isOwnProfile ? ' Click "Edit Profile" to add one.' : ""
                  }`}
              </p>
            </div>

            {/* Links Section */}
            {(profile.github || profile.linkedin || profile.portfolioUrl) && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Links
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">GH</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        GitHub
                      </span>
                    </a>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">LI</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        LinkedIn
                      </span>
                    </a>
                  )}

                  {profile.portfolioUrl && (
                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">PF</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        Portfolio
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Skills
              </h2>
              {profile.skills && profile.skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-all duration-300"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          skill.level === "Advanced"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : skill.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 italic text-lg">
                    {isOwnProfile
                      ? 'No skills added yet. Click "Edit Profile" to add your skills.'
                      : `${
                          profile.user.name.split(" ")[0]
                        } hasn't added any skills yet.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal - Only for admin */}
      {currentUserIsAdmin && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          userName={profile?.user.name || ""}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default ProfilePage;
