import { CountryData } from "../components/MainContent";
import { CountryDataNoID } from "../components/MainContent";

export const addID = (fetchedCountryData: CountryDataNoID[]): CountryData[] => {
  const countryDataWithID = fetchedCountryData.map((el, index) => {
    return { ...el, id: index + 1 };
  });
  return countryDataWithID;
};
