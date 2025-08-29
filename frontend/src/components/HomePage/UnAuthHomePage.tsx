"use client";

import { useEffect, useState } from "react";

export default function UnAuthHomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
        <div className="absolute right-0 top-0 w-1/3 h-full overflow-hidden pointer-events-none hidden lg:block">
          <svg className="absolute w-full h-full" viewBox="0 0 400 800">
            {/* Realistic Person Reading - More detailed and proportional */}
            <g className="animate-pulse" style={{ animationDuration: "4s" }}>
              {/* Person's body - more realistic proportions */}
              <ellipse
                cx="200"
                cy="400"
                rx="35"
                ry="80"
                className="fill-blue-400 dark:fill-blue-600 opacity-70"
              />

              {/* Arms */}
              <ellipse
                cx="170"
                cy="380"
                rx="12"
                ry="40"
                className="fill-yellow-300 dark:fill-yellow-700 opacity-70"
                transform="rotate(-20 170 380)"
              />
              <ellipse
                cx="230"
                cy="380"
                rx="12"
                ry="40"
                className="fill-yellow-300 dark:fill-yellow-700 opacity-70"
                transform="rotate(20 230 380)"
              />

              {/* Person's head - more realistic */}
              <circle
                cx="200"
                cy="300"
                r="30"
                className="fill-yellow-200 dark:fill-yellow-800 opacity-80"
              />

              {/* Hair */}
              <path
                d="M170 285 Q200 270 230 285 Q225 275 200 275 Q175 275 170 285"
                className="fill-gray-700 dark:fill-gray-300 opacity-60"
              />

              {/* Eyes */}
              <circle
                cx="190"
                cy="295"
                r="3"
                className="fill-gray-800 dark:fill-gray-200"
              />
              <circle
                cx="210"
                cy="295"
                r="3"
                className="fill-gray-800 dark:fill-gray-200"
              />

              {/* Smile */}
              <path
                d="M185 305 Q200 315 215 305"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="stroke-gray-700 dark:stroke-gray-300"
              />

              {/* Realistic Book with pages */}
              <rect
                x="175"
                y="360"
                width="50"
                height="35"
                rx="3"
                className="fill-white dark:fill-gray-200 opacity-90 stroke-gray-400 stroke-2"
              />

              {/* Book spine */}
              <line
                x1="200"
                y1="360"
                x2="200"
                y2="395"
                className="stroke-gray-500 stroke-2"
              />

              {/* Book pages with realistic animation */}
              <g
                className="animate-bounce"
                style={{ animationDelay: "1s", animationDuration: "3s" }}
              >
                <path
                  d="M200 365 Q215 360 225 365 L225 390 Q215 385 200 390 Z"
                  className="fill-gray-100 dark:fill-gray-300 opacity-80"
                />
                <path
                  d="M202 367 Q212 365 220 367 L220 388 Q212 386 202 388 Z"
                  className="fill-white dark:fill-gray-100 opacity-60"
                />
              </g>

              {/* Text lines on book */}
              <line
                x1="180"
                y1="370"
                x2="195"
                y2="370"
                className="stroke-gray-600 stroke-1 opacity-50"
              />
              <line
                x1="180"
                y1="375"
                x2="195"
                y2="375"
                className="stroke-gray-600 stroke-1 opacity-50"
              />
              <line
                x1="180"
                y1="380"
                x2="190"
                y2="380"
                className="stroke-gray-600 stroke-1 opacity-50"
              />
            </g>

            {/* Floating Knowledge Bubbles - repositioned */}
            <g
              className="animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "5s" }}
            >
              <circle
                cx="320"
                cy="150"
                r="25"
                className="fill-yellow-100 dark:fill-yellow-900 opacity-60 stroke-yellow-400 stroke-2"
              />
              <text
                x="310"
                y="158"
                className="text-lg fill-yellow-600 dark:fill-yellow-400 font-bold"
              >
                A+
              </text>
            </g>

            <g
              className="animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "4s" }}
            >
              <circle
                cx="100"
                cy="200"
                r="22"
                className="fill-green-100 dark:fill-green-900 opacity-60 stroke-green-400 stroke-2"
              />
              <svg
                x="88"
                y="188"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-green-600 dark:fill-green-400"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </g>

            <g
              className="animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "6s" }}
            >
              <circle
                cx="350"
                cy="250"
                r="28"
                className="fill-blue-100 dark:fill-blue-900 opacity-60 stroke-blue-400 stroke-2"
              />
              <text
                x="335"
                y="258"
                className="text-lg fill-blue-600 dark:fill-blue-400 font-bold"
              >
                100%
              </text>
            </g>

            {/* Realistic Lightbulb */}
            <g
              className="animate-pulse"
              style={{ animationDelay: "0.5s", animationDuration: "3s" }}
            >
              <circle
                cx="300"
                cy="100"
                r="20"
                className="fill-yellow-200 dark:fill-yellow-700 opacity-70 stroke-yellow-500 stroke-2"
              />
              <rect
                x="292"
                y="120"
                width="16"
                height="12"
                rx="2"
                className="fill-gray-400 dark:fill-gray-600 opacity-70"
              />
              <rect
                x="294"
                y="132"
                width="12"
                height="4"
                rx="1"
                className="fill-gray-500 dark:fill-gray-500 opacity-70"
              />

              {/* Lightbulb rays */}
              <line
                x1="300"
                y1="70"
                x2="300"
                y2="60"
                className="stroke-yellow-400 stroke-3"
              />
              <line
                x1="325"
                y1="85"
                x2="332"
                y2="78"
                className="stroke-yellow-400 stroke-3"
              />
              <line
                x1="275"
                y1="85"
                x2="268"
                y2="78"
                className="stroke-yellow-400 stroke-3"
              />
              <line
                x1="325"
                y1="115"
                x2="332"
                y2="122"
                className="stroke-yellow-400 stroke-3"
              />
              <line
                x1="275"
                y1="115"
                x2="268"
                y2="122"
                className="stroke-yellow-400 stroke-3"
              />
            </g>

            {/* Realistic Stack of Books */}
            <g
              className="animate-bounce"
              style={{ animationDelay: "1.5s", animationDuration: "4s" }}
            >
              <rect
                x="50"
                y="500"
                width="80"
                height="12"
                rx="2"
                className="fill-red-400 dark:fill-red-600 opacity-70 stroke-red-600 stroke-1"
              />
              <rect
                x="55"
                y="488"
                width="70"
                height="12"
                rx="2"
                className="fill-blue-400 dark:fill-blue-600 opacity-70 stroke-blue-600 stroke-1"
              />
              <rect
                x="60"
                y="476"
                width="60"
                height="12"
                rx="2"
                className="fill-green-400 dark:fill-green-600 opacity-70 stroke-green-600 stroke-1"
              />
              <rect
                x="65"
                y="464"
                width="50"
                height="12"
                rx="2"
                className="fill-purple-400 dark:fill-purple-600 opacity-70 stroke-purple-600 stroke-1"
              />

              {/* Book spines */}
              <line
                x1="90"
                y1="500"
                x2="90"
                y2="512"
                className="stroke-red-700 stroke-1"
              />
              <line
                x1="90"
                y1="488"
                x2="90"
                y2="500"
                className="stroke-blue-700 stroke-1"
              />
              <line
                x1="90"
                y1="476"
                x2="90"
                y2="488"
                className="stroke-green-700 stroke-1"
              />
            </g>

            {/* Realistic Graduation Cap */}
            <g
              className="animate-pulse"
              style={{ animationDelay: "2.5s", animationDuration: "3s" }}
            >
              <rect
                x="280"
                y="600"
                width="60"
                height="8"
                rx="4"
                className="fill-gray-800 dark:fill-gray-200 opacity-70"
              />
              <polygon
                points="310,600 325,585 295,585"
                className="fill-gray-800 dark:fill-gray-200 opacity-70"
              />
              <circle
                cx="325"
                cy="590"
                r="3"
                className="fill-yellow-400 opacity-80"
              />
              <line
                x1="325"
                y1="590"
                x2="335"
                y2="580"
                className="stroke-yellow-400 stroke-2"
              />
            </g>

            {/* Subtle Question Marks - repositioned to corners */}
            <text
              x="50"
              y="100"
              className="text-3xl fill-yellow-300 dark:fill-yellow-700 opacity-20 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              ?
            </text>
            <text
              x="350"
              y="700"
              className="text-2xl fill-blue-300 dark:fill-blue-700 opacity-20 animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "3.5s" }}
            >
              ?
            </text>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
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
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold
  text-gray-800 dark:text-white
  leading-tight sm:leading-snug lg:leading-[1.15]
  tracking-tight text-balance max-w-2xl mx-auto lg:mx-0
  transition-all duration-1000 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
                style={{ animationDelay: "0.4s" }}
              >
                Elevate Your Knowledge with{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  Fun Quizzes!
                </span>
              </h1>

              <p
                className={`text-lg sm:text-xl text-gray-600 dark:text-gray-400
  leading-relaxed sm:leading-loose
  max-w-xl mx-auto lg:mx-0 text-pretty
  transition-all duration-1000 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: "0.8s" }}
              >
                <button
                  onClick={() => (window.location.href = "/register")}
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
                  onClick={() => (window.location.href = "/login")}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 hover:scale-110 hover:shadow-2xl text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform text-lg"
                >
                  Sign In
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              {/* This space is reserved for the absolutely positioned illustration */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto px-4">
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
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-yellow-400 group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: "1.2s" }}
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
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-blue-400 group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: "1.4s" }}
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
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-green-400 group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: "1.6s" }}
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
            className={`text-center space-y-4 transition-all duration-1000 ${
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
                QuizApp
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering minds through interactive learning
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <button
                onClick={() => (window.location.href = "/about")}
                className="hover:text-yellow-400 hover:scale-105 transition-all duration-300 bg-transparent border-none cursor-pointer"
              >
                About Us
              </button>
              <span>•</span>
              <button
                onClick={() => (window.location.href = "#")}
                className="hover:text-yellow-400 hover:scale-105 transition-all duration-300 bg-transparent border-none cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => (window.location.href = "#")}
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
