import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
        toast.success("User Created Successfully");
        setName("");
        setEmail("");
        setPassword("");
        setAge(18);
        navigate("/login");
      })

      .catch((error) => {
        console.error("Error:", error);
        const errors = error?.response?.data?.message || "An error occurred";
        toast.error(errors);
      });
  };

  return (
    <div className="grid grid-cols-[65%_35%] min-h-screen dark:bg-gray-900">
      <div className="flex justify-end items-start px-8 pt-16">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl  animate-fade-in-up glow-all-around">
          <h1 className="text-4xl font-extrabold mb-4 text-center">Sign Up</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Register to Continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="text"
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

            <p className="text-center text-2xl text-gray-600">
              Your age is: {age}
            </p>

            <button
              type="submit"
              className="w-full bg-yellow-400 dark:bg-gray-800 hover:dark:bg-gray-500 hover:scale-110 text-white py-2 rounded-md font-semibold transition duration-200 transform"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start px-4 sm:px-8 pt-8 sm:pt-24 animate-fade-in-up">
        <h1 className="text-4xl sm:text-6xl md:text-7xl text-white font-extrabold leading-tight break-words glow-text">
          WELCOME
        </h1>
        <h2 className="text-2xl sm:text-4xl md:text-5xl text-white font-bold mt-4 sm:mt-4 break-words glow-text">
          <span>{name.toUpperCase()}</span>
        </h2>
      </div>
    </div>
  );
}

export default RegisterForm;
