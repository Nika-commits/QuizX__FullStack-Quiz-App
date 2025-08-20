import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
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
  // isAuth: boolean;
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
          {/* unAuth */}

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />

          {authState?.role == "guest" && (
            <>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}

          {/* Auth */}
          {authState?.isAuth && (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/questionset/list"
                element={<ListQuestionSetPage />}
              />
              <Route
                path="/questionset/:id/attempt"
                element={<AttemptQuizPage />}
              />
            </>
          )}

          {/* Admin */}

          {authState?.role === "admin" && (
            <>
              <Route
                path="/admin/questionset/create"
                element={<CreateQuestionSetPage />}
              />
            </>
          )}
          <Route
            path="*"
            element={<h1 className="text-center text-4xl ">No Page Found</h1>}
          />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
