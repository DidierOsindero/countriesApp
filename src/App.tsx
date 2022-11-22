import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Footer } from "./components/Footer";

function App(): JSX.Element {
  const [navBarState, setNavBarState] = useState<string>('home');



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
