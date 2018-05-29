import React, { Component } from 'react';

import {actionLogin, actionHistoryAdd} from '../actions/actions.js';
import {connect} from 'react-redux';
import { auth, provider } from './firebase.js';
import './Login.css';

class Login extends Component {
  logout() {
    auth.signOut()
    .then(() => {
      let actionDispLogout = actionLogin(null);
      this.props.dispatch(actionDispLogout);
      this.props.dispatch(actionHistoryAdd(actionDispLogout.type));
    });
  }
  //Google Login
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        let actionDispLogin = actionLogin(user);
        this.props.dispatch(actionDispLogin);
        this.props.dispatch(actionHistoryAdd(actionDispLogin.type));
    });
  }


  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let actionDispKeep = actionLogin(user)
        this.props.dispatch(actionDispKeep);
        this.props.dispatch(actionHistoryAdd(actionDispKeep.type));
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
