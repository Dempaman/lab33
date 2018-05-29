import React, { Component } from 'react';
import {connect} from 'react-redux';
import {actionAddAdminItem, actionUndoAdminItem, actionRedoItem, actionAddRemovedItem, actionUndoRemovedItem, actionRedoRemovedItem  } from '../actions/actions.js';
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
      showEdit: false,
      showConfirm: false,
      lastObjectAdded: {},
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
    this.addNewItem = this.addNewItem.bind(this);

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

  handleUndoEdit = event => {
    let productValue = this.props.adminItem[this.props.adminItem.length - 1]
    console.log(productValue)
		this.props.dispatch( actionUndoAdminItem());
    firebase.database().ref('items/' + productValue.removeName).set({
      itemName: productValue.itemName,
      price: productValue.price,
      productImg: productValue.productImg,
      removeName: productValue.removeName,
      stock: productValue.stock
    });
	}

  handleUndoAddedProduct = event => {
    this.props.dispatch(actionUndoAdminItem());
    firebase.database().ref('items/' + this.props.adminItem[this.props.adminItem.length - 1].removeName).remove()
      .then(function() {
        console.log("Remove succeeded.")
      });
      console.log(this.props.adminItem)
  }

  handleRedoItem = event => {
    let productValue = this.props.adminItemF[0]
    let lastValueInF = productValue[this.props.adminItemF[0].length -1]
		this.props.dispatch(actionRedoItem());
    firebase.database().ref('items/' + lastValueInF.removeName).set({
      itemName: lastValueInF.itemName,
      price: lastValueInF.price,
      productImg: lastValueInF.productImg,
      removeName: lastValueInF.removeName,
      stock: lastValueInF.stock
    });
  }

  handleRecover = event => {
    this.props.dispatch(actionRedoRemovedItem())
  }

  handleClickClose(){
    this.setState({showEdit: false})
    this.setState({showConfirm: false})
  }

  addNewItem(itemName, price, productImg, removeName, stock){
    let action = actionAddAdminItem(itemName, price, productImg, removeName, stock)
    this.props.dispatch(action);
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
      this.addNewItem(this.state.product, this.state.price, this.state.imageUrl, this.state.product, 100)
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

  removeItem(itemId){
    let find = this.props.data.find(item => item.itemName === itemId );
    this.setState({showConfirm: true})
    this.setState({currentEdit: find.removeName});
    this.props.dispatch(actionAddRemovedItem(
      find.itemName,
      find.price,
      find.productImg,
      find.removeName,
      find.stock  ));

  }

  confirmRemoveItem(){
    firebase.database().ref('items/' + this.state.currentEdit).remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
      this.setState({showConfirm: false})
      console.log(this.props.recoverItem)
  }

  handleRedoRemovedItem(){

		this.props.dispatch(actionUndoRemovedItem()); //<------ DENNA SKA VI ANVÄNDA

    let productValue = this.props.recoverItem[this.props.recoverItem.length - 1]
    console.log(productValue)
    firebase.database().ref('items/' + productValue.removeName).set({
      itemName: productValue.itemName,
      price: productValue.price,
      productImg: productValue.productImg,
      removeName: productValue.removeName,
      stock: productValue.stock
    });

  }

  editItem(itemId){
    let find = this.props.data.find(item => item.itemName === itemId );
    this.setState({currentEdit: find.removeName});
    this.setState({lastObjectAdded: find});
    this.setState({showEdit: true})
    console.log(find.itemName)
  }

  updateItem(e){
    e.preventDefault();
    this.props.dispatch(actionAddAdminItem(
      this.state.lastObjectAdded.itemName,
      this.state.lastObjectAdded.price,
      this.state.lastObjectAdded.productImg,
      this.state.lastObjectAdded.removeName,
      this.state.lastObjectAdded.stock  ));

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
    this.setState({showEdit: false})
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
          <div
              className="editContainer" key={x.itemName}>
            <div><img className="productImgEdit" src={x.productImg} alt="Not found"/></div>
            <div className="itemNameEdit">{x.itemName}</div>
            <div className="kronorTxtEdit">{x.price}kr</div>
            <div className="blurImgEdit"></div>
            <div className="positionButtons">
              <button className="buttonRemoveEdit" onClick={() => this.editItem(x.itemName)}>Edit</button>
              <button className="buttonRemoveEdit" onClick={() => this.removeItem(x.removeName)}>Remove</button>
            </div>
          </div>
      ));
      contentEdit = <div className="editItems">
                      <div className="editButtonsCont">
                        <button className="buttonRemoveEdit" onClick={() => this.handleRedoRemovedItem()}  disabled={!this.props.canUndoRecover} >Recover</button>
                        <button className="buttonRemoveEdit" onClick={this.handleUndoEdit} disabled={!this.props.canUndo}>Undo edit</button>
                      </div>
                        {dataList}
                      </div>;
    }
    return(
    	<React.Fragment>
        <div className="containerAdmin">
          <div className="editButtonsCont">
            <button className="buttonRemoveEdit" onClick={this.handleUndoAddedProduct} disabled={!this.props.canUndo}>Undo added item</button>
            <button className="buttonRemoveEdit" onClick={this.handleRedoItem} disabled={!this.props.canRedo}>Redo Item</button>
          </div>
          {this.state.added ? <div className="containerAdded">ADDED</div> : null}
          {this.state.showEdit ?
            <div className="editItemContainer">
            <form>
              <div className="closeDivInEdit">
                <button onClick={this.handleClickClose} className="buttonCloseEdit"><MdClose size={25} /></button>
              </div>
              <h3>Update</h3>
              <input onChange={this.onChangeHandleProductEdit} type="text" placeholder="Product"/>
              <input onChange={this.onChangeHandlePriceEdit} type="text" placeholder="Price"/>
              <input onChange={this.onChangeHandleImageEdit} type="text" placeholder="Image URL"/>
              <button className="updateButton" onClick={this.updateItem}>UPDATE PRODUCT</button>
            </form>
            </div>
            : null}
            <div>
              {this.state.showConfirm ?
                <div className="confirmItemContainer">
                  <div className="innerConfDiv">
                    <div className="closeDiv">
                      <button onClick={this.handleClickClose} className="buttonCloseEdit"><MdClose size={25} /></button>
                    </div>
                    <div className="yesNoBtnDiv">
                      <button className="buttonRemoveEdit" onClick={this.handleClickClose} >No</button>
                      <button className="buttonRemoveEdit" onClick={() => this.confirmRemoveItem()} >Yes</button>
                    </div>
                  </div>
                </div>
                : null}
            </div>
          <form className="formAddProduct">
            <h3>Add a product</h3>
            <input onChange={this.onChangeHandleProduct} type="text" placeholder="Product"/>
            <input onChange={this.onChangeHandlePrice} type="text" placeholder="Price"/>
            <input onChange={this.onChangeHandleImage} type="text" placeholder="Image URL"/>
            <button className="addButton" onClick={this.onClickSend}>ADD PRODUCT</button>
          </form>
          {contentEdit}
        </div>
    	</React.Fragment>
    )
  }
}
let mapStateToProps = state => {
  return {
    fetchState: state.items.fetchState,
    data: state.items.itemsData,
    cart: state.cartItems,
    history: state.history,
    user: state.login.user,
    adminItem: state.adminItem.present,
    adminItemF: state.adminItem.future,
    canUndo: state.adminItem.past.length > 0,
    canRedo: state.adminItem.future.length > 0,
    recoverItem: state.recoverItem.present,
    canRedoRecover: state.recoverItem.future.length > 0,
    canUndoRecover: state.recoverItem.past.length > 0
  }
}

export default connect(mapStateToProps)(Admin);
