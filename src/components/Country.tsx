import { CountryData } from "./MainContent";

interface CountryProps {
  currentCountry: CountryData;
}

export const Country = ({ currentCountry }: CountryProps): JSX.Element => {
  return (
    <div className="countryWrapper">
      <h3>{currentCountry.name}</h3>
      <div className="countryContentWrapper">
        <p>Population: {currentCountry.population}</p>
        <p>Capital: {currentCountry.capital}</p>
        <p>Continent: {currentCountry.region}</p>
        <p>Main Language: {currentCountry.languages[0].name}</p>
        {currentCountry.languages[1] && <p>Second Language: {currentCountry.languages[1].name}</p>}
      </div>
    </div>
  );
};
