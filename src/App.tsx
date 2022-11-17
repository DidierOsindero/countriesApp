import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Footer } from "./components/Footer";


function App(): JSX.Element {
const [homeButton, setHomeButton] = useState<boolean>(true);
const [quizButton, setQuizButton] = useState<boolean>(false);
  return (
    <div className="app">
      <Header />
      <MainContent homeButton={homeButton} quizButton={quizButton}/>
      <Footer />
    </div>
  );
}

export default App;
