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


export const initialState: IQuizState = {
    quizInputValue: "",
  submittedQuizAnswer: "",
  isAnswerCorrect: null,
  questionNumber: 0,
  numOfCorrectAnswers: 0,
  incorrectAnswersArray: [],
  correctAnswersArray: [],
  countryQuizProperty: "name",
}

export function reducer(state: IQuizState, action: QuizAction): IQuizState {

    switch (action.type) {
        case ''
    }
    return state
}
