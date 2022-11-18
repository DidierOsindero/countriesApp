import { useState } from "react";
import { CountryData } from "./MainContent";

interface QuizPageProps {
  countriesArray: CountryData[];
}

export const QuizPage = ({ countriesArray }: QuizPageProps): JSX.Element => {
  //STATES
  const [quizInputValue, setQuizInputValue] = useState<string>("");
  const [submittedQuizAnswer, setSubmittedQuizAnswer] = useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  //HANDLERS
  const handleAnswerSubmit = () => {
    setSubmittedQuizAnswer(quizInputValue);
    setQuizInputValue("");
  };

  if (
    submittedQuizAnswer.toLowerCase() === countriesArray[25].name.toLowerCase()
  ) {
    setSubmittedQuizAnswer("");
    setIsAnswerCorrect(true);
    console.log(`Correct! ${countriesArray[25].name} is the correct answer `);
  } else if (
    submittedQuizAnswer.toLowerCase() !==
      countriesArray[25].name.toLowerCase() &&
    submittedQuizAnswer.toLowerCase() !== ""
  ) {
    setSubmittedQuizAnswer("");
    setIsAnswerCorrect(false);
    console.log(
      `Wrong Answer! ${countriesArray[25].name} is the correct answer `
    );
  }

  //RETURNS
  return (
    <div className="quizWrapper">
      <h2>Name the Country</h2>
      <img
        className="quizImage"
        src={countriesArray[25].flags.png}
        height="300px"
        alt=""
      />
      {isAnswerCorrect === true ? (
        <p>Correct! {countriesArray[25].name} is the right answer. </p>
      ) : (
        <p>Wrong answer! {countriesArray[25].name} is the correct answer. </p>
      )}
      <div className="quizInputWrapper">
        <input
          value={quizInputValue}
          onChange={(el) => setQuizInputValue(el.target.value)}
          className="userAnswerTextInput"
          placeholder="Country name..."
        />
        <input
          type="submit"
          onClick={handleAnswerSubmit}
          className="userAnswerSubmit"
        />
      </div>
      <hr />
    </div>
  );
};
