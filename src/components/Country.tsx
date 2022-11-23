import { useState } from "react";
import { CountryData } from "./MainContent";

interface CountryProps {
  currentCountry: CountryData;
}

export const Country = ({ currentCountry }: CountryProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleIsClicked = () => {
    setIsClicked((prev) => !prev);
  };

  if (isClicked) {
    return (
      <div className="countryWrapper">
        <h3>{currentCountry.name}</h3>
        <div className="countryContentWrapper" onClick={handleIsClicked}>
          <img src={currentCountry.flags.svg} width="150px" alt="" />
          <p>
            <b>Population:</b> {currentCountry.population.toLocaleString()}
          </p>
          <p>
            <b>Capital:</b> {currentCountry.capital}
          </p>
          <p>
            <b>Continent:</b> {currentCountry.region}
          </p>
          <p>
            <b>Main Language:</b> {currentCountry.languages[0].name}
          </p>
          {currentCountry.languages[1] && (
            <p>
              <b>Second Language:</b> {currentCountry.languages[1].name}
            </p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="countryWrapper">
        <h3>{currentCountry.name}</h3>
        <div className="countryContentWrapper" onClick={handleIsClicked}>
          <img
            src={currentCountry.flags.png}
            width="150px"
            height="100px"
            alt=""
          />
          <p>
            <i>Click For More...</i>
          </p>
        </div>
      </div>
    );
  }
};
