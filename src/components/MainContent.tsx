import { useEffect, useState } from "react";
import { HomePage } from "./HomePage";
import { QuizPage } from "./QuizPage";
import { StatsPage } from "./StatsPage"
import { NavBarStatesType } from "../App";
import { addID } from "../utils/addID";

//SHAPE FOR API COUNTRY OBJECT
export interface CountryDataNoID {
  name: string;
  capital: string;
  continent: string;
  population: string;
  languages: LanguagesData[];
  flags: Record<string, string>;
  region: string;
  numericCode: string;
}

interface LanguagesData {
  [key: string]: string;
  name: string;
}

export interface CountryData extends CountryDataNoID{
  id: number;
}

//MainContentProps
interface MainContentProps {
  navBarState: NavBarStatesType;
}

export const MainContent = ({ navBarState }: MainContentProps): JSX.Element => {
  const [countriesArray, setCountriesArray] = useState<CountryData[]>([]);

  const fetchCountryData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const jsonBody: CountryDataNoID[] = await response.json();
    setCountriesArray(addID(jsonBody));
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  if (navBarState === "home") {
    return <HomePage countriesArray={countriesArray} />;
  } else if (navBarState === 'stats'){
    return (
      <StatsPage />
    );
  } else {
    return (
      <QuizPage countriesArray={countriesArray} navBarState={navBarState} />
    );
  }
};
