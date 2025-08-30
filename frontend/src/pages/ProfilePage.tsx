// Fixed ProfilePage with resolved TypeScript and ESLint errors
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
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

interface QuizAttempt {
  _id: string;
  questionSet: {
    _id: string;
    title: string;
    description?: string;
  };
  score: number;
  total: number;
  percentage: number;
  attemptedAt: string;
  responses: {
    questionId: string;
    selectedChoiceIds: string[];
  }[];
}

interface QuizStats {
  totalAttempts: number;
  totalScore: number;
  totalQuestions: number;
  averagePercentage: number;
  highestPercentage: number;
  lowestPercentage: number;
}

// Removed unused isAdmin prop
const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { role } = useContext<IAuthContext>(AuthContext);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizLoading, setQuizLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Determine if viewing own profile or someone else's
  const isOwnProfile = !userId;
  const isViewingOtherProfile = !!userId && !editing;

  // Check if current user is admin using AuthContext
  const currentUserIsAdmin = role === "admin";

  // Wrap fetch functions in useCallback to prevent unnecessary re-renders
  const fetchProfile = useCallback(async () => {
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
  }, [userId]);

  const fetchQuizAttempts = useCallback(async () => {
    try {
      setQuizLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      const targetUserId = userId || "me";
      const endpoint = `http://localhost:3000/api/questions/quiz-attempts/${targetUserId}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setQuizAttempts(response.data.attempts || []);
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
      setQuizAttempts([]);
    } finally {
      setQuizLoading(false);
    }
  }, [userId]);

  const fetchQuizStats = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const targetUserId = userId || "me";
      const endpoint = `http://localhost:3000/api/questions/quiz-stats/${targetUserId}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setQuizStats(response.data.stats || null);
    } catch (error) {
      console.error("Error fetching quiz stats:", error);
      setQuizStats(null);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
    fetchQuizAttempts();
    fetchQuizStats();
  }, [fetchProfile, fetchQuizAttempts, fetchQuizStats]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 dark:text-green-400";
    if (percentage >= 80) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 70) return "text-yellow-600 dark:text-yellow-400";
    if (percentage >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 90)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (percentage >= 80)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (percentage >= 70)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    if (percentage >= 60)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
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
          <EditProfileForm
            profile={profile}
            onCancel={handleEditCancel}
            onSuccess={handleEditSuccess}
            isAdmin={currentUserIsAdmin}
            targetUserId={userId}
          />
        ) : (
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

            {/* Quiz History Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Quiz Performance
                </h2>
                {quizAttempts.length > 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {quizAttempts.length} quiz
                    {quizAttempts.length !== 1 ? "es" : ""} completed
                  </div>
                )}
              </div>

              {quizLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Loading quiz history...
                  </p>
                </div>
              ) : quizAttempts.length > 0 ? (
                <div className="space-y-6">
                  {/* Quiz Statistics Overview */}
                  {quizStats && (
                    <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Quiz Statistics
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-500">
                            {quizStats.totalAttempts}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Quizzes
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${getScoreColor(
                              quizStats.averagePercentage
                            )}`}
                          >
                            {quizStats.averagePercentage}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Average Score
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${getScoreColor(
                              quizStats.highestPercentage
                            )}`}
                          >
                            {quizStats.highestPercentage}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Best Score
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                            {quizStats.totalScore}/{quizStats.totalQuestions}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Correct
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quiz Attempts List */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recent Quiz Attempts
                    </h3>
                    <div className="space-y-4">
                      {quizAttempts.map((attempt) => (
                        <div
                          key={attempt._id}
                          className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {attempt.questionSet.title}
                            </h4>
                            {attempt.questionSet.description && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                {attempt.questionSet.description}
                              </p>
                            )}
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="text-gray-500 dark:text-gray-400">
                                Completed on {formatDate(attempt.attemptedAt)}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                •
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                {attempt.responses.length} questions answered
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 ml-6">
                            {/* Score Display */}
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-2xl font-bold ${getScoreColor(
                                    attempt.percentage
                                  )}`}
                                >
                                  {attempt.score}
                                </span>
                                <span className="text-lg text-gray-400 dark:text-gray-500">
                                  /
                                </span>
                                <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                                  {attempt.total}
                                </span>
                              </div>
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBadge(
                                  attempt.percentage
                                )}`}
                              >
                                {attempt.percentage.toFixed(0)}%
                              </span>
                            </div>

                            {/* Grade Icon */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                              {attempt.percentage >= 90 ? (
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : attempt.percentage >= 70 ? (
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    No Quiz History
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {isOwnProfile
                      ? "You haven't completed any quizzes yet."
                      : `${
                          profile.user.name.split(" ")[0]
                        } hasn't completed any quizzes yet.`}
                  </p>
                  {isOwnProfile && (
                    <button
                      onClick={() => navigate("/questionset/list")}
                      className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-200"
                    >
                      Take Your First Quiz
                    </button>
                  )}
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
