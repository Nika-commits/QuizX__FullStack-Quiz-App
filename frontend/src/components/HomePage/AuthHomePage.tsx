import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import MyInformation from "../MyInformation";

export interface IAuthUserList {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
  __v: number;
}

function AuthHomePage() {
  const [users, setUsers] = useState<IAuthUserList[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    async function fetchData() {
      axios
        .get("http://localhost:3000/users/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const UserList: IAuthUserList[] = response?.data?.users || [];
          setUsers(UserList);
        })
        .catch((error) => {
          console.error("Error:", error);
          const errors = error?.response?.data?.message || "An error occurred";
          alert(errors);
        });
    }
    fetchData();
  }, []);

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 w-full">
      {users.length === 0 ? (
        <div className="h-screen w-full flex justify-center items-center">
          <p className="text-gray-500">Users are Not Available</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            All Available Users
          </h1>

          <div className="space-y-4">
            {users?.map((user) => {
              return (
                <div key={user._id} className="w-full">
                  <MyInformation
                    id={user?._id}
                    name={user?.name}
                    email={user?.email}
                    age={user?.age}
                    onClick={() => handleUserClick(user._id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthHomePage;
