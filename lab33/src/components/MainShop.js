import React, { Component } from 'react';
import {actionItemFetchData, actionFetchFailed, actionFetchGotData, actionAddItem} from '../actions/actions.js';
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
            <div>{x.itemName}</div>
            <div className="infoTxt">{x.info}</div>
            <div className="stockTxt">{x.stock} st i lager</div>
            <div className="kronorTxt">{x.price} kr</div>
            <button onClick={() => this.addItemToCart(x.itemName)}>Köp</button>
          </div>
  			));
  			content = <div className="shopItems"> {dataList} </div>;
  		}

      let contentCart;
      if(!this.props.cart){
        contentCart = <div>No items in the cart..</div>
      }else{
        const cartList = this.props.cart.map( y => (
            <div className="cartInfoDiv" key={y.itemName}>
              <div>{y.itemName}</div>
              <div>{y.info}</div>
              <div>{y.price} kr</div>
            </div>
        ));
        contentCart = <div > {cartList} </div>
      }

    return(
      <div>
        {/*<button onClick={this.handleClickFetchData}>Hämta data</button>*/}
        <div className="shopContainer">
          <div className="shopWrap">
            <div >{content}</div>
          </div>
        </div>
        <div className="rightSideWrap">{contentCart}</div>
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

  addItemToCart(itemId){
    firebase.database().ref('/items/').once('value')
    .then(function(snapshot) {
      let items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.props.dispatch(actionFetchGotData(items));
      let find = this.props.dispatch(actionFetchGotData(items)).data.find(item => item.itemName === `${itemId}` );
      //console.log(find)
      if(find.stock > 0){
        firebase.database().ref('items/' + find.id).update({
          'stock': find.stock - 1
        });
      }else{
        console.log("Finns inga fler varor av denna sort")
      }

      let action = actionAddItem(find);
      this.props.dispatch(action);
      //console.log(this.props.cart)
    }.bind(this))

  }

}

let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    cart: state.cartItems
  }
}

export default connect(mapStateToProps)(MainShop);
