import { CountryData } from "./components/MainContent";

type CountryQuizPropertyType = "name" | "capital" | "population";
export interface IQuizState {
  quizInputValue: string;
  submittedQuizAnswer: string;
  isAnswerCorrect: boolean | null;
  questionNumber: number;
  numOfCorrectAnswers: number;
  incorrectAnswersArray: CountryData[];
  correctAnswersArray: CountryData[];
  randomQuizArray: CountryData[];
  countryQuizProperty: CountryQuizPropertyType;
}

export interface QuizAction {
  type: QuizActionType;
  payload: QuizPayloadType;
}

type QuizActionType =
  | "submit answer"
  | "skip question"
  | "next country"
  | "play again"
  | "correct guess"
  | "incorrect guess"
  | "correct population guess"
  | "incorrect population guess";
type QuizPayloadType = number | string;

export function reducer(state: IQuizState, action: QuizAction) {}
