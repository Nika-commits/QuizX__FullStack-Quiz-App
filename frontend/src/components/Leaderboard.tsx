import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FullPageLoading } from "../components/LoadingComponents";

interface LeaderboardUser {
  _id: string;
  name: string;
  email: string;
  totalQuizzes: number;
  totalScore: number;
  totalQuestions: number;
  averagePercentage: number;
  highestPercentage: number;
  rank: number;
}

interface LeaderboardFilters {
  timeframe: "all" | "week" | "month" | "year";
  sortBy: "average" | "total" | "quizzes";
  limit: number;
}

function Leaderboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LeaderboardFilters>({
    timeframe: "all",
    sortBy: "average",
    limit: 50,
  });

  const fetchLeaderboard = useCallback(async () => {
    try {
      // setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Please log in to view the leaderboard");
        return;
      }

      const params = new URLSearchParams({
        timeframe: filters.timeframe,
        sortBy: filters.sortBy,
        limit: filters.limit.toString(),
      });

      const response = await axios.get(
        `http://localhost:3000/api/questions/leaderboard?${params}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUsers(response.data.leaderboard || []);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else {
        setError("Failed to load leaderboard. Please try again.");
      }
      setUsers([]);
    } finally {
      // setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-yellow-500"; // Gold
    if (rank === 2) return "from-gray-300 to-gray-400"; // Silver
    if (rank === 3) return "from-orange-400 to-orange-500"; // Bronze
    return "from-blue-400 to-blue-500"; // Default
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    if (rank === 2) {
      return (
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
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      );
    }
    if (rank === 3) {
      return (
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
      );
    }
    return <span className="text-white font-bold text-lg">#{rank}</span>;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 dark:text-green-400";
    if (percentage >= 80) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 70) return "text-yellow-600 dark:text-yellow-400";
    if (percentage >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  // if (loading) {
  //   return <FullPageLoading message="Loading leaderboard..." />;
  // }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Error Loading Leaderboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchLeaderboard}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Animated Header */}
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            See how you rank against other quiz takers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Animated Filters */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {/* Timeframe Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Timeframe:
              </label>
              <select
                value={filters.timeframe}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    timeframe: e.target
                      .value as LeaderboardFilters["timeframe"],
                  })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
              >
                <option value="all">All Time</option>
                <option value="year">This Year</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>

            {/* Sort By Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort by:
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value as LeaderboardFilters["sortBy"],
                  })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
              >
                <option value="average">Average Score</option>
                <option value="total">Total Score</option>
                <option value="quizzes">Quiz Count</option>
              </select>
            </div>

            {/* Limit Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show:
              </label>
              <select
                value={filters.limit}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    limit: parseInt(e.target.value),
                  })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
              >
                <option value={10}>Top 10</option>
                <option value={25}>Top 25</option>
                <option value={50}>Top 50</option>
                <option value={100}>Top 100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Content */}
        {users.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="text-center">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No Quiz Data Available
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Be the first to complete a quiz and appear on the leaderboard!
              </p>
              <button
                onClick={() => navigate("/questionset/list")}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105"
              >
                Take a Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Animated Top 3 Podium */}
            {users.length >= 3 && (
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in-up"
                style={{ animationDelay: "300ms" }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Top Performers
                </h2>
                <div className="flex items-end justify-center gap-4 md:gap-8">
                  {/* Second Place */}
                  {users[1] && (
                    <div
                      className="text-center animate-fade-in-up"
                      style={{ animationDelay: "400ms" }}
                    >
                      <div className="relative mb-4">
                        <div
                          className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => handleUserClick(users[1]._id)}
                        >
                          {getInitials(users[1].name)}
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            2
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {users[1].name.split(" ")[0]}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {users[1].averagePercentage.toFixed(1)}% avg
                      </p>
                    </div>
                  )}

                  {/* First Place */}
                  <div
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: "300ms" }}
                  >
                    <div className="relative mb-4">
                      <div
                        className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleUserClick(users[0]._id)}
                      >
                        {getInitials(users[0].name)}
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                        {getRankIcon(1)}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                      {users[0].name.split(" ")[0]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {users[0].averagePercentage.toFixed(1)}% avg
                    </p>
                  </div>

                  {/* Third Place */}
                  {users[2] && (
                    <div
                      className="text-center animate-fade-in-up"
                      style={{ animationDelay: "500ms" }}
                    >
                      <div className="relative mb-4">
                        <div
                          className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => handleUserClick(users[2]._id)}
                        >
                          {getInitials(users[2].name)}
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            3
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {users[2].name.split(" ")[0]}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {users[2].averagePercentage.toFixed(1)}% avg
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Animated Full Leaderboard Table */}
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Rankings
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Quizzes
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Total Score
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Average
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Best Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] animate-fade-in-up"
                        style={{ animationDelay: `${500 + index * 100}ms` }}
                        onClick={() => handleUserClick(user._id)}
                      >
                        {/* Rank */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(
                                user.rank
                              )} flex items-center justify-center mr-3 shadow-lg hover:scale-110 transition-transform`}
                            >
                              {user.rank <= 3 ? (
                                getRankIcon(user.rank)
                              ) : (
                                <span className="text-white font-bold text-sm">
                                  #{user.rank}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* User Info */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4 hover:scale-110 transition-transform">
                              {getInitials(user.name)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Quiz Count */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.totalQuizzes}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            quizzes
                          </div>
                        </td>

                        {/* Total Score */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.totalScore}/{user.totalQuestions}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            correct
                          </div>
                        </td>

                        {/* Average Percentage */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div
                            className={`text-lg font-bold ${getScoreColor(
                              user.averagePercentage
                            )}`}
                          >
                            {user.averagePercentage.toFixed(1)}%
                          </div>
                        </td>

                        {/* Best Score */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div
                            className={`text-sm font-medium ${getScoreColor(
                              user.highestPercentage
                            )}`}
                          >
                            {user.highestPercentage.toFixed(1)}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Animated Stats Summary */}
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div
                  className="animate-fade-in-up"
                  style={{ animationDelay: "700ms" }}
                >
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    {users.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Active Quiz Takers
                  </div>
                </div>
                <div
                  className="animate-fade-in-up"
                  style={{ animationDelay: "800ms" }}
                >
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    {users.reduce((sum, user) => sum + user.totalQuizzes, 0)}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Total Quizzes Completed
                  </div>
                </div>
                <div
                  className="animate-fade-in-up"
                  style={{ animationDelay: "900ms" }}
                >
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    {users.length > 0
                      ? (
                          users.reduce(
                            (sum, user) => sum + user.averagePercentage,
                            0
                          ) / users.length
                        ).toFixed(1)
                      : 0}
                    %
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Community Average
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }

          .animate-slide-down {
            animation: slide-down 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}

export default Leaderboard;
