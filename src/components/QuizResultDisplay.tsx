import { CountryData } from "./MainContent";

interface QuizResultDisplayProps {
  incorrectAnswersArray: CountryData[];
  correctAnswersArray: CountryData[];
  numOfCorrectAnswers: number;
  handlePlayAgainButton: () => void;
}

export const QuizResultDisplay = ({
  incorrectAnswersArray,
  correctAnswersArray, numOfCorrectAnswers,
  handlePlayAgainButton,
}: QuizResultDisplayProps): JSX.Element => {
  return (
    <div className="quizResultDisplayWrapper">
      <button className="playAgainButton" onClick={handlePlayAgainButton}>
        Plag Again
      </button>
      <h4 className="correctAnswersText">Correct Answers</h4>
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
      <h4 className="incorrectAnswersText">Incorrect/Skipped Answers</h4>
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
    </div>
  );
};
