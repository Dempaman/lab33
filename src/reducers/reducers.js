import {combineReducers} from 'redux';
import {NO_DATA, LOADING, LOADED, UPDATE_QUANTITY, ADD_ITEM, UNDO_ITEM, ADD_ADMIN_ITEM, UNDO_ADMIN, REDO_ITEM, ADD_REMOVED_ITEM, UNDO_REMOVED_ITEM, REDO_REMOVED_ITEM} from '../actions/constants.js';

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
      return{
        past: state.past.filter( x => x !== lastPast ),
        present: lastPast,
        future: [state.present, ...state.future]
      }

      default:
        return state;
    }
}

let adminItemReducer = (state= {past:[], present:[], future:[]}, action) => {
  switch( action.type ) {
    case ADD_ADMIN_ITEM:
      return{
        past: [...state.past, state.present ],
        present: [
          ...state.present,
          {
            itemName: action.itemName,
            price: action.price,
            productImg: action.productImg,
            removeName: action.removeName,
            stock: action.stock
          }
        ],
        future: []
      };

    case UNDO_ADMIN:
      let lastPast = state.past[state.past.length - 1];
      return{
        past: state.past.filter( x => x !== lastPast ),
        present: lastPast,
        future: [state.present, ...state.future]
      }

    case REDO_ITEM:
				let firstFuture = state.future[0];
				return {
					past: [...state.past, state.present],
					present: firstFuture,
					future: state.future.filter(x => x !== firstFuture)
				};

      default:
        return state;
    }
}

let recoverRemovedItemFromFbReducer = (state= {past:[], present:[], future:[]}, action) => {
  switch( action.type ) {
    case ADD_REMOVED_ITEM:
      return{
        past: [...state.past, state.present ],
        present: [
          ...state.present,
          {
            itemName: action.itemName,
            price: action.price,
            productImg: action.productImg,
            removeName: action.removeName,
            stock: action.stock
          }
        ],
        future: []
      };

    case UNDO_REMOVED_ITEM:
      let lastPast = state.past[state.past.length - 1];
      console.log("UNDO_REMOVED_ITEM", state.present, state.future)
      return{
        past: state.past.filter( x => x !== lastPast ),
        present: lastPast,
        future: [state.present, ...state.future]
      }

    case REDO_REMOVED_ITEM:
				let firstFuture = state.future[0];
				return {
					past: [...state.past, state.present],
					present: firstFuture,
					future: state.future.filter(x => x !== firstFuture)
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
  adminItem: adminItemReducer,
  recoverItem: recoverRemovedItemFromFbReducer
})

export default rootReducer;
