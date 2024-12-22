// reducers/index.js
import { combineReducers } from 'redux';
import {cartReducer} from '../redux/reducers';

export const rootReducer = combineReducers({
    cartList: cartReducer,
});

