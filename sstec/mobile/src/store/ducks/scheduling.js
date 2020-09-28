/**
 * Actions Types
 */
export const Types = {
  
};

/**
 * Reducer
 */
const INITIAL_STATE = {};

export default function schedulingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  };
};

/**
 * Actions Creators
 */

export const Creators = {
  add: () => ({
    type: 'ADD',
    payload: { text: 'Novo Agendamento' }
  }),
};