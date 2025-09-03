"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import study from "../../assets/css/animatons/study.json";
import "../../index.css";

export default function UnAuthHomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-montserrat min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center animate-fade-in-right">
            <div
              className={`text-center lg:text-left space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className={`inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium transition-all duration-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                Test Your Knowledge
              </div>
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white leading-tight sm:leading-snug lg:leading-[1.15] tracking-tight text-balance max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                Elevate Your Knowledge with{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  Fun Quizzes!
                </span>
              </h1>

              <p
                className={`text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed sm:leading-loose max-w-xl mx-auto lg:mx-0 text-pretty transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: "0.6s" }}
              >
                Challenge yourself with engaging quizzes across diverse topics.
                Get instant feedback, track your progress, and join a vibrant
                community of learners.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0 animate-[scaleIn_0.5s_ease-out_0.9s_forwards]"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: "0.8s" }}
              >
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 hover:scale-110 hover:shadow-2xl text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform text-lg group"
                >
                  Start Quizzing Today
                  <svg
                    className="ml-2 h-5 w-5 inline transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 hover:scale-110 hover:shadow-2xl text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform text-lg animate-[scaleIn_0.5s_ease-out_1.0s_forwards]"
                >
                  Sign In
                </button>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-end lg:items-center pl-8">
              <div className="w-full max-w-2xl ml-auto">
                <Lottie
                  animationData={study}
                  loop
                  className="w-full scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto px-4 fadeInUp">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ animationDelay: "1s" }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
              Why Choose Our Quiz Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover what makes our quiz experience unique and engaging
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-yellow-400 group animate-[scaleIn_0.5s_ease-out_1.2s_forwards] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-spin transition-all duration-500">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-yellow-500 transition-colors duration-300">
                Diverse Topics
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore quizzes across science, history, technology, arts, and
                more. There's something for every curious mind.
              </p>
            </div>

            <div
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-blue-400 group animate-[scaleIn_0.5s_ease-out_1.4s_forwards] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse transition-all duration-500">
                <svg
                  className="h-8 w-8 text-white"
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
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-500 transition-colors duration-300">
                Instant Feedback
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get immediate results and detailed explanations. Learn from your
                mistakes and improve with every quiz.
              </p>
            </div>

            <div
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-green-400 group animate-[scaleIn_0.5s_ease-out_1.6s_forwards] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-all duration-500">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-500 transition-colors duration-300">
                Community Challenges
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Compete with friends, join leaderboards, and participate in
                community-wide quiz challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`text-center space-y-4 transition-all duration-1000 animate-[slideInUp_0.6s_ease-out_2.0s_forwards] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ animationDelay: "1.8s" }}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="h-6 w-6 text-yellow-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                QuizX
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering minds through interactive learning
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <button
                onClick={() => navigate("/about")}
                className="hover:text-yellow-400 hover:scale-105 transition-all duration-300 bg-transparent border-none cursor-pointer"
              >
                About Us
              </button>
              <span>•</span>
              <button
                onClick={() => navigate("#")}
                className="hover:text-yellow-400 hover:scale-105 transition-all duration-300 bg-transparent border-none cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => navigate("#")}
                className="hover:text-yellow-400 hover:scale-105 transition-all duration-300 bg-transparent border-none cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
