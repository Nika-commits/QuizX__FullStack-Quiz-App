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
          autoClose: false, // don’t auto close until user chooses
          closeOnClick: false,
          draggable: false,
        }
      );

    confirmToast();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md animate-pulse">
          <p className="text-gray-700 dark:text-gray-200">
            Loading question sets...
          </p>
        </div>
      </div>
    );
  }

  if (questionSets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
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
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
          Available Question Sets
        </h1>

        {questionSets.map((question) => (
          <div
            key={question._id}
            className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-[1.02]"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
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
                className="px-4 py-2 bg-yellow-400 dark:bg-yellow-500 text-white rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
              >
                Take Quiz
              </button>

              {isAdmin && (
                <button
                  onClick={() => DeleteQuestionSetHandler(question._id)}
                  className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListQuestionSet;
