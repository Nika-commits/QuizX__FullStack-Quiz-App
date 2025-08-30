import { useEffect } from "react";
import "../assets/css/register.css";
import RegisterForm from "../components/RegisterForm";
function RegisterPage() {
  useEffect(() => {
    document.title = "Register - QuizX";
  }, []);
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
export default RegisterPage;
