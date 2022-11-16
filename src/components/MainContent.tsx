import { CountryList } from "./CountryList";

//SHAPE FOR API COUNTRY OBJECT
interface CountryData {
  [key:string]: unknown;
  name: string;
  capital: string;
  continent: string;
  population: string;
  languages: LanguagesData[];
}

interface LanguagesData {
  [key:string]: string;
  name: string;
}

export const MainContent = (): JSX.Element => {
  return (
    <div className="mainContentWrapper">
      <p>Main Content</p>
    </div>
  );
};
