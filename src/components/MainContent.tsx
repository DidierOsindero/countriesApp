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
  flags: Record<string, string>;
}

interface LanguagesData {
  [key: string]: string;
  name: string;
}

//SHAPE FOR STATES
export interface MainContentStates {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContent = (): JSX.Element => {
  //STATES
  const [searchText, setSearchText] = useState<string>("");
  const [countriesArray, setCountriesArray] = useState<CountryData[]>([]);
  const [bigCountryFilter, setBigCountryFilter] = useState<boolean>(false);
  const [smallCountryFilter, setSmallCountryFilter] = useState<boolean>(false);

  //OBJECT TO PASS STATES
  const StatesObject: MainContentStates = {
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
  const handleBigCountryFilter = () => {
    setBigCountryFilter((prev) => !prev);
    setSmallCountryFilter(false);
  };

  const handleSmallCountryFilter = () => {
    setSmallCountryFilter((prev) => !prev);
    setBigCountryFilter(false);
  };

  return (
    <div className="mainContentWrapper">
      <div className="searchTools">
        <div>
          <input
            value={searchText}
            onChange={(el) => setSearchText(el.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleBigCountryFilter}
            className={
              bigCountryFilter
                ? "bigCountryFilterPressed, filterButton"
                : "bigCountryFilter, filterButton"
            }
          >
            Big Countries
          </button>
          <button
            onClick={handleSmallCountryFilter}
            className={
              bigCountryFilter
                ? "smallCountryFilterPressed, filterButton"
                : "smallCountryFilter, filterButton"
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
          .map((el, index) => (
            <Country currentCountry={el} key={index} />
          ))}
      </div>
    </div>
  );
};
