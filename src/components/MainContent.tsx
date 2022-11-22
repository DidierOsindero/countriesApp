import { useEffect, useState } from "react";
import { HomePage } from "./HomePage";
import { QuizPage } from "./QuizPage";
import { NavBarStatesType } from "../App";

//SHAPE FOR API COUNTRY OBJECT
export interface CountryData {
  name: string;
  capital: string;
  continent: string;
  population: string;
  languages: LanguagesData[];
  flags: Record<string, string>;
  region: string;
}

interface LanguagesData {
  [key: string]: string;
  name: string;
}

//MainContentProps
interface MainContentProps {
  navBarState: NavBarStatesType;
}

export const MainContent = ({ navBarState }: MainContentProps): JSX.Element => {
  const [countriesArray, setCountriesArray] = useState<CountryData[]>([]);

  const fetchCountryData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const jsonBody: CountryData[] = await response.json();
    setCountriesArray(jsonBody);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  if (navBarState === "home") {
    return <HomePage countriesArray={countriesArray} />;
  } else {
    return (
      <QuizPage countriesArray={countriesArray} navBarState={navBarState} />
    );
  }
};
