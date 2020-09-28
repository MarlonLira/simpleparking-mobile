/**
 * Actions Types
 */
export const Types = {
  CREDIT_CARD_REQUEST: 'CREDIT_CARD_REQUEST',

  CREDIT_CARD_INCLUDE: 'CREDIT_CARD_INCLUDE',
  CREDIT_CARD_ERROR_INCLUDE: 'CREDIT_CARD_ERROR_INCLUDE',
  CREDIT_CARD_SUCCESS_INCLUDE: 'CREDIT_CARD_SUCCESS_INCLUDE',

  CREDIT_CARD_DATA: 'CREDIT_CARD_DATA',

  CREDIT_CARD_EDIT: 'CREDIT_CARD_EDIT',
  CREDIT_CARD_OFF_EDIT: 'CREDIT_CARD_OF_EDIT',
  CREDIT_CARD_EDIT_ITEM: 'CREDIT_CARD_EDIT_ITEM',
  CREDIT_CARD_EDIT_ITEM_SUCCESS: 'CREDIT_CARD_EDIT_ITEM_SUCCESS',
  CREDIT_CARD_EDIT_ITEM_ERROR: 'CREDIT_CARD_EDIT_ITEM_ERROR',

  CREDIT_CARD_DELETE: 'CREDIT_CARD_DELETE',
  CREDIT_CARD_DELETE_SUCCESS: 'CREDIT_CARD_DELETE_SUCCESS',
  CREDIT_CARD_DELETE_ERROR: 'CREDIT_CARD_DELETE_ERROR',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  creditCards: [],
  request: false,
  errorInclude: false,
  loading: false,
  loadingData: false,
  onEdit: false,
  goBack: false,
  onDelete: false,
  card: {}
};

export default function creditCard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREDIT_CARD_REQUEST:
      return { ...state, request: true, loadingData: true, goBack: false, onEdit: false };
    case Types.CREDIT_CARD_INCLUDE:
      return { ...state, errorInclude: false, loading: true, goBack: false };
    case Types.CREDIT_CARD_ERROR_INCLUDE:
      return { ...state, errorInclude: true, loading: false, goBack: false };
    case Types.CREDIT_CARD_SUCCESS_INCLUDE:
      return { ...state, errorInclude: false, loading: false, goBack: true }
    case Types.CREDIT_CARD_DATA:
      return { ...state, creditCards: action.payload, loadingData: false, errorInclude: false, request: false, goBack: false }
    case Types.CREDIT_CARD_EDIT:
      return { ...state, onEdit: true, goBack: false, }
    case Types.CREDIT_CARD_OFF_EDIT:
      return { ...state, onEdit: false }
    case Types.CREDIT_CARD_EDIT_ITEM:
      return {...state, card: action.payload, loading: true, goBack: false }
    case Types.CREDIT_CARD_EDIT_ITEM_SUCCESS:
      return {...state, loading: false, goBack: true, }
    case Types.CREDIT_CARD_EDIT_ITEM_ERROR:
      return {...state, loading: false, goBack: false, }
    case Types.CREDIT_CARD_DELETE:
      return { ...state, onDelete: true }
    case Types.CREDIT_CARD_DELETE_SUCCESS:
      return { ...state, onDelete: false }
    case Types.CREDIT_CARD_DELETE_ERROR:
      return { ...state, onDelete: false }
    default:
      return state
  };
};

/**
 * Actions Creators
 */
export const Creators = {
  creditCardRequest: idUser => ({
    type: Types.CREDIT_CARD_REQUEST,
    payload: idUser,
  }),

  // Actions POST
  creditCardInclude: values => ({
    type: Types.CREDIT_CARD_INCLUDE,
    payload: { values },
  }),

  creditCardErrorInclude: () => ({
    type: Types.CREDIT_CARD_ERROR_INCLUDE,
  }),

  creditCardSuccessInclude: () => ({
    type: Types.CREDIT_CARD_SUCCESS_INCLUDE,
  }),

  // Actions GET
  creditCardData: (cards) => ({
    type: Types.CREDIT_CARD_DATA,
    payload: cards,
  }),

  //Actions DELETE
  creditCardDelete: idCard => ({
    type: Types.CREDIT_CARD_DELETE,
    payload: idCard,
  }),

  creditCardDeleteSuccess: () => ({
    type: Types.CREDIT_CARD_DELETE_SUCCESS,
  }),

  creditCardDeleteError: () => ({
    type: Types.CREDIT_CARD_DELETE_ERROR,
  }),

  //Actions PUT
  creditCardEdit: () => ({
    type: Types.CREDIT_CARD_EDIT,
  }),

  creditCardOfEdit: () => ({
    type: Types.CREDIT_CARD_OFF_EDIT,
  }),

  creditCardEditItem: (card) => ({
    type: Types.CREDIT_CARD_EDIT_ITEM,
    payload: { card },
  }),

  creditCardEditItemError: () => ({
    type: Types.CREDIT_CARD_EDIT_ITEM_ERROR,
  }),

  creditCardEditItemSuccess: () => ({
    type: Types.CREDIT_CARD_EDIT_ITEM_SUCCESS,
  }),

};
