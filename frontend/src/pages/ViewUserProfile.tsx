// ViewUserProfile.tsx - Create this as a NEW file
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface Profile {
  _id: string | null;
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

const ViewUserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId]);

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:3000/users/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProfile(response.data.profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError("User profile not found");
        } else if (error.response?.status === 401) {
          setError("Unauthorized access");
        } else {
          setError("Error loading user profile");
        }
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
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
              The user profile you're looking for could not be loaded.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
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
            Back to Community
          </button>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {getInitials(profile.user.name)}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {profile.user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-1">
                {profile.user.email}
              </p>
              {profile.user.age && (
                <p className="text-gray-600 dark:text-gray-400">
                  Age: {profile.user.age} years old
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-8">
          {/* Bio Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About {profile.user.name.split(" ")[0]}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {profile.bio || `${profile.user.name} hasn't added a bio yet.`}
            </p>
          </div>

          {/* Links Section */}
          {(profile.github || profile.linkedin || profile.portfolioUrl) && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Links & Social
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
              Skills & Expertise
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
                  {profile.user.name.split(" ")[0]} hasn't added any skills yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;
