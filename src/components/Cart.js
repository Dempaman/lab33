import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Cart.css';
class Cart extends Component {

  render(){
      let contentCart;
      if(!this.props.cart){
        contentCart = <div>No items in the cart..</div>
      }else{
        const cartList = this.props.cart.map( y => (
            <div className="cartInfoDiv" key={y.itemName}>
              <div>{y.itemName}</div>
              <div>{y.price} kr</div>
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
