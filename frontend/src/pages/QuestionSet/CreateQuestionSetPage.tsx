import { useEffect } from "react";
import CreateQuestionSetForm from "../../components/QuestionSet/CreateQuestionSetForm";

function CreateQuestionSetPage() {
  useEffect(() => {
    document.title = "Create Question Set - QuizX";
  }, []);

  return (
    <div>
      <CreateQuestionSetForm />
    </div>
  );
}

export default CreateQuestionSetPage;
