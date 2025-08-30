import { useEffect } from "react";
import Leaderboard from "../components/Leaderboard";

function LeaderboardPage() {
  useEffect(() => {
    document.title = "Leaderboard - QuizX";
  }, []);
  return (
    <div>
      <Leaderboard />
    </div>
  );
}
export default LeaderboardPage;
