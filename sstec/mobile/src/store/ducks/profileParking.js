/**
 * Actions types
 */
export const Types = {
  PROFILE_PARKING_REQUEST_SPACE: 'PROFILE_PARKING_REQUEST_SPACE',
  PROFILE_PARKING_REQUEST_SPACE_DATA: 'PROFILE_PARKING_REQUEST_SPACE_DATA',

  PROFILE_PARKING_REQUEST: 'PROFILE_PARKING_REQUEST',
  PROFILE_PARKING_DATA: 'PROFILE_PARKING_DATA',

  PROFILE_PARKING_EXIT: 'PROFILE_PARKING_EXIT',

};

/**
 * Reducer
 */
const INITIAL_STATE = {
  spaces: [],
  request: false,
  getDataSuccess: false,
  getProfileSuccess: false,
  profile: {},
};

export default function profileParking(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PROFILE_PARKING_REQUEST_SPACE:
      return { ...state, request: true, getDataSuccess: false }
    case Types.PROFILE_PARKING_REQUEST_SPACE_DATA:
      return { ...state, spaces: action.payload, getDataSuccess: true }
    case Types.PROFILE_PARKING_EXIT:
      return { ...state, getDataSuccess: false, request: false, getProfileSuccess: false, profile: {}, spaces: [], }
    case Types.PROFILE_PARKING_REQUEST:
      return { ...state, getProfileSuccess: false, profile: {} }
    case Types.PROFILE_PARKING_DATA:
      return { ...state, getProfileSuccess: true, profile: action.payload }
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

  profileparkingrequest: (id) => ({
    type: Types.PROFILE_PARKING_REQUEST,
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

  profileData: (profile) => ({
    type: Types.PROFILE_PARKING_DATA,
    payload: profile,
  }),


};
