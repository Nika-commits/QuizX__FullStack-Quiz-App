import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../../App";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  const { role } = useContext<IAuthContext>(AuthContext); // get role from context

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
    Navigate(`/questionset/${questionId}/attempt`);
  };

  const DeleteQuestionSetHandler = async (questionId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question set?"
    );
    if (!confirmDelete) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/questions/set/${questionId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setQuestionSet((prev) => prev.filter((q) => q._id !== questionId));
    } catch (error) {
      console.error("Failed to delete question set:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (questionSets.length === 0) return <div>No Question Sets Found</div>;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {questionSets.map((question, index) => (
          <div
            key={question._id}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {question.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {question.questionCount} Questions ~
                {Math.ceil(question.questionCount * 1.5)} minutes
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => TakeQuizHandler(question._id)}
                className="px-4 py-2 bg-yellow-400 rounded-md text-white"
              >
                Take Quiz
              </button>

              {/* Only show Delete button if role is admin */}
              {isAdmin && (
                <button
                  onClick={() => DeleteQuestionSetHandler(question._id)}
                  className="px-4 py-2 bg-red-500 rounded-md text-white"
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
