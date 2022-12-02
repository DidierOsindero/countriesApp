import axios from "axios";
import { useState } from "react";
import { baseURL } from "../App";
interface IQuizCompletionTracker {
  flags: number;
  capitals: number;
  population: number;
}

export const StatsPage = (): JSX.Element => {
  const [quizCompletionTracker, setQuizCompletionTracker] =
    useState<IQuizCompletionTracker | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchQuizCompletionTracker = async () => {
    const response = await axios.get(baseURL + "/quiz-completions");
    const data = response.data;
    setQuizCompletionTracker(data);
  };

  if (isFirstRender) {
    fetchQuizCompletionTracker();
    setIsFirstRender(false);
  }

  return (
    <>
      <div className="statsPageWrapper">
        <h2 className="statsPageTitle">Quiz Stats</h2>
        <p>
          Number of times you have completed the Flags Quiz:{" "}
          {quizCompletionTracker?.flags}
        </p>
        <p>
          Number of times you have completed the Capitals Quiz:{" "}
          {quizCompletionTracker?.capitals}
        </p>
        <p>
          Number of times you have completed the Populations Quiz:{" "}
          {quizCompletionTracker?.population}
        </p>
      </div>
    </>
  );
};
