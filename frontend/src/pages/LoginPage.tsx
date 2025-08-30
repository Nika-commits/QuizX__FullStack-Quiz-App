import { useEffect } from "react";
import "../assets/css/register.css";
import LoginForm from "../components/LoginForm";
function LoginPage() {
  useEffect(() => {
    document.title = "Login - QuizX";
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
}
export default LoginPage;
