import {ADD_ITEM, ITEM_FETCH_DATA, FETCH_FAILED, FETCH_GOT_DATA, UPDATE_QUANTITY, UNDO_ITEM, ADD_ADMIN_ITEM, UNDO_ADMIN, REDO_ITEM, ADD_REMOVED_ITEM, UNDO_REMOVED_ITEM, REDO_REMOVED_ITEM} from './constants.js'

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

let actionUndoAdminItem = () => {
  return{
    type: UNDO_ADMIN
  };
}

let actionAddAdminItem = (itemName, price, productImg, removeName, stock) => {
  return{
    type: ADD_ADMIN_ITEM,
    itemName: itemName,
    price: price,
    productImg: productImg,
    removeName: removeName,
    stock: stock,
  }
}

let actionRedoItem = () => {
	return {
		type: REDO_ITEM
	};
}

let actionAddRemovedItem = (itemName, price, productImg, removeName, stock) => {
  return{
    type: ADD_REMOVED_ITEM,
    itemName: itemName,
    price: price,
    productImg: productImg,
    removeName: removeName,
    stock: stock,
  }
}

let actionUndoRemovedItem = () => {
  return{
    type: UNDO_REMOVED_ITEM
  };
}

let actionRedoRemovedItem = () => {
  return{
    type: REDO_REMOVED_ITEM
  };
}


export { actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionDisplayCart,
        actionUpdateQuantity, actionUndoItem, actionHistoryAdd, actionLogin,
        actionAddAdminItem, actionUndoAdminItem, actionRedoItem, actionAddRemovedItem, actionUndoRemovedItem, actionRedoRemovedItem};
