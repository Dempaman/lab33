import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionAddItem, actionUpdateQuantity, actionUndoItem} from '../actions/actions.js';
import firebase from './firebase.js';
import './Cart.css';
import MdUndo from 'react-icons/lib/md/undo';

class Cart extends Component {

  render(){
      let calcSum = this.props.cart.reduce(
        (accumulator, currentValue) => accumulator += currentValue.cart.price * currentValue.quantity, 0 );
      let contentCart;
      let contentSum;
      if(!this.props.cart){
        contentCart = <div>No items in the cart..</div>
      }else{
        const cartList = this.props.cart.map( (y, i) => (
            <div className="cartInfoDiv" key={i} i={i}>
              <div className="itemNameDiv">
                <div>{y.cart.itemName}</div>
                <div>{y.cart.price} kr</div>
              </div>
              <button className="buttonCartItem" onClick={() => this.removeOneStockFromCart(y.cart.itemName, i)} i={i} disabled={y.quantity <= 1} >-</button>
              <div className="quantityDiv">{y.quantity} st</div>
              <button className="buttonCartItem" onClick={() => this.addItemToCart(y.cart.itemName, i)} i={i}>+</button>
            </div>
        ));
        contentCart = <div className="cartHolder"> {cartList} </div>
      }
      if(this.props.cart.length < 1){
        contentSum = <div>Du har inga varor i kundvagnen</div>
      }else{
        contentSum = <p>Totalt {calcSum}kr</p>
      }


    return(
      <div className="containerCart">
        <button className="undoButton" onClick={this.handleUndoItem} disabled={!this.props.makeDisable} ><MdUndo size={25} /></button>
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
		this.props.dispatch(actionUndoItem());
    firebase.database().ref('items/' + this.props.cart[this.props.cart.length - 1].cart.removeName).update({
      'stock': this.props.cart[this.props.cart.length - 1].cart.stock  + this.props.cart[this.props.cart.length - 1].quantity - 1
    });
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
    if (this.props.cart.filter(e => e.cart.itemName === find.itemName).length > 0) {
      this.props.dispatch(actionUpdate)
      console.log("varan finns redan i din cart")
    }else{
      this.props.dispatch(action);
    }
  }

  removeOneStockFromCart(itemId, index){
    let find = this.props.data.find(item => item.itemName === itemId );
    if(find.stock > 0){
      firebase.database().ref('items/' + find.removeName).update({
        'stock': find.stock + 1
      });
    }else{
      console.log("Finns inga fler varor av denna sort")
    }
    let actionUpdate = actionUpdateQuantity(index, itemId, -1);
    if (this.props.cart.filter(e => e.cart.itemName === find.itemName).length > 0) {
      this.props.dispatch(actionUpdate)
    }
}



}



let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    cart: state.cartItems.present,
    makeDisable: state.cartItems.past.length >= 1,
    cartPast: state.cartItems.past
  }
}

export default connect(mapStateToProps)(Cart);
