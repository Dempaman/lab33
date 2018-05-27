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



let historyReducer = (state=[], action) => {
  switch( action.type ) {
    case 'HISTORY_ADD':
          return [...state, action.item];
    default:
      return state;
  }
}

let loginReducer = (state={user: null}, action) => {
  switch( action.type ) {
    case 'LOGIN_USER':
          return {
            ...state,
            user: action.login
          }
    default:
      return state;
  }
}

let rootReducer = combineReducers({
  items: itemsReducer,
  cartItems: addItemReducer,
  history: historyReducer,
  login: loginReducer
})

export default rootReducer;
