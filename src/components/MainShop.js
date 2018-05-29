import React, { Component } from 'react';
import {actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionHistoryAdd, actionUpdateQuantity} from '../actions/actions.js';
import {NO_DATA, LOADING} from '../actions/constants.js';
import {connect} from 'react-redux';
import firebase from './firebase.js';
import './MainShop.css'

class MainShop extends Component{
  componentDidMount(){
    this.fetchItemData();
    firebase.database().ref('/items/').on('child_changed',function(snapshot) {
        this.fetchItemData();
      }.bind(this))
    firebase.database().ref('/items/').on('child_added',function(snapshot) {
        this.fetchItemData();
      }.bind(this))
    firebase.database().ref('/items/').on('child_removed',function(snapshot) {
        this.fetchItemData();
      }.bind(this))

  }

    render(){
      let content;
  		if( this.props.fetchState === LOADING ) {
  			content = <div>Loading...</div>;
  		} else if( this.props.fetchState === NO_DATA ) {
  			content = <div>No data.</div>;
  		} else {
  			const dataList = this.props.data.map( (x, i) => (
  				<div className="shopRenderContainer" key={i} i={i}>
            <div><img className="productImg" src={x.productImg} alt="Not found"/></div>
            <div className="itemName">{x.itemName}</div>
            <div className="stockTxt">{x.stock}st i lager</div> {/*??*/}
            <div className="kronorTxt">{x.price}kr</div>
            <div className="blurImg"></div>
            <button className="buttonBuy"onClick={() => this.addItemToCart(x.itemName, i)} i={i}>BUY NOW</button>
          </div>
  			));
  			content = <div className="shopItems"> {dataList} </div>;
  		}

    return(
      <div className="shopContainer">
          <div className="shopWrap">
            {content}
          </div>
      </div>
    )
  }


  //Hämtar hem all data från firebase och lägger in dom i state
  fetchItemData(){
    let actionFetch = actionItemFetchData();
    let actionHistory = actionHistoryAdd(actionFetch.type);
    this.props.dispatch(actionFetch);
    this.props.dispatch(actionHistory)
    firebase.database().ref('/items/').once('value')
    .then(function(snapshot) {
      let items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      let actionGotData = actionFetchGotData(items);

      this.props.dispatch(actionGotData);
      this.props.dispatch(actionHistoryAdd(actionGotData.type));
    }.bind(this))
    .catch(message => {
      let fetchFailed = actionFetchFailed(message);
      this.props.dispatch(fetchFailed);
      this.props.dispatch(actionHistoryAdd(fetchFailed.type));
    })
  }

  addItemToCart(itemId, index){
      let find = this.props.data.find(item => item.itemName === itemId );
      if(find.stock > 0){
        firebase.database().ref('items/' + find.removeName).update({
          'stock': find.stock - 1
        });
      }else{
        console.log("Finns inga fler varor av denna sort")
      }
      let action = actionAddItem(find);
      let actionUpdate = actionUpdateQuantity(index, itemId, 1);
      let historyItem = action.type;
      let actionHistory = actionHistoryAdd(historyItem);
      console.log(action.name.itemName);
      if (this.props.cart.filter(e => e.cart.itemName === find.itemName).length > 0) {
        this.props.dispatch(actionUpdate)
        console.log("varan finns redan i din cart")
      }else{
        this.props.dispatch(action);
        this.props.dispatch(actionHistory);
      }
  }

}


let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    history: state.history,
    user: state.login.user,
    cart: state.cartItems.present,
  }
}

export default connect(mapStateToProps)(MainShop);
