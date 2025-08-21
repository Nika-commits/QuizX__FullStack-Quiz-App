import axios from "axios";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../assets/css/navbar.css";
import "../../index.css";

interface QuestionSetForm {
  title: string;
  questions: {
    questionText: string;
    choices: { text: string; label: string; correctAnswer: boolean }[];
  }[];
}

function CreateQuestionSetForm() {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [
      {
        questionText: "",
        choices: [],
      },
    ],
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;
  console.log("form values =>", watch());
  const Navigate = useNavigate();

  const onSubmit = (data: QuestionSetForm) => {
    console.log("Form submitted:", data);
    // Replace this with your actual logic to get the access token
    const accessToken = localStorage.getItem("accessToken") || "";

    axios
      .post("http://localhost:3000/api/admin/questionset/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        alert("Question set Created");
        Navigate("/questionset/list");
      })
      .catch((err) => {
        alert("Could not Create Question Set");
      });
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in-up glow-all-around">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
            Question Set Form
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Section */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-600">
                <label className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Question Set Title
                </label>
                <input
                  {...register("title")}
                  placeholder="Enter the title for your question set"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-600 dark:text-white transition duration-200"
                />
              </div>

              <CreateQuestions />

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="px-8 py-3 bg-yellow-400 dark:bg-gray-900 hover:dark:bg-gray-600 hover:scale-105 text-white font-bold rounded-lg shadow-lg transition duration-200 transform "
                >
                  Create Question Set
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

function CreateQuestions() {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const AddQuestionController = () => {
    append({
      choices: [],
      questionText: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Questions
        </h2>
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white font-semibold rounded-lg shadow-md transition duration-200 transform"
          onClick={AddQuestionController}
        >
          + Add Question
        </button>
      </div>

      {fields?.map((field, index) => {
        const RemoveQuestionHandler = () => {
          remove(index);
        };

        return (
          <div
            key={field.id}
            className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl border-l-4 border-yellow-400 shadow-md animate-fade-in-up"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Question {index + 1}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={RemoveQuestionHandler}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 hover:scale-105 text-white text-sm font-medium rounded-md shadow-sm transition duration-200 transform"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                  Question Text
                </label>
                <textarea
                  {...register(`questions.${index}.questionText`)}
                  placeholder="Enter your question here..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:text-white transition duration-200 resize-none"
                />
              </div>

              {/* <div>
                <label className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
                  Correct Answer
                </label>
                <input
                  {...register(`questions.${index}.correctAnswer`)}
                  placeholder="Enter the correct answer"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-600 dark:text-white transition duration-200"
                />
              </div> */}

              <CreateChoices questionIndex={index} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const AddChoicesHandler = () => {
    append({
      label: fields?.length.toString(),
      text: "",
      correctAnswer: false,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-md font-medium text-gray-600 dark:text-gray-300">
          Answer Choices
        </label>
        <button
          type="button"
          className="px-3 py-1 bg-green-500 hover:bg-green-600 hover:scale-105 text-white text-sm font-medium rounded-md shadow-sm transition duration-200 transform"
          onClick={AddChoicesHandler}
        >
          + Add Choice
        </button>
      </div>

      {fields?.map((field, index) => {
        const RemoveChoiceHandler = () => {
          remove(index);
        };

        return (
          <div
            key={field.id}
            className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 shadow-sm"
          >
            <span className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-white font-bold rounded-full flex items-center justify-center text-sm">
              {String.fromCharCode(65 + index)}
            </span>

            <input
              type="checkbox"
              {...register(
                `questions.${questionIndex}.choices.${index}.correctAnswer`
              )}
              placeholder={`Choice ${String.fromCharCode(65 + index)}`}
              className="flex border rounded-sm border-gray-300 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition duration-200"
            />
            <input
              {...register(`questions.${questionIndex}.choices.${index}.text`)}
              placeholder={`Choice ${String.fromCharCode(65 + index)}`}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white transition duration-200"
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={RemoveChoiceHandler}
                className="flex-shrink-0 px-2 py-1 bg-red-400 hover:bg-red-500 hover:scale-105 text-white text-xs font-medium rounded transition duration-200 transform"
              >
                ×
              </button>
            )}
          </div>
        );
      })}

      {fields.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-4">
          No choices added yet. Click "Add Choice" to create answer options.
        </p>
      )}
    </div>
  );
}

export default CreateQuestionSetForm;
