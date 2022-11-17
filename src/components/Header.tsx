//HeaderProps
interface HeaderProps {
  handleHomeButton: () => void;
  handleQuizButton: () => void;
}

export const Header = ({handleHomeButton, handleQuizButton}:HeaderProps): JSX.Element => {

  
  return (
    <div className="headerWrapper">
      <h1>Countries of the World</h1>
      <div className="navBarWrapper">
        <div onClick={handleHomeButton}>Home</div>
        <div onClick={handleQuizButton}>Quiz</div>
      </div>
    </div>
  );
};
