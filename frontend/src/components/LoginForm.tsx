import axios, { AxiosError } from "axios";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext, type IAuthContext } from "../App";
import Quizmode from "../assets/css/animatons/Quizmode.json";
import "../assets/css/register.css";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setAuthState } = useContext<IAuthContext>(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);

      const { role }: { role: "admin" | "professional" } = JSON.parse(
        atob(token.split(".")[1])
      );
      setAuthState({ isAuth: true, role });

      toast.success("User Logged In Successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
      navigate("/home", { replace: true });

      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      console.error("Login error:", error);
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message
          : "An error occurred. Try again.";
      toast.error(message, { position: "bottom-right", autoClose: 3000 });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Left side: Lottie animation */}
      <div className="hidden md:flex justify-center items-center relative ">
        <Lottie animationData={Quizmode} loop className="w-screen h-screen o" />
      </div>

      {/* Right side: Login form */}
      <div className="flex justify-center items-start pt-20 px-6">
        <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 p-10 rounded-3xl shadow-2xl backdrop-blur-md animate-fade-in-up glow-all-around">
          <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-800 dark:text-yellow-400">
            Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field w-full px-4 py-2 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-400 dark:bg-gray-800 hover:dark:bg-gray-600 hover:scale-105 transition-transform duration-200 text-white py-3 rounded-xl font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
