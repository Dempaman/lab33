import React, { Component } from 'react';
import {connect} from 'react-redux';
import Login from './components/Login.js';
import MainShop from './components/MainShop.js';
import HeaderMain from './components/Header.js';
import Cart from './components/Cart.js';
import Admin from './components/Admin.js';
import History from './components/History.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state={
      showCart: false,
      showHistory: false,
    }
    this.displayCart = this.displayCart.bind(this);
    this.displayHistory = this.displayHistory.bind(this);
  }
  displayCart(){
    console.log("pressedCart");
    if(this.state.showCart === false){
      this.setState({showCart: true})
      this.setState({showHistory: false})

    }else if(this.state.showCart === true){
      this.setState({showCart: false})
    }
  }

  displayHistory(){
    console.log("pressedHistory");
    if(this.state.showHistory === false){
      this.setState({showHistory: true})
      this.setState({showCart: false})

    }else if(this.state.showHistory === true){
      this.setState({showHistory: false})
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
        {this.state.showHistory ?
          <div className="positionContainerHistory">
            <History/>
          </div>
        : null}
        <HeaderMain
          displayHistory={this.displayHistory}
          showHistory={this.state.showHistory}
          displayCart={this.displayCart}
          showCart={this.state.showCart}
        />
        <MainShop />
        <Login />
        {this.props.user ? <Admin /> : null}
      </div>
    );
  }
}



let mapStateToProps = state => {
  return {
    showCart: state.showCart,
    user: state.login.user
  }
}

export default connect(mapStateToProps)(App);
