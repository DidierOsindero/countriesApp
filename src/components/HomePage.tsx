import { useState } from "react";
import { CountryData } from "./MainContent";
import { Country } from "./Country";

interface HomePageProps {
  countriesArray: CountryData[];
}

export const HomePage = ({ countriesArray }: HomePageProps): JSX.Element => {
  const [searchText, setSearchText] = useState<string>("");
  const [bigCountryFilter, setBigCountryFilter] = useState<boolean>(false);
  const [smallCountryFilter, setSmallCountryFilter] = useState<boolean>(false);

  //Handler Functions
  const handleBigCountryFilter = () => {
    setBigCountryFilter((prev) => !prev);
    setSmallCountryFilter(false);
  };

  const handleSmallCountryFilter = () => {
    setSmallCountryFilter((prev) => !prev);
    setBigCountryFilter(false);
  };

  //error message if data could not be fetched
  setTimeout(() => {
    if (countriesArray.length === 0) {
      return <h3 className="fetchDataErrorMsg">{"Could Not Fetch Data :("}</h3>;
    }
  }, 3000);

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
              bigCountryFilter ? "bigCountryFilterPressed" : "bigCountryFilter"
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
};
