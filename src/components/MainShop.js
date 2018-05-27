import React, { Component } from 'react';
import {actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionHistoryAdd} from '../actions/actions.js';
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
  }

    render(){
      let content;
  		if( this.props.fetchState === LOADING ) {
  			content = <div>Loading...</div>;
  		} else if( this.props.fetchState === NO_DATA ) {
  			content = <div>No data.</div>;
  		} else {
  			const dataList = this.props.data.map( x => (
  				<div className="shopRenderContainer" key={x.itemName}>
            <div><img className="productImg" src={x.productImg} alt="Not found"/></div>
            <div className="itemName">{x.itemName}</div>
            <div className="kronorTxt">{x.price}kr</div>
            <div className="blurImg"></div>
            <button className="buttonBuy" onClick={() => this.addItemToCart(x.itemName)}>BUY NOW</button>
          </div>
  			));
  			content = <div className="shopItems"> {dataList} </div>;
  		}


    return(
      <div className="shopContainer">
        {/*<button onClick={this.handleClickFetchData}>Hämta data</button>*/}

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
    this.props.dispatch(actionHistory);
    console.log(actionFetch);
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

  addItemToCart(itemId){
    firebase.database().ref('/items/').once('value')
    .then(function(snapshot) {
      let items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      let actionFetch = actionFetchGotData(items);
      this.props.dispatch(actionFetch);
      this.props.dispatch(actionHistoryAdd(actionFetch.type));
      let find = this.props.data.find(item => item.itemName === itemId );
      if(find.stock > 0){
        firebase.database().ref('items/' + find.id).update({
          'stock': find.stock - 1
        });
      }else{
        console.log("Finns inga fler varor av denna sort")
      }
      let action = actionAddItem(find);
      let historyItem = action.type;
      let actionHistory = actionHistoryAdd(historyItem);
      console.log(action.name.itemName);
      if (this.props.cart.filter(e => e.itemName === find.itemName).length > 0) {
        console.log("finns redan i listan")
        // HÄR SKA VI GÖRA EN COUNTER FÖR VARJE PRODUKT HUR MÅNGA VI VILL KÖPA
      }else{
        this.props.dispatch(action);
        this.props.dispatch(actionHistory);
      }

    }.bind(this));

  }

}



let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    cart: state.cartItems,
    history: state.history,
    user: state.login.user
  }
}

export default connect(mapStateToProps)(MainShop);
