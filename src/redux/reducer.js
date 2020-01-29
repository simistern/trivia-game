import { SAVE_ANSWER, SET_QUESTIONS, RESET_GAME } from './Types';

const initialState = {
  questions: [],
  answeredQuestions: [],
  currentQuestion: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS: {
        return { questions: action.payload, currentQuestion: 0, answeredQuestions: []}
    }
    case SAVE_ANSWER: {
        return { 
          questions: state.questions,
          currentQuestion: ++state.currentQuestion,
          answeredQuestions: [...state.answeredQuestions, action.payload]
        }
    }
    case RESET_GAME: {
      return { 
        questions: [],
        currentQuestion: 0,
        answeredQuestions: []
      }
    }
    default:
      return state;
  }
}
