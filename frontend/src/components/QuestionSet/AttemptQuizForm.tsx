import axios from "axios";
import { useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { IAttempQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoiceIds: string[]; // ✅ Fixed property name (removed 's')
  }[];
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttempQuestionForm;
}) {
  const defaultValues: IAttempQuestionForm = {
    ...questionSet,
  };
  const methods = useForm({ defaultValues });

  const [result, setResult] = useState<{ score: number; total: number } | null>(
    null
  );
  const { watch, handleSubmit } = methods;
  console.log("form values => ", watch());
  const navigate = useNavigate();
  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses:
        data?.questions?.map((question) => {
          return {
            questionId: question?._id,
            selectedChoiceIds:
              question?.choices // ✅ Fixed property name
                ?.filter((choice) => choice?.selected)
                ?.map((ch) => ch?._id) || [], // ✅ Added fallback empty array
          };
        }) || [], // ✅ Added fallback empty array
    };

    console.log("Final data being sent:", finalData); // ✅ Debug log

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("Response:", res.data); // ✅ Debug log
        toast.success("Answer Set Updated Successfully");
        setResult(res.data.data);
        // navigate("/questionset/list");
      })
      .catch((err) => {
        console.error("Error:", err); // ✅ Debug log
        toast.error("Error submitting answers");
      });
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700 text-center max-w-2xl w-full">
              {/* Success Icon */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-full shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Quiz Completed!
              </h1>

              {/* Score Display */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Your Final Score
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-5xl font-extrabold text-yellow-500 dark:text-yellow-400">
                      {result?.score || 0}
                    </span>
                    <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                      /
                    </span>
                    <span className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                      {result?.total || 0}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
                    Questions Attempted
                  </p>

                  {/* Score Percentage */}
                  {result?.total && result?.score && (
                    <div className="mt-6">
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${Math.round(
                              (result.score / result.total) * 100
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {Math.round((result.score / result.total) * 100)}%
                        Correct
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setResult(null)}
                  className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-400/30"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Retake Quiz
                  </span>
                </button>

                <button
                  onClick={() => navigate("/questionset/list")}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-600 dark:hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/30"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5a2 2 0 012-2h2a2 2 0 012 2v0M8 5a2 2 0 000 4h8a2 2 0 000-4M8 5v0"
                      />
                    </svg>
                    View All Quizzes
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                  Quiz Assessment
                </h1>
                <div className="space-y-4">
                  {/* <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Quiz Title
                  </label> */}
                  {/* <input
                    {...register("title")}
                    placeholder="Enter Quiz Title"
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all duration-300 text-lg font-medium"
                  /> */}
                  <h1 className="text-4xl font-extrabold text-gray-900 dark:text-yellow-400 mb-4">
                    {questionSet.title}
                  </h1>
                  {/* <p className="text-gray-600 dark:text-gray-400">
                    Answer all questions below to complete this quiz
                  </p> */}
                </div>
              </div>
            </div>

            <CreateQuestions />

            {/* Submit Section */}
            <div className="sticky bottom-0 z-10 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="w-full px-8 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-600 dark:hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400/30 text-lg"
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Submit Quiz Answers
                </span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Answer All Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Total Questions: {fields?.length || 0}
        </p>
      </div>

      <div className="space-y-8">
        {fields?.map((field, index) => {
          return (
            <div
              key={field.id} // ✅ Use field.id instead of index for better performance
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-yellow-400 text-white rounded-full font-bold text-lg">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Question {index + 1}
                  </h3>
                </div>
                <div className="ml-14">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {field?.questionText}
                  </p>
                </div>
              </div>
              <div className="ml-14">
                <CreateChoices questionIndex={index} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control, watch } = useFormContext<IAttempQuestionForm>(); // ✅ Added watch

  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  // ✅ Watch current question choices to debug
  const currentChoices = watch(`questions.${questionIndex}.choices`);
  console.log(`Question ${questionIndex} choices:`, currentChoices);

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Select your answer(s):
      </h4>
      <div className="grid gap-4">
        {fields?.map((field, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D...
          return (
            <label
              key={field.id} // ✅ Use field.id instead of index
              className="group flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-yellow-400 dark:hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-bold text-sm mr-4 group-hover:bg-yellow-400 group-hover:text-white transition-all duration-300">
                  {optionLetter}
                </span>
                <input
                  type="checkbox"
                  {...register(
                    `questions.${questionIndex}.choices.${index}.selected`
                  )}
                  className="w-6 h-6 text-yellow-400 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all duration-200"
                />
              </div>
              <p className="text-gray-800 dark:text-gray-200 flex-1 leading-relaxed font-medium text-lg group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                {field?.text}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default AttemptQuizForm;
