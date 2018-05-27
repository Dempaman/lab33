import {ADD_ITEM, ITEM_FETCH_DATA, FETCH_FAILED, FETCH_GOT_DATA} from './constants.js'

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

let actionAddItem = name => {
  return {
    type: ADD_ITEM,
    name: name,
    quantity: 0
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

let actionAddUserToDb = info => {
  return{

  }
}

export { actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionHistoryAdd, actionLogin};
