import React, { Component } from 'react';
import {connect} from 'react-redux';
import Login from './components/Login.js';
import MainShop from './components/MainShop.js';
import HeaderMain from './components/Header.js';
import Cart from './components/Cart.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state={
      showCart: false
    }
    this.displayCart = this.displayCart.bind(this);
  }
  displayCart(){
    console.log("pressed");
    if(this.state.showCart === false){
      this.setState({showCart: true})

    }else if(this.state.showCart === true){
      this.setState({showCart: false})
    }
  }

  render() {
    return (
      <div>
          {this.state.showCart ?
        <div className="positionContainerCart">
          <Cart/>
        </div>
        : null}
        <HeaderMain
          displayCart={this.displayCart}
          showCart={this.state.showCart}
           />


        <MainShop />
      </div>
    );
  }
}



let mapStateToProps = state => {
  return {
    showCart: state.showCart
  }
}

export default connect(mapStateToProps)(App);
