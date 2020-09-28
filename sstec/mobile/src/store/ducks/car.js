/**
 * Actions types 
 */
export const Types = {
  CAR_REQUEST: 'CAR_REQUEST',
  CAR_DATA: 'CAR_DATA',

  CAR_INCLUDE: 'CAR_INCLUDE',
  CAR_ERROR_INCLUDE: 'CAR_ERROR_INCLUDE',
  CAR_SUCCESS_INCLUDE: 'CAR_SUCCESS_INCLUDE',

  CAR_DELETE: 'CAR_DELETE',
  CAR_DELETE_SUCCESS: 'CAR_DELETE_SUCCESS',
  CAR_DELETE_ERROR: 'CAR_DELETE_ERROR',

  CAR_EDIT: 'CAR_EDIT',
  CAR_OFF_EDIT: 'CAR_OFF_EDIT',
  CAR_EDIT_ITEM: 'CAR_EDIT_ITEM',
  CAR_EDIT_ITEM_SUCCESS: 'CAR_EDIT_ITEM_SUCCESS',
  CAR_EDIT_ITEM_ERROR: 'CAR_EDIT_ITEM_ERROR',
  
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  cars: [],
  request: false,
  errorInclude: false,
  loading: false,
  goBack: false,
  loadingData: false,
  onDelete: false,
  onEdit: false,
  car: {},
};

export default function car(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CAR_REQUEST:
      return { ...state, request: true, errorInclude: false, loading: false, loadingData: true, goBack: false };
    case Types.CAR_DATA:
      return { ...state, cars: action.payload, request: false, loadingData: false }
    case Types.CAR_INCLUDE:
      return { ...state, loading: true, errorInclude: false, goBack: false }
    case Types.CAR_ERROR_INCLUDE:
      return { ...state, loading: false, errorInclude: true, goBack: false }
    case Types.CAR_SUCCESS_INCLUDE:
      return { ...state, loading: false, errorInclude: false, goBack: true }
    case Types.CAR_DELETE:
      return { ...state, onDelete: true, }
    case Types.CAR_DELETE_SUCCESS || Types.CAR_DELETE_ERROR:
      return { ...state, onDelete: false, }
    case Types.CAR_EDIT: 
      return { ...state, onEdit: true, goBack: false, }
    case Types.CAR_OFF_EDIT: 
      return { ...state, onEdit: false, }
    case Types.CAR_EDIT_ITEM: 
      return { ...state, car: action.payload, loading: true, goBack: false, }
    case Types.CAR_EDIT_ITEM_SUCCESS:
      return { ...state, loading: false, goBack: true, }
    case Types.CAR_EDIT_ITEM_ERROR: 
      return { ...state, loading: false, goBack: false, }
    default:
      return state
  }
};

/**
 * Actions Creators
 */
export const Creators = {
  carRequest: idUser => ({
    type: Types.CAR_REQUEST,
    payload: idUser,
  }),

  // Actions GET
  carData: (cars) => ({
    type: Types.CAR_DATA,
    payload: cars,
  }),

  //Actions POST
  carInclude: values => ({
    type: Types.CAR_INCLUDE,
    payload: { values },
  }),

  carErrorInclude: () => ({
    type: Types.CAR_ERROR_INCLUDE,
  }),

  carSuccessInclude: () => ({
    type: Types.CAR_SUCCESS_INCLUDE,
  }),

  //Action DELETE
  carDelete: idCar => ({
    type: Types.CAR_DELETE,
    payload: idCar,
  }),

  carDeleteSuccess: () => ({
    type: Types.CAR_DELETE_SUCCESS,
  }),

  carDeleteError: () => ({
    type: Types.CAR_DELETE_ERROR,
  }),
  
  //Action PUT
  carEdit: () => ({
    type: Types.CAR_EDIT,
  }),

  carOffEdit: () => ({
    type: Types.CAR_OFF_EDIT,
  }),

  carEditItem: (values) => ({
    type: Types.CAR_EDIT_ITEM,
    payload: { values }
  }),

  carEditItemError: () => ({
    type: Types.CAR_EDIT_ITEM_ERROR,
  }),

  carEdiItemSuccess: () => ({
    type: Types.CAR_EDIT_ITEM_SUCCESS,
  }),
};