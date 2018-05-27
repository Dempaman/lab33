import {ADD_ITEM, ITEM_FETCH_DATA, FETCH_FAILED, FETCH_GOT_DATA, UPDATE_QUANTITY, ADD_SUM, UNDO_ITEM, UNDO_SUM} from './constants.js'

let actionItemFetchData = () => {
  return {
    type: ITEM_FETCH_DATA
  };
}

let actionFetchFailed = msg => {
  return {
    type: FETCH_FAILED,
    message: msg
  };
}

let actionFetchGotData = data => {
  return {
    type: FETCH_GOT_DATA,
    data: data
  };
}

let actionAddItem = (name, quantity) => {
  return {
    type: ADD_ITEM,
    name: name,
    quantity: 1,
  };
}

let actionTotalSum = (sum) => {
  return {
    type: ADD_SUM,
    sum: sum
  };
}

let actionUpdateQuantity = (index, itemId, amount) => {
  return {
    type: UPDATE_QUANTITY,
    index: index,
    itemId: itemId,
    amount: amount
  };
}


let actionHistoryAdd = item =>{
  return{
    type: 'HISTORY_ADD',
    item: item
  }
}

let actionLogin = login =>{
  return{
    type: 'LOGIN_USER',
    login: login
  }
}


let actionDisplayCart = bool => {
  return{
    type: 'SHOW_CART',
    showCart: bool
  };
}

let actionUndoItem = () => {
  return{
  type: UNDO_ITEM,
  };
}
let actionUndoSum = () => {
  return{
  type: UNDO_SUM,
  };
}

export { actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionDisplayCart, actionUpdateQuantity, actionTotalSum, actionUndoItem, actionUndoSum, actionHistoryAdd, actionLogin};
