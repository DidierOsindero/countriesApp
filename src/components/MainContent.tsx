import { useState, useEffect } from "react";
import { CountryList } from "./CountryList";

//SHAPE FOR API COUNTRY OBJECT
export interface CountryData {
  [key: string]: unknown;
  name: string;
  capital: string;
  continent: string;
  population: string;
  languages: LanguagesData[];
}

interface LanguagesData {
  [key: string]: string;
  name: string;
}

//SHAPE FOR STATES
interface MainContenStates {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContent = (): JSX.Element => {
  //STATES
  const [searchText, setSearchText] = useState<string>("");

  //OBJECT TO PASS STATES
  const StatesObject: MainContenStates = {
    searchText: searchText,
    setSearchText: setSearchText,
  };
  //Handler Functions

  return (
    <div className="mainContentWrapper">
      <input
        value={searchText}
        onChange={(el) => setSearchText(el.target.value)}
      />
    </div>
  );
};
