/**
 * Actions Types
 */
export const Types = {
  SCHEDULING_REQUEST: 'SCHEDULING_REQUEST',
  SCHEDULING_DATA: 'SCHEDULING_DATA',

  SCHEDULING_INCLUDE: 'SCHEDULING_INCLUDE',
  SCHEDULING_ERROR_INCLUDE: 'SCHEDULING_ERROR_INCLUDE',
  SCHEDULING_SUCCESS_INCLUDE: 'SCHEDULING_SUCCESS_INCLUDE',

};

/**
 * Reducer
 */
const INITIAL_STATE = {
  request: false,
  errorInclude: false,
  loading: false,
};

export default function schedulingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SCHEDULING_INCLUDE:
      return { ...state, loading: true, errorInclude: false }
    default:
      return state;
  };
};

/**
 * Actions Creators
 */

export const Creators = {
 
  //actions POST
  schedulingInclude: values => ({
    type: Types.SCHEDULING_INCLUDE,
    payload: { values },
  }),
};