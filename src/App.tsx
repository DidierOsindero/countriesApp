import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Footer } from "./components/Footer";

function App(): JSX.Element {
  const [homeButton, setHomeButton] = useState<boolean>(true);
  const [quizButton, setQuizButton] = useState<boolean>(false);

  const handleHomeButton = () => {
    setHomeButton(true);
    setQuizButton(false);
  };

  const handleQuizButton = () => {
    setHomeButton(false);
    setQuizButton(true);
  };

  return (
    <div className="app">
      <Header
        handleHomeButton={handleHomeButton}
        handleQuizButton={handleQuizButton}
        homeButton={homeButton}
        quizButton={quizButton}
      />
      <MainContent homeButton={homeButton} quizButton={quizButton} />
      <Footer />
    </div>
  );
}

export default App;
