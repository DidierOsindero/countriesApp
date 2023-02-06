import { CountryData } from "./components/MainContent";

export interface IQuizState {
  quizInputValue: string;
  submittedQuizAnswer: string;
  isAnswerCorrect: boolean | null;
  questionNumber: number;
  numOfCorrectAnswers: number;
  incorrectAnswersArray: CountryData[];
  correctAnswersArray: CountryData[];
}

export interface QuizAction {
  type: QuizActionType;
  payload?: QuizPayloadType;
}

type QuizActionType =
  | "submit answer"
  | "skip question"
  | "next country"
  | "play again"
  | "correct guess"
  | "incorrect guess"
  | "update input"
  
type QuizPayloadType = number | string | CountryData;


export const initialState: IQuizState = {
    quizInputValue: "",
  submittedQuizAnswer: "",
  isAnswerCorrect: null,
  questionNumber: 0,
  numOfCorrectAnswers: 0,
  incorrectAnswersArray: [],
  correctAnswersArray: [],
}

export function reducer(state: IQuizState, action: QuizAction): IQuizState {

    switch (action.type) {
        case 'submit answer':
          return {...state, submittedQuizAnswer: state.quizInputValue, quizInputValue: ""}
        case 'next country':
          return {...state, isAnswerCorrect: null, questionNumber: state.questionNumber + 1 }
        case 'skip question':
          return {...state, submittedQuizAnswer: "", quizInputValue: "", incorrectAnswersArray: [...state.incorrectAnswersArray, action.payload as CountryData], isAnswerCorrect: null, questionNumber: state.questionNumber+1}
        case 'play again':
          return initialState
        case 'correct guess':
          return {...state, submittedQuizAnswer: "", numOfCorrectAnswers: state.numOfCorrectAnswers + 1, correctAnswersArray: [...state.correctAnswersArray, action.payload as CountryData], isAnswerCorrect: true}
        case 'incorrect guess':
          return {...state, submittedQuizAnswer: "", incorrectAnswersArray: [...state.incorrectAnswersArray, action.payload as CountryData], isAnswerCorrect: false}
        case 'update input':
          return {...state, quizInputValue: action.payload as string}
        default:
          return state
    }
}
