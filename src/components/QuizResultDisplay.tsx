import { CountryData } from "./MainContent"

interface QuizResultDisplayProps {
    incorrectAnswersArray:  CountryData[];
    correctAnswersArray:  CountryData[];
}

export const QuizResultDisplay = ({incorrectAnswersArray, correctAnswersArray}: QuizResultDisplayProps): JSX.Element => {
    return (
      <div className="quizResultsWrapper">
        <h4>Correct Answers</h4>
        <ul className="correctAnswersList">
            {correctAnswersArray.map(el => {
                return (
                    <p key={el.name}> <img src={el.flags.svg} alt="" height="100px"/>{el.name}</p>
                )
            })}
        </ul>
        <h4>Incorrect Answers</h4>
        <ul className="incorrectAnswersList">
        {incorrectAnswersArray.map(el => {
                return (
                    <p key={el.name}> <img src={el.flags.svg} alt="" height="100px"/>{el.name}</p>
                )
            })}
        </ul>
      </div>
    );
  };