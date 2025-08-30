import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext, type IAuthContext } from "../App";
import "../assets/css/register.css";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setAuthState } = useContext<IAuthContext>(AuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = { email, password };
    axios
      .post("http://localhost:3000/users/login", finalData)
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", token);
        alert("User Logged In Successfully");
        setAuthState((prev) => ({
          ...prev,
          isAuth: true,
        }));

        // Navigate("/");
        window.location.href = "/";

        // Clear the form fields after successful login
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
        const errors = error?.response?.data?.message || "An error occurred";
        alert(errors);
      });
  };

  return (
    <div className="grid grid-cols-[65%_40%] min-h-screen dark:bg-gray-900">
      <div className="flex justify-end items-start px-8 pt-16">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl animate-fade-in-up glow-all-around">
          <h1 className="text-4xl font-extrabold mb-4 text-center">Login</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Login to Continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show "}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 dark:bg-gray-800 hover:dark:bg-gray-500 hover:scale-110 text-white py-2 rounded-md font-semibold transition duration-200 transform"
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
