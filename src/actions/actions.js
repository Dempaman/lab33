import {ADD_ITEM, ITEM_FETCH_DATA, FETCH_FAILED, FETCH_GOT_DATA, UPDATE_QUANTITY, ADD_SUM, UNDO_ITEM, UNDO_SUM, ADD_ADMIN_ITEM, EDIT_ITEM, REMOVE_ITEM} from './constants.js'

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

let actionAddAdminItem = (itemName, price, productImg, removeName, stock) => {
  return{
    type: ADD_ADMIN_ITEM,
    itemName: itemName,
    price: price,
    productImg: productImg,
    removeName: removeName,
    stock: stock
  }
}

let actionEditItem = () => {
  return{
    type: EDIT_ITEM,
  }
}

let actionRemoveItem = () => {
  return{
    type: REMOVE_ITEM,
  }
}

export { actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionDisplayCart,
        actionUpdateQuantity, actionUndoItem, actionHistoryAdd, actionLogin,
        actionAddAdminItem, actionEditItem, actionRemoveItem};
