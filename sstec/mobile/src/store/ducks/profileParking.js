/**
 * Actions types
 */
export const Types = {
  PROFILE_PARKING_REQUEST_SPACE: 'PROFILE_PARKING_REQUEST_SPACE',
  PROFILE_PARKING_REQUEST_SPACE_DATA: 'PROFILE_PARKING_REQUEST_SPACE_DATA',

  PROFILE_PARKING_EXIT: 'PROFILE_PARKING_EXIT',

};

/**
 * Reducer
 */
const INITIAL_STATE = {
  spaces: [],
  request: true,
  getDataSuccess: false,
};

export default function profileParking(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PROFILE_PARKING_REQUEST_SPACE:
      return { ...state, request: true, getDataSuccess: false }
    case Types.PROFILE_PARKING_REQUEST_SPACE_DATA:
      return { ...state, spaces: action.payload, getDataSuccess: true }
    case Types.PROFILE_PARKING_EXIT:
      return {...state, spaces: [], request: true, getDataSuccess: false, }
    default:
      return state
  };
};

/**
 * Actioin Creators
 */
export const Creators = {
  profileParkingRequestSpace: (id) => ({
    type: Types.PROFILE_PARKING_REQUEST_SPACE,
    payload: id,
  }),

  exitScreen: () => ({
    type: Types.PROFILE_PARKING_EXIT,
  }),

  //Actions GET
  spaceData: (spaces) => ({
    type: Types.PROFILE_PARKING_REQUEST_SPACE_DATA,
    payload: spaces,
  }),


};
