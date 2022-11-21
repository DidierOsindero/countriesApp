import { CountryData } from "./MainContent";

interface QuizResultDisplayProps {
  incorrectAnswersArray: CountryData[];
  correctAnswersArray: CountryData[];
  handlePlayAgainButton: () => void;
}

export const QuizResultDisplay = ({
  incorrectAnswersArray,
  correctAnswersArray,
  handlePlayAgainButton,
}: QuizResultDisplayProps): JSX.Element => {
  return (
    <div className="quizResultDisplayWrapper">
      <button className="playAgainButton" onClick={handlePlayAgainButton}>Plag Again</button>
      <h4>Correct Answers</h4>
      <ul className="correctAnswersList">
        {correctAnswersArray.map((el) => {
          return (
            <div key={el.name}>
              {" "}
              <img src={el.flags.svg} alt="" height="30px" /> - {el.name}
            </div>
          );
        })}
      </ul>
      <h4>Incorrect/Skipped Answers</h4>
      <ul className="incorrectAnswersList">
        {incorrectAnswersArray.map((el) => {
          return (
            <div key={el.name}>
              {" "}
              <img src={el.flags.svg} alt="" height="50px" />
              <p>{el.name}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
