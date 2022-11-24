import { NavBarStatesType } from "../App";
//HeaderProps
interface HeaderProps {
  navBarState: string;
  setNavBarState: React.Dispatch<React.SetStateAction<NavBarStatesType>>;
}

export const Header = ({
  navBarState,
  setNavBarState,
}: HeaderProps): JSX.Element => {
  const handleHomeButton = () => {
    setNavBarState("home");
  };

  const handleQuizButton = () => {
    setNavBarState("quiz");
  };

  const handleFlagsDrpDwn = () => {
    setNavBarState("flags");
  };

  const handleCapitalsDrpDwn = () => {
    setNavBarState("capitals");
  };

  const handlePopulationDrpDwn = () => {
    setNavBarState("population");
  };

  return (
    <div className="headerWrapper">
      <h1>Countries of the World</h1>
      <div className="navBarWrapper">
        <div
          className={
            navBarState === "home" ? "homeButtonPressed" : "homeButton"
          }
          onClick={handleHomeButton}
        >
          Home
        </div>
        <div className="quizDropdown">
          <div
            className={
              navBarState === "quiz" ||
              navBarState === "flags" ||
              navBarState === "capitals" ||
              navBarState === "population"
                ? "quizButtonPressed"
                : "quizButton"
            }
            onClick={handleQuizButton}
          >
            Quiz
          </div>
          <div className="quizDropdownContent">
            <div className="flagsDropdwnPressed" onClick={handleFlagsDrpDwn}>
              Flags
            </div>
            <div
              className="capitalsDropdwnPressed"
              onClick={handleCapitalsDrpDwn}
            >
              Capitals
            </div>
            <div
              className="populationDropdwnPressed"
              onClick={handlePopulationDrpDwn}
            >
              Population
            </div>
          </div>
        </div>
      </div>
      <hr className="navBarBottomDivider" />
    </div>
  );
};
