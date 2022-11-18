import { useEffect, useState } from "react";
import { CountryData } from "./MainContent";

interface QuizPageProps {
  countriesArray: CountryData[];
}

export const QuizPage = ({countriesArray}: QuizPageProps): JSX.Element => {
  //QUIZ STATES
  const [quizInputValue, setQuizInputValue] = useState<string>("");
  const [submittedQuizAnswer, setSubmittedQuizAnswer] = useState<string>("");


  //Handler Functions
  const handleAnswerSubmit = () => {
    setSubmittedQuizAnswer(quizInputValue);
    setQuizInputValue("");
  };

  return (
    <div className="quizWrapper">
      <h2>Name the Country</h2>
      <img
        className="quizImage"
        src={countriesArray[25].flags.png}
        height="300px"
        alt=""
      />
      <div className="quizInputWrapper">
        <input
          value={quizInputValue}
          onChange={(el) => setQuizInputValue(el.target.value)}
          name="userInputAnswer"
          placeholder="Country name..."
        />
        <input
          type="submit"
          onClick={handleAnswerSubmit}
          name="userAnswerSubmit"
        />
      </div>
      <hr />
    </div>
  );
};
