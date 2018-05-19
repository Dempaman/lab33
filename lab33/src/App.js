import React, { Component } from 'react';
import Login from './components/Login.js'
import MainShop from './components/MainShop.js'

class App extends Component {
  render() {
    return (
      <div>
        <Login />
        <MainShop />
      </div>
    );
  }
}

export default App;
