import React, {Component} from 'react';
import {connect} from 'react-redux';
import './History.css';

class History extends Component {

  render(){
      let historyCart;
      if(!this.props.history){
        historyCart = <div>No items</div>
      }else{
        const historyList = this.props.history.map(( y, index) => (
            <div className="historyDiv" key={index}>
              <div>{y}</div>
            </div>
        ));
        historyCart = <div className="historyHolder"> {historyList} </div>
      }
    return(
      <div className="containerHistory">
      {historyCart}
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    history: state.history
  }
}

export default connect(mapStateToProps)(History);
