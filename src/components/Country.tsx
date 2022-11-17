import { CountryData } from "./MainContent";
import { MainContentStates } from "./MainContent"
interface CountryProps {
  currentCountry: CountryData;
}

export const Country = ({ currentCountry }: CountryProps): JSX.Element => {

    console.log(currentCountry.flags.png)
  return (
    <div className="countryWrapper">
      <h3>{currentCountry.name}</h3>
      <div className="countryContentWrapper">
        <img src={currentCountry.flags.png} width="150px" alt=""/>
        <p><b>Population:</b> {currentCountry.population}</p>
        <p><b>Capital:</b> {currentCountry.capital}</p>
        <p><b>Continent:</b> {currentCountry.region}</p>
        <p><b>Main Language:</b> {currentCountry.languages[0].name}</p>
        {currentCountry.languages[1] && <p><b>Second Language:</b> {currentCountry.languages[1].name}</p>}
      </div>
    </div>
  );
};
