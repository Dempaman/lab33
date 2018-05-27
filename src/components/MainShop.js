import React, { Component } from 'react';
import {actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem, actionUpdateQuantity, actionTotalSum} from '../actions/actions.js';
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
  			const dataList = this.props.data.map( (x, i) => (
  				<div onMouseEnter={this.hover}
              onMouseLeave={this.leaveHover}
              className="shopRenderContainer" key={i} i={i}>
            <div><img className="productImg" src={x.productImg} alt="Not found"/></div>
            <div className="itemName">{x.itemName}</div>

            <div className="stockTxt">{x.stock} st i lager</div>
            <div className="kronorTxt">{x.price}kr</div>
            <div className="blurImg"></div>
            <button onClick={() => this.addItemToCart(x.itemName, i)} i={i}>BUY NOW</button>
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
    this.props.dispatch(actionItemFetchData());

    firebase.database().ref('/items/').once('value')
    .then(function(snapshot) {
      let items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.props.dispatch(actionFetchGotData(items));
    }.bind(this))
    .catch(message => {
      this.props.dispatch(actionFetchFailed(message));
    })
  }

  addItemToCart(itemId, index){
    firebase.database().ref('/items/').once('value')
    .then(function(snapshot) {
      let items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.props.dispatch(actionFetchGotData(items));
      let find = this.props.data.find(item => item.itemName === itemId );
      if(find.stock > 0){
        firebase.database().ref('items/' + find.itemName).update({
          'stock': find.stock - 1
        });
      }else{
        console.log("Finns inga fler varor av denna sort")
      }
      let action = actionAddItem(find);
      let actionUpdate = actionUpdateQuantity(index, itemId, 1);
      let actionSum = actionTotalSum(find.price);

      if (this.props.cart.filter(e => e.cart.itemName === find.itemName).length > 0) {
        this.props.dispatch(actionUpdate)
        console.log("varan finns redan i din cart")
      }else{
        this.props.dispatch(action);
      }
      this.props.dispatch(actionSum);
      console.log(this.props.sum)
    }.bind(this));
  }

}


let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    cart: state.cartItems,
    sum: state.sum
  }
}

export default connect(mapStateToProps)(MainShop);
