import { useState, useEffect } from "react";
import { Country } from "./Country";

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
  homeButton: boolean;
  quizButton: boolean;
}

export const MainContent = ({
  homeButton,
  quizButton,
}: MainContentProps): JSX.Element => {
  //STATES
  const [searchText, setSearchText] = useState<string>("");
  const [countriesArray, setCountriesArray] = useState<CountryData[]>([]);
  const [bigCountryFilter, setBigCountryFilter] = useState<boolean>(false);
  const [smallCountryFilter, setSmallCountryFilter] = useState<boolean>(false);

  //QUIZ STATES
  const [quizInputValue, setQuizInputValue] = useState<string>("");
  const [submittedQuizAnswer, setSubmittedQuizAnswer] = useState<string>("");

  const fetchCountryData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const jsonBody: CountryData[] = await response.json();
    setCountriesArray(jsonBody);
  };

  //LOADS COUNTRIES WHEN MOUNTED
  useEffect(() => {
    fetchCountryData();
  }, []);

  //Handler Functions
  const handleBigCountryFilter = () => {
    setBigCountryFilter((prev) => !prev);
    setSmallCountryFilter(false);
  };

  const handleSmallCountryFilter = () => {
    setSmallCountryFilter((prev) => !prev);
    setBigCountryFilter(false);
  };

  const handleAnswerSubmit = () => {
    setSubmittedQuizAnswer(quizInputValue);
    setQuizInputValue("");
  };

  console.log(submittedQuizAnswer)

  if (homeButton) {
    return (
      <div className="mainContentWrapper">
        <div className="searchTools">
          <div className="searchBarWrapper">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="filterButtonsWrapper">
            <button
              onClick={handleBigCountryFilter}
              className={
                bigCountryFilter
                  ? "bigCountryFilterPressed"
                  : "bigCountryFilter"
              }
            >
              Big Countries
            </button>
            <button
              onClick={handleSmallCountryFilter}
              className={
                smallCountryFilter === true
                  ? "smallCountryFilterPressed"
                  : "smallCountryFilter"
              }
            >
              Small Countries
            </button>
          </div>
        </div>
        <div className="countryListWrapper">
          {countriesArray
            .filter((country) => {
              const isMatchingSearch = country.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
              const isBigCountry = Number(country.population) > 50000000;
              const isSmallCountry = Number(country.population) < 5000000;
              if (bigCountryFilter && smallCountryFilter) {
                return isBigCountry && isSmallCountry && isMatchingSearch;
              } else if (bigCountryFilter) {
                return isBigCountry && isMatchingSearch;
              } else if (smallCountryFilter) {
                return isSmallCountry && isMatchingSearch;
              } else {
                return isMatchingSearch;
              }
            })
            .map((el) => (
              <Country currentCountry={el} key={el.name} />
            ))}
        </div>
        <hr />
      </div>
    );
  } else {
    return (
      <div className="quizWrapper">
        <h2>Name the Country</h2>
        <img
          className="quizImage"
          src={countriesArray[25].flags.png}
          height="300px"
          alt=""
        />
        <div className="quizInputWrapper">
          
            <input
              value={quizInputValue}
              onChange={(el) => setQuizInputValue(el.target.value)}
              name="userInputAnswer"
              placeholder="Country name..."
            />
            <input type="submit" onClick={handleAnswerSubmit} name="userAnswerSubmit" />
         
        </div>
        <hr />
      </div>
    );
  }
};
