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
  const [questionNumber] = useState<number>(1);

  console.log(randomQuizArray);

  //HANDLERS
  const handleAnswerSubmit = () => {
    setSubmittedQuizAnswer(quizInputValue);
    setQuizInputValue("");
  };

  if (
    submittedQuizAnswer.toLowerCase() ===
    randomQuizArray[questionNumber].name.toLowerCase()
  ) {
    setSubmittedQuizAnswer("");
    setIsAnswerCorrect(true);
    console.log(
      `Correct! ${randomQuizArray[questionNumber].name} is the correct answer `
    );
  } else if (
    submittedQuizAnswer.toLowerCase() !==
      randomQuizArray[questionNumber].name.toLowerCase() &&
    submittedQuizAnswer.toLowerCase() !== ""
  ) {
    setSubmittedQuizAnswer("");
    setIsAnswerCorrect(false);
    console.log(
      `Wrong Answer! ${randomQuizArray[questionNumber].name} is the correct answer `
    );
  }

  //RETURNS
  return (
    <div className="quizWrapper">
      <h2>Name the Country</h2>
      <img
        className="quizImage"
        src={randomQuizArray[questionNumber].flags.svg}
        height="300px"
        alt=""
      />
      {isAnswerCorrect === true && (
        <p>
          Correct! {randomQuizArray[questionNumber].name} is the right answer.{" "}
        </p>
      )}
      {isAnswerCorrect === false && (
        <p>
          Wrong answer! {randomQuizArray[questionNumber].name} is the correct
          answer.{" "}
        </p>
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
        {isAnswerCorrect !== null && (
          <button className="nextCountryButton">Next Country</button>
        )}
      </div>
      <hr />
    </div>
  );
};
