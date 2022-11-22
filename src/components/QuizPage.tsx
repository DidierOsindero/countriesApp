import { useEffect, useState } from "react";
import { CountryData } from "./MainContent";
import { QuizResultDisplay } from "./QuizResultDisplay";
import { NavBarStatesType } from "../App";

interface QuizPageProps {
  countriesArray: CountryData[];
  navBarState: NavBarStatesType;
}

export const QuizPage = ({
  countriesArray,
  navBarState,
}: QuizPageProps): JSX.Element => {
  //create a copy of countries array which can be manipulated in isolation for this page.
  const quizArray = [...countriesArray];
  
  //STATES
  const [quizInputValue, setQuizInputValue] = useState<string>("");
  const [submittedQuizAnswer, setSubmittedQuizAnswer] = useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState<number>(0);
  const [numOfTotalAnswers, setNumOfTotalAnswers] = useState<number>(0);

  //Arrays for correct and incorrect answers to be passed down to end game display
  const [incorrectAnswersArray, setIncorrectAnswersArray] = useState<
    CountryData[]
  >([]);
  const [correctAnswersArray, setCorrectAnswersArray] = useState<CountryData[]>(
    []
  );

  //Create a state to store random version of countries array
  const [randomQuizArray, setRandomQuizArray] = useState<CountryData[]>(
    quizArray.sort(() => Math.random() - 0.5)
  );

  //State to store what country property is being quized
  type countryQuizPropertyType = "name" | "capital" | "population";
  const [countryQuizProperty, setCountryQuizProperty] =
    useState<countryQuizPropertyType>("name");

    //If navBarState changes, check what it is changed to and rerender accordingly
  useEffect(() => {
    if (navBarState === "flags" || navBarState === "quiz") {
      setCountryQuizProperty("name");
    } else if (navBarState === "capitals") {
      setCountryQuizProperty("capital");
    } else if (navBarState === "population") {
      setCountryQuizProperty("population");
    }
  }, [navBarState]);


  //HANDLERS
  const handleAnswerSubmit = () => {
    setSubmittedQuizAnswer(quizInputValue);
    setQuizInputValue("");
    setTimeout(handleNextCountry, 1500);
  };

  const handleSkipButton = () => {
    setSubmittedQuizAnswer("");
    setQuizInputValue("");
    setNumOfTotalAnswers((prev) => (prev += 1));
    setIncorrectAnswersArray((prev) => [
      ...prev,
      randomQuizArray[questionNumber],
    ]);
    handleNextCountry();
  };

  const handleNextCountry = () => {
    setIsAnswerCorrect(null);
    setQuestionNumber((prev) => (prev += 1));
  };

  const handlePlayAgainButton = () => {
    setRandomQuizArray((prev) => prev.sort(() => Math.random() - 0.5));
    setQuizInputValue("");
    setCorrectAnswersArray([]);
    setIncorrectAnswersArray([]);
    setIsAnswerCorrect(null);
    setNumOfCorrectAnswers(0);
    setNumOfTotalAnswers(0);
    setQuestionNumber(0);
  };

  if (
    submittedQuizAnswer.toLowerCase() ===
    randomQuizArray[questionNumber][countryQuizProperty].toLowerCase()
  ) {
    setSubmittedQuizAnswer("");
    setNumOfCorrectAnswers((prev) => (prev += 1));
    setNumOfTotalAnswers((prev) => (prev += 1));
    setCorrectAnswersArray((prev) => [
      ...prev,
      randomQuizArray[questionNumber],
    ]);
    setIsAnswerCorrect(true);
  } else if (
    submittedQuizAnswer.toLowerCase() !==
      randomQuizArray[questionNumber][countryQuizProperty].toLowerCase() &&
    submittedQuizAnswer.toLowerCase() !== ""
  ) {
    setSubmittedQuizAnswer("");
    setNumOfTotalAnswers((prev) => (prev += 1));
    setIncorrectAnswersArray((prev) => [
      ...prev,
      randomQuizArray[questionNumber],
    ]);
    setIsAnswerCorrect(false);
  }

  //RETURNS
  if (questionNumber === 10) {
    return (
      <QuizResultDisplay
        incorrectAnswersArray={incorrectAnswersArray}
        correctAnswersArray={correctAnswersArray}
        handlePlayAgainButton={handlePlayAgainButton}
      />
    );
  } else {
    return (
      <div className="quizWrapper">
        <h2>Name the Country</h2>
        <h4>
          Score: {numOfCorrectAnswers} / {numOfTotalAnswers}
        </h4>
        <img
          className="quizImage"
          src={randomQuizArray[questionNumber].flags.svg}
          height="300px"
          alt=""
        />
        {isAnswerCorrect === true && (
          <p className="correctAnswerText">
            Correct! {randomQuizArray[questionNumber][countryQuizProperty]} is
            the right answer.
          </p>
        )}
        {isAnswerCorrect === false && (
          <p className="wrongAnswerText">
            Wrong answer! The correct answer is{" "}
            {randomQuizArray[questionNumber][countryQuizProperty]}.
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
            {quizInputValue === "" && isAnswerCorrect === null ? (
              <button onClick={handleSkipButton} className="userAnswerSubmit">
                Skip
              </button>
            ) : (
              <input
                type="submit"
                onClick={handleAnswerSubmit}
                className="userAnswerSubmit"
                disabled={quizInputValue === ""}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};
