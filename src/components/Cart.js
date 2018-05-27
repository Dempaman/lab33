import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionFetchGotData, actionAddItem, actionUpdateQuantity, actionTotalSum, actionUndoItem, actionUndoSum} from '../actions/actions.js';
import firebase from './firebase.js';
import './Cart.css';

class Cart extends Component {

  render(){
      let contentCart;
      let contentSum;
      if(!this.props.cart){
        contentCart = <div>No items in the cart..</div>
      }else{
        const cartList = this.props.cart.map( (y, i) => (
            <div className="cartInfoDiv" key={i} i={i}>
              <div>{y.cart.itemName}</div>
              <div>{y.cart.price} kr</div>
              <div>{y.quantity} st</div>
              <button onClick={() => this.addItemToCart(y.cart.itemName, i)} i={i}>+</button>
              <button onClick={() => this.removeOneItemFromCart(y.cart.itemName, i)} i={i} disabled={y.quantity <= 1} >-</button>
            </div>
        ));
        contentCart = <div className="cartHolder"> {cartList} </div>
      }
      if(this.props.sum === 0){
        contentSum = <div>Du har inga varor i kundvagnen</div>
      }else{
        contentSum = <div>Totalt {this.props.sum}</div>
      }


    return(
      <div className="containerCart">
        <button onClick={this.handleUndoItem} >Undo Item</button>
        <div>
          {contentCart}
        </div>
        <div className="sumInfoDiv">
          {contentSum}
        </div>
      </div>
    )
  }

  handleUndoItem = event => {
    this.props.dispatch( actionUndoSum() );
		this.props.dispatch( actionUndoItem() );
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

  removeOneItemFromCart(itemId, index){
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
          'stock': find.stock + 1
        });
      }else{
        console.log("Finns inga fler varor av denna sort")
      }
      let actionUpdate = actionUpdateQuantity(index, itemId, -1);
      let actionSum = actionTotalSum(-find.price);

      if (this.props.cart.filter(e => e.cart.itemName === find.itemName).length > 0) {
        this.props.dispatch(actionUpdate)
      }
      this.props.dispatch(actionSum);
    }.bind(this));
  }



}



let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    cart: state.cartItems.present,
    sum: state.sum.present
  }
}

export default connect(mapStateToProps)(Cart);
