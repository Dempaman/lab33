import {ADD_ITEM, ITEM_FETCH_DATA, FETCH_FAILED, FETCH_GOT_DATA, UPDATE_QUANTITY, ADD_SUM} from './constants.js'

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
  }
}

let actionUpdateQuantity = (index, itemId, amount) => {
  return {
    type: UPDATE_QUANTITY,
    index: index,
    itemId: itemId,
    amount: amount
  };
}

let actionDisplayCart = bool => {
  return{
    type: 'SHOW_CART',
    showCart: bool
  }
}

export { actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionDisplayCart, actionUpdateQuantity, actionTotalSum};
