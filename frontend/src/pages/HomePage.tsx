import { useContext } from "react";
import { AuthContext } from "../App";
import AuthHomePage from "../components/HomePage/AuthHomePage";
import UnAuthHomePage from "../components/HomePage/UnAuthHomePage";

function HomePage() {
  const { isAuth } = useContext(AuthContext);
  return (
    <div className=" dark:bg-gray-900">
      {isAuth ? <AuthHomePage /> : <UnAuthHomePage />}
    </div>
  );
}

export default HomePage;
