import { CountryData } from "./MainContent";

interface QuizResultDisplayProps {
  incorrectAnswersArray: CountryData[];
  correctAnswersArray: CountryData[];
  numOfCorrectAnswers: number;
  numOfQuestionPerRound: number;
  handlePlayAgainButton: () => void;
}

export const QuizResultDisplay = ({
  incorrectAnswersArray,
  correctAnswersArray, numOfCorrectAnswers, numOfQuestionPerRound,
  handlePlayAgainButton,
}: QuizResultDisplayProps): JSX.Element => {
  return (
    <div className="quizResultDisplayWrapper">
      {numOfCorrectAnswers > numOfQuestionPerRound /2 && <h3 className="quizResultsWellDoneMessage">Well done! <br/> You got {numOfCorrectAnswers} answers correct out of {numOfQuestionPerRound} questions!</h3>}
      {numOfCorrectAnswers <= numOfQuestionPerRound /2 && <h3 className="quizResultsBetterLuckMessage">Better luck next time... <br/>You got {numOfCorrectAnswers} answers correct out of {numOfQuestionPerRound} questions!</h3>}
      {correctAnswersArray.length !== 0 && <h4 className="correctAnswersText">Correct Answers</h4>}
      <ul className="correctAnswersList">
        {correctAnswersArray.map((el) => {
          return (
            <div className="correctQuizResultWrapper" key={el.name}>
              {" "}
              <img className="quizResultFlagIMG" src={el.flags.svg} alt="" />
              <p className="correctQuizResultFlagText">{el.name}</p>
            </div>
          );
        })}
      </ul>
      {incorrectAnswersArray.length !== 0 && <h4 className="incorrectAnswersText">Incorrect/Skipped Answers</h4>}
      <ul className="incorrectAnswersList">
        {incorrectAnswersArray.map((el) => {
          return (
            <div className="incorrectQuizResultWrapper" key={el.name}>
              {" "}
              <img className="quizResultFlagIMG" src={el.flags.svg} alt="" />
              <p className="incorrectQuizResultFlagText">{el.name}</p>
            </div>
          );
        })}
      </ul>
      <button className="playAgainButton" onClick={handlePlayAgainButton}>
        Plag Again
      </button>
    </div>
  );
};
