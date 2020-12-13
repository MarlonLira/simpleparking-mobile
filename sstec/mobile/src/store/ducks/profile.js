
/**
 * Actions Types
 */
export const Types = {
  USER: {
    REQUEST: 'USER_REQUEST',
    DATA: 'DATA_USER',
    PHOTO: 'PHOTO_USER',
    TOKEN: 'TOKEN_USER',
  },
  EDIT: {
    REQUEST: 'EDIT_REQUEST',
    SUCCESS: 'EDIT_SUCCESS',
    FAILURE: 'EDIT_FAILURE',
    OFF_EDIT: 'OFF_EDIT',
  },
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  dataUser: {},
  loading: true,
  errorLoading: false,
  loadingEdit: false,
  errorEdit: false,
  goBack: false,
  photoProfile: null,
  token: '',
};

export default function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.USER.REQUEST:
      return { ...state, loading: true };
    case Types.USER.DATA:
      return { ...state, dataUser: action.payload, errorLoading: false, loading: false };
    case Types.EDIT.REQUEST:
      return { ...state, loadingEdit: true, goBack: false, }
    case Types.EDIT.SUCCESS:
      return { ...state, errorLoading: false, loadingEdit: false, goBack: true, };
    case Types.EDIT.FAILURE:
      return { ...state, errorEdit: true, loadingEdit: false, goBack: false, };
    case Types.EDIT.OFF_EDIT:
      return { ...state, goBack: false, }
    case Types.USER.PHOTO:
      return { ...state, photoProfile: action.payload }
    case Types.USER.TOKEN:
      return { ...state, token: action.payload }
    default:
      return state;
  };
};

/**
 * Actions Creators
 */
export const Creators = {
  getUserRequest: id => ({
    type: Types.USER.REQUEST,
    payload: id,
  }),

  dataUser: (user) => ({
    type: Types.USER.DATA,
    payload: user,
  }),

  editRequest: values => ({
    type: Types.EDIT.REQUEST,
    payload: { values },
  }),

  getPhoto: (photo) => ({
    type: Types.USER.PHOTO,
    payload: photo,
  }),

  getToken: (token) => ({
    type: Types.USER.TOKEN,
    payload: token,
  }),

  editSuccess: () => ({
    type: Types.EDIT.SUCCESS,
  }),

  editFailure: () => ({
    type: Types.EDIT.FAILURE,
  }),

  offEdit: () => ({
    type: Types.EDIT.OFF_EDIT,
  }),
};