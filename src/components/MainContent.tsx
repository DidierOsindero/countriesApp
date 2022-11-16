import { useState, useEffect } from "react";
import { Country } from "./Country";

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
  const [countriesArray, setCountriesArray] = useState<CountryData[]>([]);

  //OBJECT TO PASS STATES
  const StatesObject: MainContenStates = {
    searchText: searchText,
    setSearchText: setSearchText,
  };

  const fetchCountryData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const jsonBody: CountryData[] = await response.json();
    setCountriesArray(jsonBody);
  };
  console.log("Countries Array: ", countriesArray);

  //LOADS COUNTRIES WHEN MOUNTED
  useEffect(() => {
    fetchCountryData();
  }, []);

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
