import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext, type IAuthContext } from "../App";
import "../assets/css/navbar.css";

function Navbar() {
  const { isAuth, role, setAuthState } = useContext<IAuthContext>(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const LogoutHandler = () => {
    localStorage.removeItem("accessToken");
    toast.success("User Logged Out Successfully");
    navigate("/");
    setIsMobileMenuOpen(false); // Close mobile menu after logout

    if (setAuthState) {
      setAuthState((prev) => ({
        ...prev,
        isAuth: false,
        role: "guest",
      }));
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md">
      <div className="w-full m-auto p-auto py-6 flex items-center justify-between">
        {/* Left: Logo or placeholder */}
        <div className="ml-4 lg:ml-12 text-xl lg:text-2xl font-bold p-1 m-1 text-blue-600 dark:text-yellow-400">
          <img
            src="/icon.png"
            alt="QuizX Logo"
            className="inline-block h-6 lg:h-8"
          />
          {"  "}QuizX{" "}
          <span className="hidden sm:inline text-xs font-medium text-gray-500 dark:text-gray-400">
            Your Quiz Companion
          </span>
        </div>

        {/* Center: Nav Links - Desktop Only */}
        <div className="hidden lg:flex gap-12 space-x-12">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            About Us
          </NavLink>

          {isAuth && (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-link"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/questionset/list"
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-link"
                }
              >
                QuestionSet
              </NavLink>

              {/* Admin-only link */}
              {role === "admin" && (
                <NavLink
                  to="/admin/questionset/create"
                  className={({ isActive }) =>
                    isActive ? "nav-active" : "nav-link"
                  }
                >
                  Create Question Set
                </NavLink>
              )}
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-link"
                }
              >
                Leaderboard
              </NavLink>
            </>
          )}
        </div>

        {/* Right: Auth Section - Desktop Only */}
        <div className="hidden lg:flex items-center mr-8 space-x-4">
          {isAuth ? (
            <div className="flex items-center space-x-4">
              {/* Show role badge */}
              {role === "admin" && (
                <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                  Admin
                </span>
              )}
              {role === "professional" && (
                <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                  Professional
                </span>
              )}
              <button
                onClick={LogoutHandler}
                className="px-4 py-2 mr-8 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:from-purple-700 hover:to-blue-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-link"
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-link"
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            {/* Mobile Navigation Links */}
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              }
            >
              About Us
            </NavLink>

            {isAuth && (
              <>
                <NavLink
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                      : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/questionset/list"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                      : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  }
                >
                  QuestionSet
                </NavLink>

                {/* Admin-only link */}
                {role === "admin" && (
                  <NavLink
                    to="/admin/questionset/create"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                        : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    }
                  >
                    Create Question Set
                  </NavLink>
                )}
                <NavLink
                  to="/leaderboard"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                      : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  }
                >
                  Leaderboard
                </NavLink>
              </>
            )}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {isAuth ? (
                <div className="space-y-3">
                  {/* Role badges */}
                  <div className="px-3">
                    {role === "admin" && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        Admin
                      </span>
                    )}
                    {role === "professional" && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                        Professional
                      </span>
                    )}
                  </div>
                  <button
                    onClick={LogoutHandler}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <NavLink
                    to="/register"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                        : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    }
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-yellow-400 bg-blue-50 dark:bg-gray-800"
                        : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    }
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
