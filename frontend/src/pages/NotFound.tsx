import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 404 Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
        <div className="absolute right-0 top-0 w-1/3 h-full overflow-hidden pointer-events-none hidden lg:block">
          <svg className="absolute w-full h-full" viewBox="0 0 400 800">
            {/* Confused Person - Lost and searching */}
            <g className="animate-pulse" style={{ animationDuration: "4s" }}>
              {/* Person's body */}
              <ellipse
                cx="200"
                cy="400"
                rx="35"
                ry="80"
                className="fill-blue-400 dark:fill-blue-600 opacity-70"
              />

              {/* Arms - one scratching head, one searching */}
              <ellipse
                cx="170"
                cy="380"
                rx="12"
                ry="40"
                className="fill-yellow-300 dark:fill-yellow-700 opacity-70"
                transform="rotate(-45 170 380)"
              />
              <ellipse
                cx="230"
                cy="380"
                rx="12"
                ry="40"
                className="fill-yellow-300 dark:fill-yellow-700 opacity-70"
                transform="rotate(45 230 380)"
              />

              {/* Person's head */}
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

              {/* Confused eyes - X marks */}
              <path
                d="M185 290 L195 300 M195 290 L185 300"
                stroke="currentColor"
                strokeWidth="3"
                className="stroke-gray-800 dark:stroke-gray-200"
              />
              <path
                d="M205 290 L215 300 M215 290 L205 300"
                stroke="currentColor"
                strokeWidth="3"
                className="stroke-gray-800 dark:stroke-gray-200"
              />

              {/* Frown */}
              <path
                d="M185 315 Q200 305 215 315"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="stroke-gray-700 dark:stroke-gray-300"
              />

              {/* Magnifying glass in hand */}
              <circle
                cx="245"
                cy="350"
                r="15"
                className="fill-none stroke-gray-600 stroke-3 opacity-80"
              />
              <line
                x1="255"
                y1="360"
                x2="265"
                y2="370"
                className="stroke-gray-600 stroke-4"
              />
            </g>

            {/* Floating Error Symbols */}
            <g
              className="animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              <circle
                cx="320"
                cy="150"
                r="25"
                className="fill-red-100 dark:fill-red-900 opacity-60 stroke-red-400 stroke-2"
              />
              <text
                x="305"
                y="158"
                className="text-2xl fill-red-600 dark:fill-red-400 font-bold"
              >
                404
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
                className="fill-orange-100 dark:fill-orange-900 opacity-60 stroke-orange-400 stroke-2"
              />
              <text
                x="90"
                y="208"
                className="text-3xl fill-orange-600 dark:fill-orange-400 font-bold"
              >
                ⚠
              </text>
            </g>

            <g
              className="animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "5s" }}
            >
              <circle
                cx="350"
                cy="250"
                r="28"
                className="fill-yellow-100 dark:fill-yellow-900 opacity-60 stroke-yellow-400 stroke-2"
              />
              <text
                x="335"
                y="260"
                className="text-2xl fill-yellow-600 dark:fill-yellow-400 font-bold"
              >
                ERROR
              </text>
            </g>

            {/* Broken Link Chain */}
            <g
              className="animate-pulse"
              style={{ animationDelay: "0.5s", animationDuration: "3s" }}
            >
              <ellipse
                cx="280"
                cy="100"
                rx="12"
                ry="8"
                className="fill-none stroke-gray-500 stroke-3 opacity-70"
                transform="rotate(45 280 100)"
              />
              <ellipse
                cx="300"
                cy="120"
                rx="12"
                ry="8"
                className="fill-none stroke-gray-500 stroke-3 opacity-70"
                transform="rotate(45 300 120)"
              />
              {/* Broken connection */}
              <path
                d="M285 105 L295 115"
                stroke="currentColor"
                strokeWidth="4"
                className="stroke-red-500 opacity-80"
                strokeDasharray="2,2"
              />
            </g>

            {/* Scattered Question Marks */}
            <g
              className="animate-bounce"
              style={{ animationDelay: "1.5s", animationDuration: "4s" }}
            >
              <circle
                cx="80"
                cy="500"
                r="20"
                className="fill-blue-100 dark:fill-blue-900 opacity-40"
              />
              <text
                x="70"
                y="510"
                className="text-2xl fill-blue-600 dark:fill-blue-400 font-bold"
              >
                ?
              </text>
            </g>

            {/* Dead End Sign */}
            <g
              className="animate-pulse"
              style={{ animationDelay: "2.5s", animationDuration: "3s" }}
            >
              <rect
                x="280"
                y="580"
                width="60"
                height="30"
                rx="4"
                className="fill-red-400 dark:fill-red-600 opacity-70 stroke-red-600 stroke-2"
              />
              <text x="290" y="600" className="text-xs fill-white font-bold">
                DEAD END
              </text>
              <rect
                x="305"
                y="610"
                width="10"
                height="20"
                className="fill-gray-600 opacity-70"
              />
            </g>

            {/* More Question Marks scattered */}
            <text
              x="50"
              y="100"
              className="text-4xl fill-gray-300 dark:fill-gray-700 opacity-30 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              ?
            </text>
            <text
              x="350"
              y="700"
              className="text-3xl fill-gray-300 dark:fill-gray-700 opacity-30 animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "3.5s" }}
            >
              ?
            </text>
            <text
              x="120"
              y="650"
              className="text-2xl fill-gray-300 dark:fill-gray-700 opacity-20 animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
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
                className={`inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm font-medium transition-all duration-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                Page Not Found
              </div>

              <div
                className={`text-8xl sm:text-9xl lg:text-[12rem] font-extrabold text-gray-200 dark:text-gray-700 leading-none transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                404
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
                Oops! This Quiz{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  Went Missing!
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
                The page you're looking for seems to have vanished into the
                digital void. Don't worry though - there are plenty of amazing
                quizzes waiting for you back home!
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
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 hover:scale-110 hover:shadow-2xl text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform text-lg group"
                >
                  Back to Home
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 hover:scale-110 hover:shadow-2xl text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform text-lg"
                >
                  Go Back
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              {/* This space is reserved for the absolutely positioned illustration */}
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Links Section */}
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
              While You're Here...
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore these popular sections of our quiz platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-yellow-400 group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: "1.2s" }}
              onClick={() => navigate("/register")}
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-yellow-500 transition-colors duration-300">
                Start Quizzing
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create your account and dive into thousands of engaging quizzes
                across all topics.
              </p>
            </div>

            <div
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-blue-400 group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: "1.4s" }}
              onClick={() => navigate("/login")}
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-500 transition-colors duration-300">
                Sign In
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account? Sign in to continue your learning
                journey and track your progress.
              </p>
            </div>

            <div
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-green-400 group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: "1.6s" }}
              onClick={() => navigate("/about")}
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-500 transition-colors duration-300">
                Learn More
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover more about our platform, mission, and the community of
                learners we've built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
