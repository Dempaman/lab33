import React, { Component } from 'react';
import {actionItemFetchData, actionFetchFailed, actionFetchGotData} from '../actions/actions.js';
import {NO_DATA, LOADING} from '../actions/constants.js';
import {connect} from 'react-redux';
import firebase from './firebase.js';
import './MainShop.css'

class MainShop extends Component{

  componentDidMount(){
    this.fetchItemData();
  }

    render(){
      let content;
  		if( this.props.fetchState === LOADING ) {
  			content = <div>Loading...</div>;
  		} else if( this.props.fetchState === NO_DATA ) {
  			content = <div>No data.</div>;
  		} else {
  			const dataList = this.props.data.map( x => (
  				<div className="shopRenderContainer" key={x.itemName}>
            <div><img className="productImg" src={x.productImg} alt="Not found"/></div>
            <div>{x.itemName}</div>
            <div className="infoTxt">{x.info}</div>
            <div className="stockTxt">{x.stock} st i lager</div>
            <div className="kronorTxt">{x.price} kr</div>
            <button>Köp</button>
          </div>
  			) );
  			content = <div className="shopItems"> {dataList} </div>;
  		}

    return(
      <div>
        {/*<button onClick={this.handleClickFetchData}>Hämta data</button>*/}
        <div className="shopContainer">
          <div className="shopWrap">
            <div >{content}</div>
          </div>
          <div className="rightSideWrap">Shopping cart here</div>
        </div>
      </div>
    )
  }
  //Hämtar hem all data från firebase och lägger in dom i state
  fetchItemData(){
    this.props.dispatch(actionItemFetchData());

    firebase.database().ref('/items/').once('value')
    .then(function(snapshot) {
      let items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.props.dispatch(actionFetchGotData(items));
      console.log(this.props.dispatch(actionFetchGotData(items)));
      //this.setState({items: users});
      //console.log("this.state.items", this.state.items)
    }.bind(this))
    .catch(message => {
      this.props.dispatch(actionFetchFailed(message));
    })
  }
}

let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData
  }
}

export default connect(mapStateToProps)(MainShop);
