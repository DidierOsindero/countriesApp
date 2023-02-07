import { useEffect, useReducer, useRef, useState } from "react";
import { CountryData } from "./MainContent";
import { QuizResultDisplay } from "./QuizResultDisplay";
import { NavBarStatesType } from "../App";
import { initialState, reducer } from "../reducer";

interface QuizPageProps {
  countriesArray: CountryData[];
  navBarState: NavBarStatesType;
}

export const QuizPage = ({
  countriesArray,
  navBarState,
}: QuizPageProps): JSX.Element => {
  //create a copy of countries array which can be manipulated in isolation for this page.
  const [randomQuizArray, setRandomQuizArray] = useState<CountryData[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState)
  const {quizInputValue, submittedQuizAnswer, isAnswerCorrect,
   questionNumber, numOfCorrectAnswers} = state

  useEffect(() => {
    setRandomQuizArray([...countriesArray].sort(() => Math.random() - 0.5));
  },[navBarState,countriesArray])

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
    
    dispatch({type: 'play again'})
  }, [navBarState]);

  //error message if data could not be fetched
  if (countriesArray.length === 0) {
    return <h3 className="fetchDataErrorMsg">{"Could Not Fetch Data :("}</h3>;
  }

  //currentCountry variable (non-re-rendering)
  const currentCountry = randomQuizArray[questionNumber];

  //constant which stores the number of questions asked per round
  const numOfQuestionPerRound = 10;

  //HANDLERS
  const handleAnswerSubmit = () => {
    dispatch({type: 'submit answer'})
    setTimeout(() => dispatch({type: 'next country'}), 1500)
  };

  const handlePlayAgainButton = () => {
    setRandomQuizArray([...countriesArray].sort(() => Math.random() - 0.5))
    dispatch({type: 'play again'})
  };

  //Check if guess is correct or incorrect and handle accordingly
  if (!currentCountry) {
    console.log("Loading Current Country")
  }
  else if (navBarState !== "population") {
    if (
      submittedQuizAnswer.toLowerCase() ===
      String(currentCountry[countryQuizProperty]).toLowerCase()
    ) {
    dispatch({type: 'correct guess', payload: currentCountry})
    } else if (
      submittedQuizAnswer.toLowerCase() !==
        String(currentCountry[countryQuizProperty]).toLowerCase() &&
      submittedQuizAnswer.toLowerCase() !== ""
    ) {
    dispatch({type: 'incorrect guess', payload: currentCountry})
    }
  } else if (navBarState === "population") {
    if (
      submittedQuizAnswer !== "" &&
      Number(submittedQuizAnswer) >=
        Number(currentCountry[countryQuizProperty]) - 1000000 &&
      Number(submittedQuizAnswer) <=
        Number(currentCountry[countryQuizProperty]) + 1000000
    ) {
    dispatch({type: 'correct guess', payload: currentCountry})
    } else if (
      submittedQuizAnswer.toLowerCase() !== "" &&
      (Number(submittedQuizAnswer) <
        Number(currentCountry[countryQuizProperty]) - 1000000 ||
        Number(submittedQuizAnswer) >
          Number(currentCountry[countryQuizProperty]) + 1000000)
    ) {
    dispatch({type: 'incorrect guess', payload: currentCountry})
    }
  }

  //RETURNS
  if (!currentCountry) {
    return <h1>Loading </h1>
  }
  else if (questionNumber === numOfQuestionPerRound) {
    return (
      <QuizResultDisplay
      numOfQuestionPerRound={numOfQuestionPerRound}
        state={state}
        handlePlayAgainButton={handlePlayAgainButton}
        navBarState={navBarState}
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
          <b>Score: {numOfCorrectAnswers}</b>
        </p>
        <p>
          <i>
            Question {questionNumber + 1} of {numOfQuestionPerRound}
          </i>
        </p>

        <img
          className="quizImage"
          src={currentCountry.flags.svg}
          height="300px"
          alt=""
        />
        {navBarState !== "flags" && navBarState !== "quiz" && (
          <h3>{currentCountry.name}</h3>
        )}
        {isAnswerCorrect === true && navBarState !== "population" && (
          <p className="correctAnswerText">
            Correct! {currentCountry[countryQuizProperty]} is the right answer.
          </p>
        )}

        {isAnswerCorrect === true &&
          navBarState === "population" &&
          Number(submittedQuizAnswer) ===
            Number(currentCountry[countryQuizProperty]) && (
            <p className="correctAnswerText">
              Correct! {currentCountry[countryQuizProperty]} is the right
              answer.
            </p>
          )}

        {isAnswerCorrect === true &&
          navBarState === "population" &&
          Number(submittedQuizAnswer) !==
            Number(currentCountry[countryQuizProperty]) && (
            <p className="correctAnswerText">
              Well done! You were within range of the exact population:{" "}
              {currentCountry[countryQuizProperty].toLocaleString()}.
            </p>
          )}

        {isAnswerCorrect === false && (
          <p className="wrongAnswerText">
            Wrong answer! The correct answer is{" "}
            {currentCountry[countryQuizProperty].toLocaleString()}.
          </p>
        )}

        <div className="quizInputWrapper">
          {isAnswerCorrect === null && (
            <input
              value={quizInputValue}
              onChange={(el) => dispatch({type: 'update input', payload: el.target.value})}
              className="userAnswerTextInput"
              placeholder={
                navBarState === "population"
                  ? "Population size..."
                  : navBarState === "capitals"
                  ? "Capital city..."
                  : "Country name..."
              }
            />
          )}
          <div>
            {quizInputValue === "" && isAnswerCorrect === null ? (
              <button onClick={() => dispatch({type: 'skip question', payload: currentCountry})} className="userAnswerSubmit">
                Skip
              </button>
            ) : (
              <input
                type="submit"
                onClick={handleAnswerSubmit}
                className="userAnswerSubmit"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};
