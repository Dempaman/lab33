import {combineReducers} from 'redux';
import {NO_DATA, LOADING, LOADED, UPDATE_QUANTITY, ADD_ITEM, ADD_SUM} from '../actions/constants.js';

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

let addItemReducer = (state=[{cart: null, quantity: 0}], action) => {
  switch( action.type ) {
    case ADD_ITEM:
      return[
        ...state,
          {
            cart: action.name,
            quantity:action.quantity,
          }
    ];

    case UPDATE_QUANTITY:
      return state.map( (item, index) => {
          if(item.cart.itemName !== action.itemId) {
              return item;
          }
          return {
              ...item, quantity: item.quantity + action.amount,
              ...action.item
          };
      });

      default:
        return state;
    }
}

let totalSumReducer = (state = 0, action) =>{
  switch ( action.type ) {
    case ADD_SUM:
      return state + action.sum;

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
  showCart: showCartReducer,
  sum: totalSumReducer
})

export default rootReducer;
