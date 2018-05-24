import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Cart.css';
class Cart extends Component {

  render(){
      let contentCart;
      if(!this.props.cart){
        contentCart = <div>No items in the cart..</div>
      }else{
        const cartList = this.props.cart.map( (y, i) => (
            <div className="cartInfoDiv" key={i} i={i}>
              <div>{y.cart.itemName}</div>
              <div>{y.cart.price} kr</div>
              <div>{y.quantity} st</div>
            </div>
        ));
        contentCart = <div className="cartHolder"> {cartList} </div>
      }
    return(
      <div className="containerCart">
      {contentCart}
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    cart: state.cartItems
  }
}

export default connect(mapStateToProps)(Cart);
