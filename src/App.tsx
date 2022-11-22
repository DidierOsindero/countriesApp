import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Footer } from "./components/Footer";

export type NavBarStatesType = 'home' | 'quiz' | 'flags' | 'capitals' | 'population' ;

function App(): JSX.Element {
  const [navBarState, setNavBarState] = useState<NavBarStatesType>('home');



  return (
    <div className="app">
      <Header
        navBarState={navBarState}
        setNavBarState={setNavBarState}
      />
      <MainContent navBarState={navBarState} />
      <Footer />
    </div>
  );
}

export default App;
