import React, { Component } from 'react';

import {actionLogin} from '../actions/actions.js';
import {connect} from 'react-redux';
import firebase, { auth, provider } from './firebase.js';
import './Login.css';

class Login extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: '',
      name: '',
      profileImg: '',
      userEmail: '',
      AllUsers: [],
      loggedInUser: [],
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }*/

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
      //this.setState({user});
      //this.addUserInfoToFirebase();
    });
  }

  /**addUserInfoToFirebase(uidUser){
    firebase.database().ref().child('/users/').once('value').then(function(snapshot) {
      let listt = [];
      snapshot.forEach(function(child) {
        listt.push(child.val().uniqueID);
      });

      if(listt.includes(this.state.user.uid)){
        console.log("User already in database");
      }else{
        console.log("New user - Added to database");
        firebase.database().ref('users/'+ this.state.user.uid).set({
          'name': this.state.user.displayName,
          'img': this.state.user.photoURL,
          'uniqueID': this.state.user.uid,
          'email': this.state.user.email,
        });
      }
    }.bind(this));
  }**/

  /**addUserInfoToState(){
    firebase.database().ref('/users/').once('value').then(function(snapshot) {
      let users = [];
      snapshot.forEach(function(child) {
        users.push(child.val());
      });
      this.setState({AllUsers: users});
      }.bind(this));
  }**/


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
