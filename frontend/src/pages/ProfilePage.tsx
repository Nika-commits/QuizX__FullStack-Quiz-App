import axios from "axios";
import { useEffect, useState } from "react";
import MyInformation from "../components/MyInformation";

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  age?: number;
  role?: string;
}

function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:3000/users/current",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        alert("Failed to fetch user information");
      }
    };

    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    // return <div>Loading...</div>;

    return (
      <div className="h-screen w-full flex items-center justify-center dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300">
          Loading Your Profile...
        </p>
      </div>
    );
  }

  return (
    <div className=" h-screen w-full dark:bg-gray-900">
      <MyInformation
        id={currentUser._id}
        name={currentUser.name}
        email={currentUser.email}
        age={currentUser.age}
      />
    </div>
  );
}

export default ProfilePage;
