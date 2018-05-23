import {combineReducers} from 'redux';
import {NO_DATA, LOADING, LOADED} from '../actions/constants.js';

let itemsReducer = (state={fetchState: NO_DATA, itemsData: null }, action) =>{
  switch(action.type){
    case 'ITEM_FETCH_DATA':
      return {
        ...state,
        fetchState: LOADING
      };
    case 'FETCH_FAILED':
      return {
        ...state,
        fetchState: NO_DATA
      };
    case 'FETCH_GOT_DATA':
      return {
        ...state,
        fetchState: LOADED,
        itemsData: action.data
      };
    default:
      return state;
  }
}

let addItemReducer = (state=[], action) => {
  switch( action.type ) {
    case 'ADD_ITEM':
      return [...state, action.name];

      default:
        return state;
    }
}

let showCartReducer = (state={showCart: false}, action) => {
  switch( action.type ) {
    case 'SHOW_CART':
      return {
        ...state,
        showCart: action.bool
      };
    default:
      return state;
  }
}

let rootReducer = combineReducers({
  items: itemsReducer,
  cartItems: addItemReducer,
  showCart: showCartReducer
})

export default rootReducer;
