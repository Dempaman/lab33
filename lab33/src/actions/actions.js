let actionItemFetchData = () => {
  return {
    type: 'ITEM_FETCH_DATA'
  };
}

let actionFetchFailed = msg => {
  return {
    type: 'FETCH_FAILED',
    message: msg
  };
}

let actionFetchGotData = data => {
  return {
    type: 'FETCH_GOT_DATA',
    data: data
  };
}

let actionAddItem = name => {
  return {
    type: 'ADD_ITEM',
    name: name
  };
}

export { actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem};
