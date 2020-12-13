/**
 * Actions types 
 */
export const Types = {
  PRODUCT_REQUEST: 'PRODUCT_REQUEST',
  PRODUCT_DATA: 'PRODUCT_DATA',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  products: [],
  request: false,
  getDataSuccess: false,
};

export default function parkingProducts(state = INITIAL_STATE , action) {
  switch (action.type) {
    case Types.PRODUCT_REQUEST:
      return { ...state, request: true, getDataSuccess: false };
    case Types.PRODUCT_DATA:
      return { ...state, products: action.payload, getDataSuccess: true };
    default:
      return state;
  };
};

/**
 * Actions Creators
 */
export const Creators = {
  productRequest: (id) => ({
    type: Types.PRODUCT_REQUEST,
    payload: id,
  }),

  //Actions GET
  productData: (products) => ({
    type: Types.PRODUCT_DATA,
    payload: products,
  })
}