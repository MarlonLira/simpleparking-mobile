/**
 * Actions types 
 */
export const Types = {
  MAP_REQUEST: 'MAP_REQUEST',
  MAP_DATA: 'MAP_DATA',
}
/**
 * Reducer
 */
const INITIAL_STATE = {
  parkings: [],
  request: false,
  getDataSuccess: false,
};

export default function map(state = INITIAL_STATE , action) {
  switch (action.type) {
    case Types.MAP_REQUEST:
      return { ...state, request: true };
    case Types.MAP_DATA:
      return { ...state, parkings: action.payload, getDataSuccess: true };
    default:
      return state;
  };
};

/**
 * Actions Creators
 */
export const Creators = {
  mapRequest: () => ({
    type: Types.MAP_REQUEST,
  }),

  //Actions GET
  mapData: (parkings) => ({
    type: Types.MAP_DATA,
    payload: parkings,
  })
}