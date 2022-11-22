import { useEffect, useState } from "react";
import { HomePage } from "./HomePage";
import { QuizPage } from "./QuizPage";

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
  navBarState: string;
}

export const MainContent = ({
  navBarState
}: MainContentProps): JSX.Element => {
  const [countriesArray, setCountriesArray] = useState<CountryData[]>([]);

  const fetchCountryData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const jsonBody: CountryData[] = await response.json();
    setCountriesArray(jsonBody);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  if (navBarState === 'home') {
    return <HomePage countriesArray={countriesArray} />;
  } else if (navBarState === 'quiz') {
    return <QuizPage countriesArray={countriesArray} />;
  } else if (navBarState === 'flags') {
    return <QuizPage countriesArray={countriesArray} />;
  } else if (navBarState === 'capitals') {
    return <QuizPage countriesArray={countriesArray} />;
  } else {
    return <QuizPage countriesArray={countriesArray} />;
  }
};
