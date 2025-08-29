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
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [usersToDelete, setUsersToDelete] = useState<IAuthUserList | null>(
  //   null
  // );
  // const [isDeleting, setIsDeleting] = useState(false);
  // const [editing, setEditing] = useState(false);

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

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Navigates to the user profile page for the given userId.
   * @param {string} userId The user ID to n avigate to.
   */
  /*******  3490296c-dacc-4087-bf5d-c061a77b7a41  *******/
  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  // const handleEditUser = (userId: string) => {
  //   navigate(`/admin/edit/${userId}`);
  // };

  // const handleDeleteUser = async (userId: string) => {
  //   const user = users.find((u) => u._id === userId);
  //   if (user) {
  //     setUsersToDelete(user);
  //     setShowDeleteModal(true);
  //   }
  // };

  // const handleConfirmDelete = async () => {
  //   if (!usersToDelete) return;

  //   setIsDeleting(true);
  //   const accessToken = localStorage.getItem("accessToken");

  //   if (!accessToken) {
  //     alert("❌ Authentication token not found. Please log in again.");
  //     setIsDeleting(false);
  //     return;
  //   }

  //   try {
  //     await axios.delete(
  //       `http://localhost:3000/api/admin/${usersToDelete._id}`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     );

  //     // Update the users list by removing the deleted user
  //     setUsers((prev) => prev.filter((user) => user._id !== usersToDelete._id));

  //     // Close modal and reset state
  //     setShowDeleteModal(false);
  //     setUsersToDelete(null);

  //     // Show success message
  //   } catch (error) {
  //     console.error("Failed to delete user:", error);

  //     const errorMessage =
  //       error?.response?.data?.message || "An unexpected error occurred";
  //     alert(
  //       `❌ Delete Failed!\n\n` +
  //         `Error: ${errorMessage}\n\n` +
  //         `User "${usersToDelete.name}" was NOT deleted. Please try again.`
  //     );
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  // const handleCloseDeleteModal = () => {
  //   if (!isDeleting) {
  //     setShowDeleteModal(false);
  //     setUsersToDelete(null);
  //   }
  // };

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
                    // onEdit={handleEditUser}
                    // onDelete={handleDeleteUser}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Simplified Delete Confirmation Modal */}
      {/* <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        userName={usersToDelete?.name || ""}
        isDeleting={isDeleting}
      /> */}
    </div>
  );
}

export default AuthHomePage;
