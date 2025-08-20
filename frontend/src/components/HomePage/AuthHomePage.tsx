import axios from "axios";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    async function fetchData() {
      axios
        .get("http://localhost:3000/users/list  ", {
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

  if (users.length === 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300">
          Users are Not Available
        </p>
      </div>
    );
  }

  return (
    <div>
      {users?.map((user, index) => {
        return (
          <MyInformation
            key={index}
            id={user?._id}
            name={user?.name}
            email={user?.email}
            age={user?.age}
          />
        );
      })}
    </div>
  );
}
export default AuthHomePage;
