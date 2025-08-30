import { useEffect } from "react";
import ListQuestionSet from "../../components/QuestionSet/ListQuestionSet";

function ListQuestionSetPage() {
  useEffect(() => {
    document.title = "Available Question Sets - QuizX";
  }, []);
  return (
    <div>
      <ListQuestionSet />
    </div>
  );
}

export default ListQuestionSetPage;
