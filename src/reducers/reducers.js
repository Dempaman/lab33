import {combineReducers} from 'redux';
import {NO_DATA, LOADING, LOADED, UPDATE_QUANTITY, ADD_ITEM, ADD_SUM, UNDO_ITEM, UNDO_SUM} from '../actions/constants.js';

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

let addItemReducer = (state= {past:[], present:[], future:[]}, action) => {
  switch( action.type ) {
    case ADD_ITEM:
      return{
        past: [...state.past, state.present ],
        present: [...state.present, { cart: action.name, quantity:action.quantity} ],
        future: []
      };

    case UPDATE_QUANTITY:
    return{
      past: [...state.past, state.present ],
      present: state.present.map( (item, index) => {
          if(item.cart.itemName !== action.itemId) {
              return item;
          }
          return {
              ...item, quantity: item.quantity + action.amount
          };
      }), //present
      future: []
    };

    case UNDO_ITEM:
      let lastPast = state.past[state.past.length - 1];
      //console.log("UNDO_ITEM", state.past, state.present)
      return{
        past: state.past.filter( x => x !== lastPast ),
        present: lastPast,
        future: [state.present, ...state.future]
      }

      default:
        return state;
    }
}



let totalSumReducer = (state ={past:[], present:0, future:[]}, action) =>{
  switch ( action.type ) {
    case ADD_SUM:
    return {
      past: [...state.past, state.present],
      present: state.present + Number(action.sum),
      future: []
    };

    case UNDO_SUM:
    if( state.past.length < 1 )
      return state;
    let last = state.past[state.past.length - 1];
    return {
      past: state.past.filter(x => x !== last),
      present: last,
      future: [state.present, ...state.future]
    };

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
  login: loginReducer,
  showCart: showCartReducer,
  sum: totalSumReducer

})

export default rootReducer;
