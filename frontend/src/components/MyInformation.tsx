import { useContext } from "react";
import { AuthContext, type IAuthContext } from "../App"; // Adjust path as needed
import "../assets/css/myInformation.css";

function MyInformation({
  id,
  name,
  email,
  age,
  onClick,
}: // onEdit,
// onDelete,
{
  id: string;
  name: string;
  email?: string;
  age?: number;
  onClick?: () => void;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}) {
  // Get the user's role from AuthContext
  const { role } = useContext<IAuthContext>(AuthContext);
  const isAdmin = role === "admin";

  return (
    <div className="w-full">
      {/* Profile Card - Clickable */}
      <div
        className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={onClick}
      >
        <div className="bg-gradient-to-br from-blue-500 to-indigo-900 p-8 rounded-2xl shadow-lg text-white hover:from-blue-600 hover:to-indigo-800 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="text-right">
              <svg
                className="w-6 h-6 text-white opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4 truncate">{name}</h1>

          <div className="space-y-2 text-sm opacity-90">
            <p className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <strong>Age:</strong> {age}
            </p>

            <p className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <strong>Email:</strong>
              <span className="ml-1 truncate">{email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Admin Buttons - Separate from clickable area */}
      {/* {isAdmin && (
        <div className="flex gap-2 mt-2 ml-2">
          <button
            onClick={() => onDelete?.(id)}
            className="p-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition-colors"
          >
            Delete User
          </button>
          <button
            onClick={() => onEdit?.(id)}
            className="p-2 bg-yellow-600 rounded-md text-white hover:bg-yellow-700 transition-colors"
          >
            Edit User
          </button>
        </div>
      )} */}
    </div>
  );
}

export default MyInformation;
