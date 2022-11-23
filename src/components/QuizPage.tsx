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
    handlePlayAgainButton();
  }, [navBarState]);

  //error message if data could not be fetched
  if (countriesArray.length === 0) {
    return <h3 className="fetchDataErrorMsg">{"Could Not Fetch Data :("}</h3>;
  }

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

  if (navBarState !== "population") {
    if (
      submittedQuizAnswer.toLowerCase() ===
      String(randomQuizArray[questionNumber][countryQuizProperty]).toLowerCase()
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
        String(
          randomQuizArray[questionNumber][countryQuizProperty]
        ).toLowerCase() &&
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
  } else if (navBarState === "population") {
    if (
      submittedQuizAnswer !== "" &&
      Number(submittedQuizAnswer) >=
        Number(randomQuizArray[questionNumber][countryQuizProperty]) -
          1000000 &&
      Number(submittedQuizAnswer) <=
        Number(randomQuizArray[questionNumber][countryQuizProperty]) + 1000000
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
      submittedQuizAnswer.toLowerCase() !== "" &&
      (Number(submittedQuizAnswer) <
        Number(randomQuizArray[questionNumber][countryQuizProperty]) -
          1000000 ||
        Number(submittedQuizAnswer) >
          Number(randomQuizArray[questionNumber][countryQuizProperty]) +
            1000000)
    ) {
      setSubmittedQuizAnswer("");
      setNumOfTotalAnswers((prev) => (prev += 1));
      setIncorrectAnswersArray((prev) => [
        ...prev,
        randomQuizArray[questionNumber],
      ]);
      setIsAnswerCorrect(false);
    }
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
        {(navBarState === "quiz" || navBarState === "flags") && (
          <h2>Name the Country</h2>
        )}
        {navBarState === "capitals" && <h2>Name the Capital</h2>}
        {navBarState === "population" && <h2>Guess the Population Size</h2>}

        <p>
          <b>
            Score: {numOfCorrectAnswers} / {numOfTotalAnswers}
          </b>
        </p>
        <p>
          <i>Question {questionNumber + 1}:</i>
        </p>

        <img
          className="quizImage"
          src={randomQuizArray[questionNumber].flags.svg}
          height="300px"
          alt=""
        />
        {navBarState !== 'flags' && navBarState !== 'quiz' && (
          <h3>{randomQuizArray[questionNumber].name}</h3>
        )}
        {isAnswerCorrect === true && navBarState !== "population" && (
          <p className="correctAnswerText">
            Correct! {randomQuizArray[questionNumber][countryQuizProperty]} is
            the right answer.
          </p>
        )}

        {isAnswerCorrect === true &&
          navBarState === "population" &&
          Number(submittedQuizAnswer) ===
            Number(randomQuizArray[questionNumber][countryQuizProperty]) && (
            <p className="correctAnswerText">
              Correct! {randomQuizArray[questionNumber][countryQuizProperty]} is
              the right answer.
            </p>
          )}

        {isAnswerCorrect === true &&
          navBarState === "population" &&
          Number(submittedQuizAnswer) !==
            Number(randomQuizArray[questionNumber][countryQuizProperty]) && (
            <p className="correctAnswerText">
              Well done! You were within range of the exact population:{" "}
              {randomQuizArray[questionNumber][
                countryQuizProperty
              ].toLocaleString()}
              .
            </p>
          )}

        {isAnswerCorrect === false && (
          <p className="wrongAnswerText">
            Wrong answer! The correct answer is{" "}
            {randomQuizArray[questionNumber][
              countryQuizProperty
            ].toLocaleString()}
            .
          </p>
        )}

        <div className="quizInputWrapper">
          {isAnswerCorrect === null && (
            <input
              value={quizInputValue}
              onChange={(el) => setQuizInputValue(el.target.value)}
              className="userAnswerTextInput"
              placeholder={navBarState === 'population' ? " Population size...": (navBarState === "capitals" ? " Capital city...":" Country name...")}
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
