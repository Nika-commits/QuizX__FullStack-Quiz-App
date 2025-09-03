// export default RegisterForm;
import axios from "axios";
import Lottie from "lottie-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Illustration from "../assets/css/animatons/Illustration.json"; // your JSON animation
import "../assets/css/register.css";

function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = { name, email, password, age };

    axios
      .post("http://localhost:3000/users/create", finalData)
      .then(() => {
        toast.success("User Created Successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setName("");
        setEmail("");
        setPassword("");
        setAge(18);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        const errors = error?.response?.data?.message || "An error occurred";
        toast.error(errors, { position: "bottom-right", autoClose: 3000 });
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Lottie animation as subtle background */}
      <div className="hidden md:flex justify-center items-center relative ">
        <Lottie
          animationData={Illustration}
          loop
          className="w-screen h-screen"
        />
      </div>

      {/* Optional light overlay to smooth blending */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/20 pointer-events-none"></div>

      {/* Floating registration form */}
      <div className="flex justify-center items-start pt-20 px-6 ">
        <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 p-10 rounded-3xl shadow-2xl backdrop-blur-md animate-fade-in-up glow-all-around">
          <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-800 dark:text-yellow-400">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
            Register to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            {/* Age control */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-blue-600 hover:scale-110 font-bold transition duration-300 ease-in-out"
                onClick={() => setAge((prev) => prev + 1)}
              >
                Increase Age
              </button>
              <button
                type="button"
                className="text-red-600 hover:scale-110 font-bold transition duration-300 ease-in-out"
                onClick={() => setAge((prev) => prev - 1)}
              >
                Decrease Age
              </button>
            </div>
            <p className="text-center text-gray-600 text-lg">
              Your age is: {age}
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-400 dark:bg-gray-800 hover:dark:bg-gray-600 hover:scale-105 transition-transform duration-200 text-white py-3 rounded-xl font-semibold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
