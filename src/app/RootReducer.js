import { combineReducers } from 'redux';
import productReducer from '../features/products/productSlice';

const rootReducer = combineReducers({
  product: productReducer,
  
});

export default rootReducer;
