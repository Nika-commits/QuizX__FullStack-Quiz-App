import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthHomePage from "./components/HomePage/AuthHomePage";
import Navbar from "./components/Navbar";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AttemptQuizPage from "./pages/QuestionSet/AttemptQuizPage";
import CreateQuestionSetPage from "./pages/QuestionSet/CreateQuestionSetPage";
import ListQuestionSetPage from "./pages/QuestionSet/ListQuestionSetPage";
import RegisterPage from "./pages/RegisterPage";

export interface IAuthState {
  isAuth: boolean;
  role: "admin" | "professional" | "guest";
}
export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JwtDecode {
  id: string;
  role: "admin" | "professional";
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  role: "guest",
  setAuthState: () => {},
});

function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuth: false,
    role: "guest",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log("auth => ", authState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setAuthState({ isAuth: false, role: "guest" });
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/verify/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const { role }: JwtDecode = jwtDecode(accessToken as string);

          setAuthState((prev) => ({
            ...prev,
            isAuth: true,
            role,
          }));
          setIsLoading(false);
        })
        .catch((error) => {
          localStorage.removeItem("accessToken");
          setIsLoading(false);
        });
    }
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth: authState.isAuth,
          role: authState.role,
          setAuthState: setAuthState,
        }}
      >
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />

          {/* Guest-only routes */}
          {authState?.role == "guest" && (
            <>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}

          {/* Authenticated user routes */}
          {authState?.isAuth && (
            <>
              <Route path="/home" element={<AuthHomePage />} />

              {/* Profile routes - using single ProfilePage component */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/me" element={<ProfilePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />

              {/* Quiz routes */}
              <Route
                path="/questionset/list"
                element={<ListQuestionSetPage />}
              />
              <Route
                path="/questionset/:id/attempt"
                element={<AttemptQuizPage />}
              />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </>
          )}

          {/* Admin-only routes */}
          {authState?.role === "admin" && (
            <>
              <Route
                path="/admin/questionset/create"
                element={<CreateQuestionSetPage />}
              />
              {/* Admin profile editing */}
              <Route
                path="/admin/edit/:userId"
                element={<ProfilePage isAdmin={true} />}
              />
            </>
          )}

          <Route
            path="*"
            element={<h1 className="text-center text-4xl ">No Page Found</h1>}
          />
        </Routes>
      </AuthContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
