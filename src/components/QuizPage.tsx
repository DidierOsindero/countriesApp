import { useState } from "react";
import { CountryData } from "./MainContent";

interface QuizPageProps {
  countriesArray: CountryData[];
}

export const QuizPage = ({ countriesArray }: QuizPageProps): JSX.Element => {
  //create a copy of countries array which can be manipulated in isolation for this page.
  const quizArray = [...countriesArray];

  //STATES
  const [quizInputValue, setQuizInputValue] = useState<string>("");
  const [submittedQuizAnswer, setSubmittedQuizAnswer] = useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  //Create a state to store random version of countries array
  const [randomQuizArray] = useState<CountryData[]>(
    quizArray.sort(() => Math.random() - 0.5)
  );
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState<number>(0);
  const [numOfTotalAnswers, setNumOfTotalAnswers] = useState<number>(0);

  //HANDLERS
  const handleAnswerSubmit = () => {
    setSubmittedQuizAnswer(quizInputValue);
    setQuizInputValue("");
    setTimeout(handleNextCountry, 1500);
  };

  const handleNextCountry = () => {
    setIsAnswerCorrect(null);
    setQuestionNumber((prev) => (prev += 1));
  };

  if (
    submittedQuizAnswer.toLowerCase() ===
    randomQuizArray[questionNumber].name.toLowerCase()
  ) {
    setSubmittedQuizAnswer("");
    setNumOfCorrectAnswers((prev) => (prev += 1));
    setNumOfTotalAnswers((prev) => (prev += 1));
    setIsAnswerCorrect(true);
  } else if (
    submittedQuizAnswer.toLowerCase() !==
      randomQuizArray[questionNumber].name.toLowerCase() &&
    submittedQuizAnswer.toLowerCase() !== ""
  ) {
    setSubmittedQuizAnswer("");
    setIsAnswerCorrect(false);
    setNumOfTotalAnswers((prev) => (prev += 1));
    console.log(
      `Wrong Answer! ${randomQuizArray[questionNumber].name} is the correct answer `
    );
  }

  //RETURNS
  return (
    <div className="quizWrapper">
      <h2>Name the Country</h2>
      <h4>
        {numOfCorrectAnswers} / {numOfTotalAnswers}
      </h4>
      <img
        className="quizImage"
        src={randomQuizArray[questionNumber].flags.svg}
        height="300px"
        alt=""
      />
      {isAnswerCorrect === true && (
        <p className="correctAnswerText">
          Correct! {randomQuizArray[questionNumber].name} is the right answer.
        </p>
      )}
      {isAnswerCorrect === false && (
        <p className="wrongAnswerText">
          Wrong answer! {randomQuizArray[questionNumber].name} is the correct
          answer.
        </p>
      )}

      <div className="quizInputWrapper">
        {isAnswerCorrect === null && (
          <input
            value={quizInputValue}
            onChange={(el) => setQuizInputValue(el.target.value)}
            className="userAnswerTextInput"
            placeholder="Country name..."
          />
        )}
        <div>
          <input
            type="submit"
            onClick={handleAnswerSubmit}
            className="userAnswerSubmit"
            disabled={quizInputValue === ""}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};
