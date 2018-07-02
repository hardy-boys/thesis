import { STOCK_REQUEST_RECEIVED, STOCK_REQUEST_ERROR, STOCK_DATA_RECEIVED, STOCK_DATA_UPDATE } from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  stockData: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STOCK_REQUEST_RECEIVED:
      return { ...state, fetching: true };
    case STOCK_REQUEST_ERROR:
      return { ...state, fetching: false, error: action.data };
    case STOCK_DATA_RECEIVED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        stockData: action.data,
      };
    case STOCK_DATA_UPDATE:
      return {
        ...state,
        stockData: action.data,
      };
    default:
      return state;
  }
};