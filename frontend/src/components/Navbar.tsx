import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import "../assets/css/navbar.css";

function Navbar() {
  const { isAuth, role, setAuthState } = useContext<IAuthContext>(AuthContext);

  const LogoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
    if (setAuthState) {
      setAuthState((prev) => ({
        ...prev,
        isAuth: false,
        role: "guest",
      }));
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="w-full m-auto p-auto py-6 flex items-center justify-between">
        {/* Left: Logo or placeholder */}
        <div className="ml-12 text-2xl font-bold  p-1 m-1 text-blue-600 dark:text-yellow-400">
          <img src="/icon.png" alt="QuizX Logo" className="inline-block h-8" />
          {"  "}QuizX{" "}
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Your Quiz Companion
          </span>
        </div>

        {/* Center: Nav Links */}
        <div className="flex gap-12 space-x-12">
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

        {/* Right: Auth Section */}
        <div className="flex items-center mr-8 space-x-4">
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
      </div>
    </nav>
  );
}

export default Navbar;
