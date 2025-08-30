import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttemptQuizForm from "../../components/QuestionSet/AttemptQuizForm";

export interface IAttempQuestionForm {
  _id: string;
  title: string;
  questions: {
    _id: string;
    questionText: string;
    choices: {
      _id: string;
      text: string;
      selected?: boolean; // Make sure this property exists
    }[];
  }[];
}

export interface IQuestion {
  questionText: string;
  choices: IChoice[];
  _id: string;
}

export interface IChoice {
  label: string;
  text: string;
  _id: string;
  selected?: boolean;
}

function AttemptQuizPage() {
  useEffect(() => {
    document.title = "Attempt Quiz - QuizX";
  }, []);

  const { id } = useParams<{ id: string }>();

  // Fixed: Initialize as null instead of empty array, and use proper type
  const [questionSet, setQuestionSet] = useState<IAttempQuestionForm | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Wrap fetchData in useCallback to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || !id) {
      setIsLoading(false);
      setError("Missing authentication token or quiz ID");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/questions/set/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setQuestionSet(response?.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching question set:", err);
      setError("Failed to load quiz. Please try again.");
      setQuestionSet(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Error Loading Quiz
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => {
                setError(null);
                fetchData();
              }}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!questionSet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The quiz you're looking for could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AttemptQuizForm questionSet={questionSet} />
    </div>
  );
}

export default AttemptQuizPage;
