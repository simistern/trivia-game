import { SAVE_ANSWER, SET_QUESTIONS, RESET_GAME } from './Types';

export const fetchQuestions = () => {
 return async () => {
    return await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    .then(async (res) => {
      return await res.json()
      .then((res2) => {  
          return res2.results;
      })
    })
  }
};

export const saveAnswer = content => ({
  type: SAVE_ANSWER,
  payload: content
});

export const setQuestions = content => ({
  type: SET_QUESTIONS,
  payload: content
});

export const resetGame = () => ({
  type: RESET_GAME,
});
