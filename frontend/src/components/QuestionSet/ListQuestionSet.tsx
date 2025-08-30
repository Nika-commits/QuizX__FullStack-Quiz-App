import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext, type IAuthContext } from "../../App";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { role } = useContext<IAuthContext>(AuthContext);
  const isAdmin = role === "admin";

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/questions/set/list",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setQuestionSet(response?.data?.questionSet);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const TakeQuizHandler = (questionId: string) => {
    navigate(`/questionset/${questionId}/attempt`);
  };

  const DeleteQuestionSetHandler = (questionId: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    // Custom confirmation toast
    const confirmToast = () =>
      toast(
        ({ closeToast }) => (
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Are you sure you want to delete?</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `http://localhost:3000/api/questions/set/${questionId}`,
                      { headers: { Authorization: `Bearer ${accessToken}` } }
                    );

                    setQuestionSet((prev) =>
                      prev.filter((q) => q._id !== questionId)
                    );

                    toast.success("Question set deleted successfully!");
                  } catch (error: any) {
                    toast.error(
                      error.response?.data?.message ||
                        "Failed to delete question set!"
                    );
                  } finally {
                    closeToast?.(); // close the confirm toast
                  }
                }}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={closeToast}
                className="px-3 py-1 rounded bg-gray-300 text-black hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          autoClose: false, // don't auto close until user chooses
          closeOnClick: false,
          draggable: false,
        }
      );

    confirmToast();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {/* Enhanced loading animation */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 dark:text-gray-200 animate-pulse">
              Loading question sets...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (questionSets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center animate-fade-in">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Question Sets Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            There are currently no question sets available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Animated header */}
        <div className="text-center animate-slide-down">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6">
            Available Question Sets
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Animated question cards */}
        <div className="space-y-4">
          {questionSets.map((question, index) => (
            <div
              key={question._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
                    {question.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {question.questionCount} Questions ~{" "}
                    {Math.ceil(question.questionCount * 1)} minutes
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => TakeQuizHandler(question._id)}
                    className="px-4 py-2 bg-yellow-400 dark:bg-yellow-500 text-white rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-yellow-200 dark:focus:ring-yellow-700"
                  >
                    Take Quiz
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => DeleteQuestionSetHandler(question._id)}
                      className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }

          .animate-slide-down {
            animation: slide-down 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}

export default ListQuestionSet;
