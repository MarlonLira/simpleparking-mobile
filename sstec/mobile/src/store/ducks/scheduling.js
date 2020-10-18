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
  schedulings: [],
  request: false,
  errorInclude: false,
  successInclude: false,
  loading: false,
};

export default function scheduling(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SCHEDULING_REQUEST:
      return { ...state, request: true, loading: false, errorInclude: false, successInclude: false }
    case Types.SCHEDULING_DATA:
      return { ...state, request: false, schedulings: action.payload, }
    case Types.SCHEDULING_INCLUDE:
      return { ...state, loading: true, errorInclude: false, successInclude: false}
    case Types.SCHEDULING_ERROR_INCLUDE:
      return { ...state, loading: false, errorInclude: true, successInclude: false}
    case Types.SCHEDULING_SUCCESS_INCLUDE:
      return { ...state, loading: false, errorInclude: false, successInclude: true}
    default:
      return state;
  };
};

/**
 * Actions Creators
 */

export const Creators = {

  //action GET
  schedulingRequest: (idUser) => ({
    type: Types.SCHEDULING_REQUEST,
    payload: idUser,
  }),

  schedulingData: (schedulings) => ({
    type: Types.SCHEDULING_DATA,
    payload: schedulings,
  }),

  //actions POST
  schedulingInclude: values => ({
    type: Types.SCHEDULING_INCLUDE,
    payload: { values },
  }),

  schedulingErrorInclude: () => ({
    type: Types.SCHEDULING_ERROR_INCLUDE,
  }),

  schedulingSuccessInclude: () => ({
    type: Types.SCHEDULING_SUCCESS_INCLUDE,
  }),
};