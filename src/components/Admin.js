import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NO_DATA, LOADING} from '../actions/constants.js';
import MdClose from 'react-icons/lib/md/close';
import './Admin.css';
import firebase from './firebase.js';

class Admin extends Component{
  constructor(props){
    super(props);
    this.state={
      product: "",
      price: "",
      imageUrl: "",
      editProduct: "",
      editPrice: "",
      editImageUrl: "",
      added: false,
      currentEdit: "",
      showEdit: false
    }
    this.onChangeHandleImage = this.onChangeHandleImage.bind(this);
    this.onChangeHandlePrice = this.onChangeHandlePrice.bind(this);
    this.onChangeHandleProduct = this.onChangeHandleProduct.bind(this);
    this.onChangeHandleImageEdit = this.onChangeHandleImageEdit.bind(this);
    this.onChangeHandlePriceEdit = this.onChangeHandlePriceEdit.bind(this);
    this.onChangeHandleProductEdit = this.onChangeHandleProductEdit.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.onClickSend = this.onClickSend.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);

  }

  onChangeHandleProduct(event){
    this.setState({product: event.target.value});
  }

  onChangeHandlePrice(event){
    this.setState({price: event.target.value});
  }

  onChangeHandleImage(event){
    this.setState({imageUrl: event.target.value});
  }

  onClickSend(e){
    e.preventDefault();
    if(this.state.product.length <= 0){
      console.log("Product must be filled");
    }else{
      firebase.database().ref('items/' + this.state.product).set({
        itemName: this.state.product,
        price: this.state.price,
        productImg: this.state.imageUrl,
        removeName:this.state.product,
        stock: 100
      });
      this.setState({added: true})
    }

  }

  onChangeHandleProductEdit(event){
    this.setState({editProduct: event.target.value});
  }

  onChangeHandlePriceEdit(event){
    this.setState({editPrice: event.target.value});
  }

  onChangeHandleImageEdit(event){
    this.setState({editImageUrl: event.target.value});
  }

  handleClickClose(){
    this.setState({showEdit: false})
  }





  removeItem(itemId){
    let find = this.props.data.find(item => item.itemName === itemId );
    console.log(find)
    firebase.database().ref('items/' + find.removeName).remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }

  editItem(itemId){
    let find = this.props.data.find(item => item.itemName === itemId );
    this.setState({currentEdit: find.removeName})
    this.setState({showEdit: true})
    console.log(find);

  }

  updateItem(e){
    e.preventDefault();
    console.log(this.state.currentEdit)
    if(this.state.editProduct.length <= 0){
      console.log("Must choose product to edit");
    }else{
      firebase.database().ref().child('items/' + this.state.currentEdit)
      .update({
        itemName: this.state.editProduct,
        price: this.state.editPrice,
        productImg: this.state.editImageUrl
       });
    }
}

  componentDidUpdate(){
    if(this.state.added === true){
      setTimeout(function(){
             this.setState({added:false});
        }.bind(this),2000);
    }
  }
  render(){
    let contentEdit;
    if( this.props.fetchState === LOADING ) {
      contentEdit = <div>Loading...</div>;
    } else if( this.props.fetchState === NO_DATA ) {
      contentEdit = <div>No data.</div>;
    } else {
      const dataList = this.props.data.map( x => (
        <div className="editContainer" key={x.itemName}>
          <div><img className="productImgEdit" src={x.productImg} alt="Not found"/></div>
          <div className="itemNameEdit">{x.itemName}</div>
          <div className="kronorTxtEdit">{x.price}kr</div>
          <div className="blurImgEdit"></div>
          <div className="positionButtons">
          <button className="buttonRemoveEdit" onClick={() => this.editItem(x.itemName)}>Edit</button>
          <button className="buttonRemoveEdit" onClick={() => this.removeItem(x.itemName)}>Remove</button>
          </div>
        </div>
      ));
      contentEdit = <div className="editItems"> {dataList} </div>;
    }
    return(
      <div className="containerAdmin">
        {this.state.added ? <div className="containerAdded">ADDED</div> : null}
        {this.state.showEdit ?
          <div className="editItemContainer">
          <form>
            <button onClick={this.handleClickClose} className="buttonCloseEdit"><MdClose size={25} /></button>
            <h3>Update</h3>
            <input onChange={this.onChangeHandleProductEdit} type="text" placeholder="Product"/>
            <input onChange={this.onChangeHandlePriceEdit} type="text" placeholder="Price"/>
            <input onChange={this.onChangeHandleImageEdit} type="text" placeholder="Image URL"/>
            <button className="updateButton" onClick={this.updateItem}>UPDATE PRODUCT</button>
          </form>
          </div>
          : null}
        <form className="formAddProduct">
          <h3>Add a product</h3>
          <input onChange={this.onChangeHandleProduct} type="text" placeholder="Product"/>
          <input onChange={this.onChangeHandlePrice} type="text" placeholder="Price"/>
          <input onChange={this.onChangeHandleImage} type="text" placeholder="Image URL"/>
          <button className="addButton" onClick={this.onClickSend}>ADD PRODUCT</button>
        </form>
        {contentEdit}
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    cart: state.cartItems,
    history: state.history,
    user: state.login.user
  }
}

export default connect(mapStateToProps)(Admin);
