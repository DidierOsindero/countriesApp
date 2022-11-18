import { useEffect, useState } from "react";
import { CountryData } from "./MainContent";

export const QuizPage = (): JSX.Element => {
  //QUIZ STATES
  const [quizInputValue, setQuizInputValue] = useState<string>("");
  const [submittedQuizAnswer, setSubmittedQuizAnswer] = useState<string>("");
  const [countriesArray, setCountriesArray] = useState<CountryData[]>([]);

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
  const handleAnswerSubmit = () => {
    setSubmittedQuizAnswer(quizInputValue);
    setQuizInputValue("");
  };

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
};
