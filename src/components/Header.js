import React, { Component } from 'react';
import {connect} from 'react-redux';
import MdShoppingCart from 'react-icons/lib/md/shopping-cart';
import MdClose from 'react-icons/lib/md/close';
import {actionDisplayCart} from '../actions/actions.js';
import './Header.css';


class HeaderMain extends Component{
  render(){

    return(
      <div className="containerHeader">
      <button onClick={this.props.displayCart} className="showCartButton">{this.props.showCart ? <MdClose size={25} /> : <MdShoppingCart size={25} /> }</button>
        <img
        src="https://static.wixstatic.com/media/b4da21_a9129bcb2c29409db8078e5e9dad3381~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_2121,h_980,al_c,q_90,usm_0.66_1.00_0.01/b4da21_a9129bcb2c29409db8078e5e9dad3381~mv2_d_5472_3648_s_4_2.webp" />
      </div>
    )
  }
}


export default HeaderMain;
