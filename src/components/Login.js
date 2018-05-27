import React, { Component } from 'react';

import {actionLogin} from '../actions/actions.js';
import {connect} from 'react-redux';
import { auth, provider } from './firebase.js';
import './Login.css';

class Login extends Component {
  logout() {
    auth.signOut()
    .then(() => {
      this.props.dispatch(actionLogin(null));
    });
  }
  //Google Login
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.props.dispatch(actionLogin(user));
    });
  }


  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch(actionLogin(user));
      }
    });
  }

  render() {
    return (
      <div>
      <div className="containerLogin">
          {this.props.user ?
            <button onClick={() => this.logout()}className="buttonLog">SIGN OUT</button>
            :
            <button className="buttonLog" onClick={() => this.login()}>SIGN IN</button>
          }
          </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps)(Login);
