//HeaderProps
interface HeaderProps {
  handleHomeButton: () => void;
  homeButton: boolean;
  handleQuizButton: () => void;
  quizButton: boolean;
}

export const Header = ({
  handleHomeButton,
  homeButton,
  handleQuizButton,
  quizButton,
}: HeaderProps): JSX.Element => {
  return (
    <div className="headerWrapper">
      <h1>Countries of the World</h1>
      <div className="navBarWrapper">
        <div
          className={homeButton ? "homeButtonPressed" : "homeButton"}
          onClick={handleHomeButton}
        >
          Home
        </div>
        <div className="quizDropdown">
          <div
            className={quizButton ? "quizButtonPressed" : "quizButton"}
            onClick={handleQuizButton}
          >
            Quiz
          </div>
          <div className="quizDropdownContent">
            <div className= "capitalsDropdwnPressed">Capitals</div>
            <div className="populationDropdwnPressed">Population</div>
          </div>
        </div>
      </div>
      <hr className="navBarBottomDivider" />
    </div>
  );
};
